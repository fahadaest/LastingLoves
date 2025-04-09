import cron from 'node-cron';
import Memory from '../models/memoryModel.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMemoryEmail = async (user, memory) => {
    const mailOptions = {
        from: 'Lasting Love',
        to: memory.contacts.join(','),
        subject: `${user.username} shared a memory with you!`,
        html: `
            <h2>A Special Memory from ${user.username}</h2>
            <p>Hi there,</p>

            <p>We hope this email finds you well.</p>

            <p>${user.username} has left behind a special message for you—one filled with love, memories, and their thoughts just for you. 
            They wanted to make sure you received this when the time was right.</p>

            <p>💌 <strong>To view their message, Login and access the video, please follow this link:</strong></p>
            <p>👉 <a href="${process.env.FRONTEND_URL}/public-profile/${user._id}/${memory._id}" target="_blank">${process.env.FRONTEND_URL}/public-profile/${user._id}/${memory._id}</a></p>

            <hr>

            <p>This is a deeply personal and meaningful message, and we are honored to help deliver it to you. 
            If you need any support or have any questions, please reach out.</p>

            <p>With care,</p>
            <p><strong>Lasting Love</strong></p>
            <p>Visit Our Website: <a href="${process.env.FRONTEND_URL}" target="_blank">${process.env.FRONTEND_URL}</a></p>
        `
    };

    try {
        await transporter.verify();
        console.log("SMTP Server Ready");

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const handleScheduledMemories = async () => {
    try {
        const now = new Date();

        const scheduledMemories = await Memory.find({
            privacy: "scheduled",
            scheduledTime: { $lte: now }
        });

        const scheduledAfterDeathMemories = await Memory.find({
            privacy: "scheduledAfterDeath",
            scheduledTime: { $lte: now }
        });

        for (const memory of scheduledMemories) {
            memory.privacy = "scheduledVerified";
            await memory.save();

            if (memory?.contacts?.length > 0) {
                const user = await User.findById(memory.userId);
                if (user) {
                    await sendMemoryEmail(user, memory);
                }
            }
        }

        for (const memory of scheduledAfterDeathMemories) {
            const user = await User.findById(memory.userId);

            if (user?.isAlive === false) {
                memory.privacy = "scheduledAfterDeathVerified";
                await memory.save();

                if (memory?.contacts?.length > 0) {
                    await sendMemoryEmail(user, memory);
                }
            } else if (user?.isAlive === true) {
                await Memory.findByIdAndDelete(memory._id);
                console.log(`Deleted memory ${memory._id} because user is still alive.`);
            }
        }

    } catch (error) {
        console.error("Error handling scheduled memories:", error);
    }
};

cron.schedule('*/1 * * * *', () => {
    console.log("Running cron job...");
    handleScheduledMemories();
});


export default handleScheduledMemories;
