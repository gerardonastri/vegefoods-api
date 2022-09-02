import express  from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import cors from 'cors'
import productRoutes from './routes/product.js'
import adminRoutes from './routes/admin.js'
import postRoutes from './routes/post.js'
import messageRoutes from './routes/message.js'
import commentRoutes from './routes/comment.js'




dotenv.config();
const app = express();

//mongoose
const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        throw err;
    })
}


//middleware
app.use(cors({ credentials: true }))
app.use(express.json())


//routes
app.use('/api/product', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/post', postRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/comment', commentRoutes)


app.use((err, req,res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })

})



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    connect();
    console.log(`server running on port ${PORT}`);
})