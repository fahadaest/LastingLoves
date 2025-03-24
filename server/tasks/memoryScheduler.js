// tasks/memoryScheduler.js
import cron from 'node-cron';
import Memory from '../models/memoryModel.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email setup (can reuse the one in authRoutes)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const handleScheduledMemories = async () => {
    try {
        const now = new Date();
        const scheduledMemories = await Memory.find({
            privacy: "scheduled",
            scheduledTime: { $lte: now }
        });

        for (const memory of scheduledMemories) {
            // Update memory privacy status
            memory.privacy = "scheduledVerified";
            await memory.save();

            if (memory.allowedEmails && memory.allowedEmails.length > 0) {
                const user = await User.findById(memory.userId);
                const mailOptions = {
                    from: 'Lasting Love',
                    to: memory.allowedEmails.join(','),
                    subject: `${user.username} shared a memory with you!`,
                    html: `
                    <h2>A Special Memory from ${user.username}</h2>
                    <p>Hi there,</p>
            
                    <p>We hope this email finds you well.</p>
            
                    <p>${user.username} has left behind a special message for you—one filled with love, memories, and their thoughts just for you. 
                    They wanted to make sure you received this when the time was right.</p>
            
                    <p>💌 <strong>To view their message, Login and access the video, please follow this link:</strong></p>
                    <p>👉 <a href="${process.env.FRONTEND_URL}/public-profile/${user._id}/${scheduledMemories[0]._id}" target="_blank">${process.env.FRONTEND_URL}/public-profile/${user._id}/${scheduledMemories[0]._id}</a></p>
            
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
        }
    } catch (error) {
        console.error("Error handling scheduled memories:", error);
    }
};

// Run every 1 minutes (adjust timing as needed)
cron.schedule('*/1 * * * *', handleScheduledMemories);

export default handleScheduledMemories;
