import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
// All the functionality has now been moved to the controllers and called in the
//the productRoutes ==> Cleaner and more organised

export default router
