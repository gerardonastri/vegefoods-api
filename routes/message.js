import express from 'express'
const router = express.Router()
import Message from '../models/Message.js'


router.get('/', async (req,res,next) => {
    try {
        const messages = await Message.find()
        res.status(200).json(messages)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req,res,next) => {
    const {name, subject, email, content} = req.body;
    try {
        const message = await Message.create({
          name,
          subject,
          email,
          message: content
        })
        res.status(200).json(message)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req,res, next) => {
    try {
        const message = await Message.findByIdAndUpdate(id, req.body)
        res.status(200).json(message)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        await Message.findByIdAndDelete(id)
        res.status(200).json('deleted')
    } catch (error) {
        next(error)
    }
})
  




export default router