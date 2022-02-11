import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @description  Fetch All products
// @route        GET /api/products
// @access       Public

const getProducts = asyncHandler(async (req, res) => {
  //const pageSize = 2
  //const page = Number(req.query.pageNumber) || 1

  //query is how you can get query strings when theres a question mark involved e.g in productsActions with ?keyword.
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          //using regex so the user doesn't have to type the exact specific name of a product.
          //short for regular expressions: used to match character combinations in strings
          $options: 'i', //case insensitive.. 9:42
        },
      }
    : {} //if it doesnt exist/empty string then use empty curly brackets

  //spread keyword above...
  //can use .count but it will show a DeprecationWarning --> collection.count will be removed in a future version =
  //use Collection.countDocuments/estimatedDocumentCount

  //const countOfProducts = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
  /* .limit(pageSize)
    .skip(pageSize * (page - 1))*/

  res.json({ products /*page, pages: Math.ceil(countOfProducts / pageSize)*/ })
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

// @description  create a new review
// @route        POST /api/products/:id/review
// @access       private + adminOnly

const newProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body //what will be needed for each product review from the body

  const products = await Product.findById(req.params.id) //get the selected products that will be reviewed from the url

  if (products) {
    //check for the products...
    const reviewedAlready = products.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    )

    if (reviewedAlready) {
      res.status(400)
      throw new Error('You Have Already Reviewed This Product')
    }

    const Review = {
      //creating the reviews object
      name: req.user.name,
      rating: Number(rating), //destructred from the body above, wrapped in Number as it will be a number.
      comment,
      user: req.user._id,
    }

    products.reviews.push(Review)
    products.numReviews = products.reviews.length

    products.rating =
      products.reviews.reduce((acc, item) => item.rating + acc, 0) /
      products.reviews.length

    await products.save()
    res.status(201).json({ message: 'A New Review Has Been Added' })
  } else {
    res.status(404)
    throw new Error('Product cannot be found')
  }
})

// @description  Get the top rated products
// @route        GET /api/products/topRated
// @access       public

const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  //pass an empty object as it's not limited to anything
  //Products will be sorted by rated ascending order hence why I used -1 and limit it to the top 3 products
  res.json(products)
})

export {
  getProductById,
  getProducts,
  deleteProducts,
  createProducts,
  updateProducts,
  newProductReview,
  getTopRatedProducts,
}
