import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    subject: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    answered: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)