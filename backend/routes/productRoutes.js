import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
  deleteProducts,
  updateProducts,
  createProducts,
  newProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js'
import { protector, adminOnly } from '../middleware/AuthenticationMiddleware.js'

//The main product list
router.route('/').get(getProducts).post(protector, adminOnly, createProducts)
router.route('/:id/reviews').post(protector, newProductReview)
router.get('/topRated', getTopRatedProducts) //no need for the protector middleware as it's public

router
  .route('/:id')
  .get(getProductById)
  .delete(protector, adminOnly, deleteProducts)
  .put(protector, adminOnly, updateProducts)
//this will be used to source individual selected products by thier Id
// All the functionality has now been moved to the controllers and called in the
//the productRoutes ==> Cleaner and more organised

export default router
