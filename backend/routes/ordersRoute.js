import express from 'express'
const router = express.Router()
import {
  addOrderedItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
} from '../controllers/ordersController.js'
import { protector, adminOnly } from '../middleware/AuthenticationMiddleware.js'

router
  .route('/')
  .post(protector, addOrderedItems)
  .get(protector, adminOnly, getAllOrders)
//pass in protector middleware and set it to addOrderedItems
//if a POST request is sent to /api/orders, we will be able to call addOrderedItems function
//make sure to add new route file to server.js
router.route('/userOrders').get(protector, getUserOrders)
//pass in protector middleware and set it to getUserOrders
//if a GET request is sent to /api/orders/getUserOrders then ....
router.route('/:id').get(protector, getOrderById)
//make sure when using this route with the id param its at the bottom otherwise if you pass in '/' anything it will look at it as an 'id'
//pass in protector middleware and set it to getOrderById
//if a GET request is sent to /api/orders/:id, we will be able to call getOrderById function
router.route('/:id/pay').put(protector, updateOrderToPaid)
//pass in protector middleware and set it to updateOrderToPaid

export default router
