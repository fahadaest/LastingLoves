import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import cookieParser from 'cookie-parser';
import { uploadImage, uploadVideo } from '../config/cloudinary.js';
import { cloudinary } from '../config/cloudinary.js';
import Memory from '../models/memoryModel.js';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import nodemailer from 'nodemailer';

const router = express.Router();
router.use(cookieParser());
dotenv.config();

const ACCESS_TOKEN_SECRET = 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret';
const environment = process.env.ENVIRONMENT;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    });
                    await user.save();
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


router.use(passport.initialize());

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
};

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        if (!req.user) {
            return res.redirect('/login');
        }

        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);

        res.cookie('accessToken', accessToken, {
            httpOnly: environment === "development" ? false : true,
            secure: environment === "development" ? false : true,
            sameSite: environment === "development" ? 'Lax' : 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: environment === "development" ? false : true,
            secure: environment === "development" ? false : true,
            sameSite: environment === "development" ? 'Lax' : 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect(`${process.env.FRONTEND_URL}/profile`);
    }
);



router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const user = new User({ username, email, password });
        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
            httpOnly: environment === "development" ? false : true,
            secure: environment === "development" ? false : true,
            sameSite: environment === "development" ? 'Lax' : 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: environment === "development" ? false : true,
            secure: environment === "development" ? false : true,
            sameSite: environment === "development" ? 'Lax' : 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: 'User created successfully', accessToken, refreshToken });
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

        res.cookie('accessToken', accessToken, {
            httpOnly: environment === "development" ? false : true,
            secure: environment === "development" ? false : true,
            sameSite: environment === "development" ? 'Lax' : 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: environment === "development" ? false : true,
            secure: environment === "development" ? false : true,
            sameSite: environment === "development" ? 'Lax' : 'None',
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
            maxAge: 24 * 60 * 60 * 1000 // TODO 1 hour
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
            paymentPlan: user.paymentPlan,
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired access token' });
    }
});

router.get('/publicProfile/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
            paymentPlan: user.paymentPlan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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

        let videoUrl = "";
        let thumbnailUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'video',
                folder: 'memories',
                eager: [
                    { format: 'jpg', resource_type: 'video', transformation: { start_offset: '0' } }
                ]
            });

            videoUrl = result?.secure_url;
            thumbnailUrl = result?.eager[0].secure_url;
        }

        const newMemory = new Memory({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            privacy: req.body.privacy,
            scheduledTime: req.body.scheduledTime,
            allowedEmails: req.body.allowedEmails,
            videoUrl: req.body.videoUrl,
            thumbnailUrl: req.body.thumbnailUrl,
        });
        await newMemory.save();

        if (req.body.privacy === "private" && req.body.allowedEmails && req.body.allowedEmails.length > 0) {
            const mailOptions = {
                from: 'Lasting Love',
                to: req.body.allowedEmails.join(','),
                subject: `${req.body.username} shared a memory with you!`,
                html: `
                    <h2>A Special Memory from ${req.body.username}</h2>
                    <p>Hi there,</p>
            
                    <p>We hope this email finds you well.</p>
            
                    <p>${req.body.username} has left behind a special message for you—one filled with love, memories, and their thoughts just for you. 
                    They wanted to make sure you received this when the time was right.</p>
            
                    <p>💌 <strong>To view their message, Login and access the video, please follow this link:</strong></p>
                    <p>👉 <a href="${process.env.FRONTEND_URL}/public-profile/${req.body.userId}" target="_blank">${process.env.FRONTEND_URL}/public-profile/${req.body.userId}</a></p>
            
                    <hr>
            
                    <h3>Confirming Their Passing</h3>
                    <p>If you have received this email under unfortunate circumstances, you may confirm ${req.body.username}’s passing by uploading an official death certificate. 
                    Once verified, their message will be unlocked for you.</p>
            
                    <p>🔗 <strong>Confirm & Access the Memory:</strong> <a href="${process.env.FRONTEND_URL}/public-profile/${req.body.userId}/${newMemory._id}" target="_blank">${process.env.FRONTEND_URL}/public-profile/${req.body.userId}/${newMemory._id}</a></p>
            
                    <hr>
            
                    <p>This is a deeply personal and meaningful message, and we are honored to help deliver it to you. 
                    If you need any support or have any questions, please reach out.</p>
            
                    <p>With care,</p>
                    <p><strong>Lasting Love</strong></p>
                    <p>Visit Our Website: <a href="${process.env.FRONTEND_URL}" target="_blank">${process.env.FRONTEND_URL}</a></p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Email error:", error);
                } else {
                    console.log("Emails sent:", info.response);
                }
            });
        }

        res.status(201).json({ message: "Memory created successfully", memory: newMemory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/verify/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const memoriesToUpdate = await Memory.find({ userId, privacy: "private" });

        if (memoriesToUpdate.length === 0) {
            return res.status(404).json({ message: "No private memories found to verify." });
        }

        const updatedMemories = await Memory.updateMany(
            { userId, privacy: "private" },
            { $set: { privacy: "privateVerified" } }
        );

        res.json({
            message: "Memories successfully verified.",
            updatedCount: updatedMemories.modifiedCount
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
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

router.get('/memories/:userId', async (req, res) => {
    const { userId } = req.params;
    let accessToken = req.cookies.accessToken;

    if (!accessToken && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            accessToken = authHeader.split(' ')[1];
        }
    }

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        const authUser = await User.findById(decoded.id);

        // console.log(authUser)

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        let memories = await Memory.find({ userId });

        memories = memories.filter(memory => {

            if (memory.privacy === "private") {
                if (memory.allowedEmails && memory.allowedEmails.includes(authUser.email)) {
                    memory.videoUrl = null;
                    return true;
                }
                return false;
            }

            if (memory.privacy === "scheduled") {
                return false;
            }

            return true;
        });

        res.status(200).json({ memories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});





export default router;
