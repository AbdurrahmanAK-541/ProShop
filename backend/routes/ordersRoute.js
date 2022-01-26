import express from 'express'
const router = express.Router()
import { addOrderedItems } from '../controllers/ordersController.js'
import { protector } from '../middleware/AuthenticationMiddleware.js'

router.route('/').post(protector, addOrderedItems)
//pass in protector middleware and set it to addOrderedItems
//if a post request is sent to /api/orders, we will be able to call addOrderedItems function
//make sure to add new route file to server.js

export default router
