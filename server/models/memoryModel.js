import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    privacy: {
        type: String,
        enum: ['public', 'private', 'scheduled'],
        default: 'public',
    },
    scheduledTime: {
        type: Date,
        default: null,
    },
    allowedEmails: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const Memory = mongoose.model('Memory', memorySchema);

export default Memory;
