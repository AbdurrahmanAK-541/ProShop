import express from 'express'
const router = express.Router()
import {
  addOrderedItems,
  getOrderById,
} from '../controllers/ordersController.js'
import { protector } from '../middleware/AuthenticationMiddleware.js'

router.route('/').post(protector, addOrderedItems)
//pass in protector middleware and set it to addOrderedItems
//if a post request is sent to /api/orders, we will be able to call addOrderedItems function
//make sure to add new route file to server.js

router.route('/:id').post(protector, getOrderById)
//make sure when using this route with the id param its at the bottom otherwise if you pass in '/' anything it will look at it as an 'id'
export default router