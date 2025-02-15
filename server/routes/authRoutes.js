import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import cookieParser from 'cookie-parser';
import { uploadImage, uploadVideo } from '../config/cloudinary.js';
import { cloudinary } from '../config/cloudinary.js';
import Memory from '../models/memoryModel.js';
import dotenv from 'dotenv';

const router = express.Router();
router.use(cookieParser());
dotenv.config();

const ACCESS_TOKEN_SECRET = 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // TODO Access token expires in 1 hour
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' } // TODO Refresh token expires in 1 minute
    );
};

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // res.cookie('accessToken', accessToken, {
        //     httpOnly: false, // TODO change to true
        //     secure: false, // TODO Set to true in production (localhost doesn't support https)
        //     sameSite: 'Lax', // TODO change to Strict
        //     maxAge: 60 * 60 * 1000 // TODO 1 hour
        // });

        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: false, // TODO change to true
        //     secure: false,
        //     sameSite: 'Lax', // TODO change to Strict
        //     maxAge: 24 * 60 * 60 * 1000 // TODO 1 day
        // });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // TODO 1 hour
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // TODO 1 day
        });

        res.json({ message: 'Tokens refreshed', accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
});

router.get('/profile', async (req, res) => {
    let accessToken = req.cookies.accessToken;

    if (!accessToken && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            accessToken = authHeader.split(' ')[1];
        }
    }

    if (!accessToken) {
        return res.status(401).json({ message: 'No access token provided' });
    }

    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired access token' });
    }
});


router.put('/profile/update', uploadImage.single('profilePic'), async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        const { username, bio } = req.body;
        const profilePicUrl = req.file ? req.file.path : undefined;
        const updateData = { username, bio };
        if (profilePicUrl) updateData.avatar = profilePicUrl;

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Updated User:", updatedUser);
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/createMemory', uploadVideo.single('file'), async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No video file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'video',
            folder: 'memories',
            eager: [
                { format: 'jpg', resource_type: 'video', transformation: { start_offset: '0' } }
            ]
        });

        const newMemory = new Memory({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            privacy: req.body.privacy,
            scheduledTime: req.body.scheduledTime,
            allowedEmails: req.body.allowedEmails,
            videoUrl: result?.secure_url,
            thumbnailUrl: result?.eager[0].secure_url,
        });

        await newMemory.save();

        res.status(201).json({ message: "Memory created successfully", memory: newMemory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/myMemories', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

        const memories = await Memory.find({ userId: decoded.id });

        res.status(200).json({ memories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



export default router;
