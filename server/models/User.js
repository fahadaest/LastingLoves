import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    bio: {
        type: String,
        default: 'Add a bio',
    },
    avatar: {
        type: String,
        default: '',
    },
    paymentPlan: { type: String, enum: ['free', 'monthly', 'annual'], default: 'free' },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    isAlive: {
        type: Boolean,
        default: true,
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
