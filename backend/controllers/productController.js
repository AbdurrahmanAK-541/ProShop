import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @description  Fetch All products
// @route        GET /api/products
// @access       Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

// @description  Fetch single products
// @route        GET /api/products/:id
// @access       Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description  Delete products
// @route        DELETE /api/products/:id
// @access       private + adminOnly

const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Deleted' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description  create a new  product
// @route        POST /api/products
// @access       private + adminOnly

const createProducts = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample description',
    numberOfReview: 0,
  })

  const createdProducts = await product.save()
  res.status(201).json(createdProducts)
})

// @description  create a new  product
// @route        POST /api/products
// @access       private + adminOnly

const updateProducts = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const products = await Product.findById(req.params.id)

  if (products) {
    products.name = name
    products.description = description
    products.price = price
    products.image = image
    products.brand = brand
    products.category = category
    products.countInStock = countInStock

    const updatedProducts = await products.save()
    res.json(updatedProducts)
  } else {
    res.status(404)
    throw new Error('Product cannot be found')
  }
})

export {
  getProductById,
  getProducts,
  deleteProducts,
  createProducts,
  updateProducts,
}
