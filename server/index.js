import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
    res.send("Hello from the server");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

