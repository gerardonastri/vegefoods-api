import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
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
    price: {
        type: Number
    },
    rating: {
        type: [Number],
        default: [2,4,5,6,2]
    },
    sold: {
        type: Number
    },
    ratings: {
        type: Number
    },
    category: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model('Product', ProductSchema)