import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @description  Create a new order
// @route        POST /api/orders
// @access       Private/Protected

const addOrderedItems = asyncHandler(async (req, res) => {
  const {
    orderItems, //was orderedItems
    shippingAddress,
    paymentMethod, //paymentMethod??payment??
    ordereditemsPrice,
    vatPrice,
    shippingPrice,
    totalPrice,
  } = req.body //??payment? paymentMethosd??

  //makes sure orderedItems is not empty.
  //if the orderedItems exists and has a length thats equal to 0
  if (orderItems && orderItems.length === 0) {
    //was orderedItems
    res.status(400) //respond with a bad request
    throw new Error('No ordered items') //custom error message
    return
  } else {
    //create a new order in the DB
    const order = new Order({
      //instantiate a new order with new Order an pass in requested body objects + logged in user
      orderItems, //was orderedItems
      user: req.user._id, //protected route -> get token -> get user id from token
      shippingAddress,
      paymentMethod, //paymentMethod??payment?? was orderedPaymentMethod
      ordereditemsPrice,
      vatPrice,
      shippingPrice,
      totalPrice,
    })

    //save in the DB
    //set the requested order to await plus the order that was just instantiated and then call '.save()'
    const createdOrder = await order.save() //was requestedOrder
    res.status(201).json({ createdOrder })
    //new request has been made/created and the pass in the 'requestedOrder'
  }
})
//1. move back to frontend -> create an action thats makes a request to ordersRoute -> created and sent down from the state ->
//after the order is created in the DB -> send to a specific order page that will include the PP button (using an id)

// @description  Get an Order by an ID
// @route        GET /api/orders/;id
// @access       Private/Protected

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order Cannot Be Found')
  }
})
export { addOrderedItems, getOrderById } //export so it can be used in the ordersRoute.js
