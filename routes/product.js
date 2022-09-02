import express from 'express'
const router = express.Router()
import Product from '../models/Product.js'

//get all products
router.get('/', async (req,res,next) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})

//featured products
router.get('/featured', async (req,res,next) => {
    try {
        const products = await Product.find().limit(8)
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})


//get a product
router.get('/find/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

//categories
router.get('/cat/:cat', async(req,res,next) => {
    const {cat} = req.params
    try {
        const products = await Product.find({category: cat})
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})

//post product
router.post('/', async(req,res,next) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

//update product
router.put('/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        const product = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

//update product
router.delete('/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        await Product.findByIdAndUpdate(id)
        res.status(200).json('product deleted')
    } catch (error) {
        next(error)
    }
})

export default router