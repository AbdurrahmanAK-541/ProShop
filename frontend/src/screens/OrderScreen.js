import React, { useEffect } from 'react'
import { Col, Row, Image, Card, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetail } from '../actions/ordersActions'

const OrderScreen = ({ match }) => {
  //pass in match to obtain the order id
  const orderId = match.params.id
  //create a variable for the id and set to match.params.id

  const dispatch = useDispatch()

  const orderDetail = useSelector((state) => state.orderDetail) //getting from the state createOrder
  const { order, loading, error } = orderDetail //we pull from createOrder will be the order, success and error value too
  //bring in createOrder state -> once createAnOrder is dispatched, it will send everything down
  //through the state -> need to bring it in
  //if success is true, then trigger placeOrderHandler and dispatch createAnOrder.(ready for redirect -> useEffect)

  if (!loading) {
    const includeDecimals = (number) => {
      //enable all price values to be to two decimal places
      return (Math.round(number * 100) / 100).toFixed(2)
      //includeDecimals function takes in a number and returns Math.round function that takes the number and multiplies it by
      //100 then divides by 100 then have it displayed to 2 decimal places (toFixed)
    }
    //Order Summary Price Calculation
    order.sumItemsPrice = includeDecimals(
      order.orderItems.reduce(
        //the items in order price attained using reduce() method --> reduce the array to a single value and execute the provided function
        //orderItems array is reduced which takes in an accumulator(acc) and the current item/s in the order --> value that we end up with
        //using an arrow function, take the accumulator and add the item's price X qty = total price
        //0 = start of the accumulator as it's the initial value passed to be reduced.
        (acc, item) => acc + item.price * item.qty,
        0
      )
    )
  }

  useEffect(() => {
    //checks for the order and also makes sure that the order ID matches the ID that's in the URL
    //if not, then dispatch getOrderDetails() which will fetch the most recent order.
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetail(orderId))
    }
  }, [order, orderId]) //required dependencies

  //loading icon spinning whilst waiting for data to be importted else ...
  return loading ? (
    <Loader />
  ) : error ? ( //if theres an error then display the error with a varian of danger (highlighted in red) else ...
    <Message variant='danger'> {error}</Message>
  ) : (
    //display the OrderScreen and it's components below...
    <>
      {/*Displays the order then the order ID*/}
      <h1> Order {order._id} </h1>
      <Row>
        <Col md={8}>
          {' '}
          {/*8 Col Div */}
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>User Address</h3>
              {/*Getting name and email because we used populate in the backend*/}
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email/Login: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {/*??paths required for the full address.??
                also can now see the post code*/}
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  {' '}
                  This order was Delivered on {order.deliveredAt}{' '}
                </Message>
              ) : (
                <Message variant='danger'>Order Not Delivered</Message>
              )}
              {/*Checks and alerts user if the order has been paid for yet or not -->OrderModel.js*/}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  {' '}
                  This order was paid on {order.paidAt}{' '}
                </Message>
              ) : (
                <Message variant='danger'>Order Not Paid</Message>
              )}
              {/*Checks and alerts user if the order has been paid for yet or not*/}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Ordered Items</h3>
              {order.orderItems.length === 0 ? (
                <Message>Order Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((
                    item,
                    index //map through all the cart Items and pass in the index
                  ) => (
                    <ListGroup.Item key={index}>
                      {' '}
                      {/* for each cart item, a list group item is rendered that has a key since its a list. (use index as the key)*/}
                      <Row>
                        <Col md={2}>
                          <Image
                            /*srce is set to item as we loop/map through and calling each one item*/
                            src={
                              item.image
                            } /*the state in cartItems contains item details --> image*/
                            alt={
                              item.name
                            } /*the state in cartItems contains item details --> name*/
                            fluid //images automatically resize accordingly
                            rounded //images have rounded corners
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          {/*the item name set to go to /product/item.product where product was set to be the id in the carts*/}
                        </Col>
                        <Col md={3}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </Col>
                        {/*this will be the price set to size 3 --> also shows the item quantity*/}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          {/*Order Summary Card*/}
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3> {/*Card main header displayed*/}
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Selected Items</Col> {/*mini header displayed*/}
                  <Col>${order.sumItemsPrice}</Col>{' '}
                  {/*summary of the items price*/}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Collection Fee</Col> {/*mini header displayed*/}
                  <Col>${order.collectionFee}</Col>
                  {/*fee to collect items from store*/}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>VAT </Col> {/*mini header displayed*/}
                  <Col>${order.vatPrice}</Col>
                  {/* VAT price*/}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price </Col> {/*mini header displayed*/}
                  <Col>${order.totalPrice}</Col>{' '}
                  {/*total price including all Tax's and Fee's*/}
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
