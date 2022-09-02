import express from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Post from '../models/Post.js'
import Message from '../models/Message.js'
import bcrypt from 'bcrypt'
const router = express.Router()

//register
router.get('/register', async (req,res, next) => {
    const {username, email, password} = req.body
    
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username, 
            email,
            password: hashedPassword,
            isAdmin: true
        })
        res.status(200).json('user created')
    } catch (error) {
        next(error)
    }
})

//login
router.post('/login', async (req,res,next) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(404).json('User does not exist')
        const isPassowrdCorrect = await bcrypt.compare(password, user.password)
        if(!isPassowrdCorrect) return res.status(404).json('Invalid Credentials');

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

//get admins
router.get('/', async (req,res,next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

//info 
router.get('/info', async (req,res,next) => {
    try {
        const users = await User.find()
        const posts = await Post.find()
        const products = await Product.find()
        const messages = await Message.find()
            
        res.status(200).json({users, posts, messages, products})
    } catch (error) {
        next(error)
    }
})


//get admins
router.delete('/:id', async (req,res,next) => {
    const {id} = req.params
    try {
         await User.findByIdAndDelete(id)
        res.status(200).json('user deleted')
    } catch (error) {
        console.log(error);
        next(error)
    }
})

export default router