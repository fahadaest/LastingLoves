import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import session from 'express-session';
import handleScheduledMemories from './tasks/memoryScheduler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const environment = process.env.ENVIRONMENT;

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: environment === "development" ? false : true,
        httpOnly: environment === "development" ? false : true,
        sameSite: environment === "development" ? 'Lax' : 'None',
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);

const __dirname = path.resolve();


if (process.env.ENVIRONMENT === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
} else {
    console.log('Running in development mode. Frontend is not served from the backend.');
}


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        handleScheduledMemories();
    })
    .catch((err) => console.log("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});

