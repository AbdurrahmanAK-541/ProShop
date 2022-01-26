import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @description  Create a new order
// @route        POST /api/orders
// @access       Private/Protected

const addOrderedItems = asyncHandler(async (req, res) => {
  const {
    orderedItems,
    userAddress,
    paymentMethod, //paymentMethod??payment??
    ordereditemsPrice,
    vatPrice,
    collectionPrice,
    totalPrice,
  } = req.body //??payment? paymentMethod??

  //makes sure orderedItems is not empty.
  //if the orderedItems exists and has a length thats equal to 0
  if (orderedItems && orderedItems.length === 0) {
    res.status(400) //respond with a bad request
    throw new Error('No ordered items') //custom error message
    return
  } else {
    //create a new order in the DB
    const order = new Order({
      //instantiate a new order with new Order an pass in requested body objects + logged in user
      orderedItems,
      user: req.user._id, //protected route -> get token -> get user id from token
      userAddress,
      paymentMethod, //paymentMethod??payment?? was orderedPaymentMethod
      ordereditemsPrice,
      vatPrice,
      collectionPrice,
      totalPrice,
    })

    //save in the DB
    //set the requested order to await plus the order that was just instantiated and then call '.save()'
    const requestedOrder = await order.save()
    res.status(201).json({ requestedOrder })
    //new request has been made/created and the pass in the 'requestedOrder'
  }
})
//1. move back to frontend -> create an action thats makes a request to ordersRoute -> created and sent down from the state ->
//after the order is created in the DB -> send to a specific order page that will include the PP button (using an id)

export { addOrderedItems } //export so it can be used in the ordersRoute.js
