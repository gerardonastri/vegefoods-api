import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        reuired: true
    },
    desc: {
        type: String,
        reuired: true
    },
    imgUrl: {
        type: String
    },
    tag: {
        type: [String],
        default: []
    },
    user: {
        type: Object
    },
    category: {
        type: String
    },
    content: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model('Post', PostSchema)