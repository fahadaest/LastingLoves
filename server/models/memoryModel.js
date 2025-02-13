import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
    userId: {
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
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String
    },
}, { timestamps: true });

const Memory = mongoose.model('Memory', memorySchema);

export default Memory;
