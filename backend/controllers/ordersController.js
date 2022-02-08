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
      //paths
      //instantiate a new order with new Order an pass in requested body objects + logged in user
      user: req.user._id, //protected route -> get token -> get user id from token
      orderItems, //was orderedItems
      shippingAddress,
      paymentMethod, //paymentMethod??payment?? was orderedPaymentMethod
      ordereditemsPrice,
      vatPrice,
      shippingPrice,
      totalPrice,
    })

    //save in the DB
    //set the requested order to await plus the order that was just instantiated and then call '.save()'
    const createOrder = await order.save() //was requestedOrder
    res.status(201).json(createOrder)
    //I USED SQUIGLY BRAKCETS LIKE A DICKHEAD!!! squigly -> returns json object and the normal returns the data inside the object
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
    //poplulate = mongoose method that can link documents across collections -> have a schema for each one
    //populate from 'user' and have the name + email fields from user attached to it
    //used in OrderScreen.js
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

// @description  Update the order status to 'Paid'
// @route        GET /api/orders/:id/pay
// @access       Private/Protected

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    //if the order is found..
    order.isPaid = true //set to true as its set to false by default ...
    order.paidAt = Date.now() //set the paidAt to current date
    order.paymentResult = {
      //comes from paypal.
      //set to an object
      //added from PayPal (res comes from paypal)
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address, //in a payer object
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order Cannot Be Found')
  }
})

// @description  Get the user orders
// @route        GET /api/orders/userOrders
// @access       Private/Protected + admin only

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }) //only find because we get more than one
  res.json(orders)
  //pass in an object where we find orders where the user is = to the logged in user.
})

// @description  Get all the  orders
// @route        GET /api/orders
// @access       Private/Protected + admin only

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id, name') //only find because we get more than one
  res.json(orders)
  //pass in an object where we find orders where the user is = to the logged in user.
})

export {
  addOrderedItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
} //export so it can be used in the ordersRoute.js
