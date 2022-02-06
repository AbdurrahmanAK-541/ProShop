import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
  deleteProducts,
} from '../controllers/productController.js'
import { protector, adminOnly } from '../middleware/AuthenticationMiddleware.js'

router.route('/').get(getProducts) //The main product list
router
  .route('/:id')
  .get(getProductById)
  .delete(protector, adminOnly, deleteProducts)
//this will be used to source individual selected products by thier Id
// All the functionality has now been moved to the controllers and called in the
//the productRoutes ==> Cleaner and more organised

export default router
