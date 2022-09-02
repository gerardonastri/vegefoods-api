import express from 'express'
const router = express.Router()
import Post from '../models/Post.js'

//get all posts
router.get('/', async (req,res,next) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

//get all posts
router.get('/featured', async (req,res,next) => {
    try {
        const posts = await Post.find().limit(6)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

//recent posts
router.get('/recent', async (req,res,next) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).limit(3)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})


//get a post
router.get('/find/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        const post = await Post.findById(id)
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
})

//categories
router.get('/cat/:cat', async(req,res,next) => {
    const {cat} = req.params
    try {
        const posts = await Post.find({category: cat})
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

//create post
router.post('/', async(req,res,next) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
})

//update post
router.put('/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        const post = await Post.findByIdAndUpdate(id, req.body)
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
})

//update post
router.delete('/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        await Post.findByIdAndUpdate(id)
        res.status(200).json('post deleted')
    } catch (error) {
        next(error)
    }
})


//search
router.get('/search', async(req,res,next) => {
    const query = req.query.q;
    try {
        const posts = await Post.find({
            title: { $regex: query, $options: "i" },
          }).limit(40);
          res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
})



export default router