const cron = require('node-cron');
const User = require('./models/User');

// This cron job will run daily to check for expired subscriptions
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    try {
        const currentDate = new Date();

        // Find users with expired plans
        const expiredUsers = await User.find({
            $or: [
                { paymentPlan: 'monthly', subscriptionEndDate: { $lte: currentDate } },
                { paymentPlan: 'annual', subscriptionEndDate: { $lte: currentDate } }
            ]
        });

        // Update expired users' plans to 'free'
        for (const user of expiredUsers) {
            user.paymentPlan = 'free';
            user.subscriptionStartDate = null;
            user.subscriptionEndDate = null;
            await user.save();
            console.log(`User ${user.username}'s plan expired. Updated to 'free' plan.`);
        }
    } catch (error) {
        console.error('Error checking for expired plans:', error);
    }
});
