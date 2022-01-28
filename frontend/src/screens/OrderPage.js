import React, { useEffect } from 'react'
import {
  Button,
  Col,
  Row,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import CheckoutProcess from '../components/CheckoutProcess'
import { Link } from 'react-router-dom'
import { createAnOrder } from '../actions/ordersActions'

const OrderPage = ({ history }) => {
  //pass in history as a prop (later used as a dependency + )
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  //grabbing the items from the cart using useSelector from the state.
  const includeDecimals = (number) => {
    //enable all price values to be to two decimal places
    return (Math.round(number * 100) / 100).toFixed(2)
    //includeDecimals function takes in a number and returns Math.round function that takes the number and multiplies it by
    //100 then divides by 100 then have it displayed to 2 decimal places (toFixed)
  }
  //Order Summary Price Calculation
  cart.sumItemsPrice = includeDecimals(
    cart.cartItems.reduce(
      //the items in cart price attained using reduce() method --> reduce the array to a single value and execute the provided function
      //cartItems array is reduced which takes in an accumulator(acc) and the current item/s in cart --> value that we end up with
      //using an arrow function, take the accumulator and add the item's price X qty = total price
      //0 = start of the accumulator as it's the initial value passed to be reduced.
      (acc, item) => acc + item.price * item.qty,
      0
    )
  )

  cart.collectionFee = includeDecimals(cart.sumItemsPrice > 100 ? 0 : 100)
  //if the items in the cart are greater than £100 then collection is free. else its £100
  cart.vatPrice = includeDecimals(
    Number((0.15 * cart.sumItemsPrice).toFixed(2))
  )
  //the Vat will be 15% of the total cart items value (to 2 decimal places).

  cart.totalPrice = (
    Number(cart.sumItemsPrice) +
    Number(cart.collectionFee) +
    Number(cart.vatPrice)
  ).toFixed(2)
  //total price will include all the costs to 2 decimal places.

  const createOrder = useSelector((state) => state.createOrder) //getting from the state createOrder
  const { order, success, error } = createOrder //we pull from createOrder will be the order, success and error value too
  //bring in createOrder state -> once createAnOrder is dispatched, it will send everything down
  //through the state -> need to bring it in
  //if success is true, then trigger placeOrderHandler and dispatch createAnOrder.(ready for redirect -> useEffect)

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`) //order._id will come from order that's pulled from createOrder
    }
    // eslint-disable-next-line --> message in the console to ignore
  }, [history, success]) //required dependencies

  const placeOrderHandler = () => {
    //fire off when PLACE ORDER button is pressed...
    //57 8:00
    dispatch(
      //this dispatches createAnOrder as an action...
      createAnOrder({
        //this action will pass in the listed items below that are in the cart
        //going back to ordersActions.js -> createAnOrder will fire off
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        sumItemsPrice: cart.sumItemsPrice,
        collectionFee: cart.collectionFee,
        //vatPrice: cart.vatPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutProcess p1 p2 p3 p4 />{' '}
      {/*added p4, the last part of the checkout process. */}
      <Row>
        <Col md={8}>
          {' '}
          {/*8 Col Div */}
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>User Address</h2>
              <p>
                <strong>Address:</strong>
                {/*??paths required for the full address.??*/}
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postCode},{cart.shippingAddress.country},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
              {/*??payment/paymentMethod??-->was paymentMethod*/}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((
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
                <h2>Order Summary</h2> {/*Card main header displayed*/}
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Selected Items</Col> {/*mini header displayed*/}
                  <Col>${cart.sumItemsPrice}</Col>{' '}
                  {/*summary of the items price*/}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Collection Fee</Col> {/*mini header displayed*/}
                  <Col>${cart.collectionFee}</Col>
                  {/*fee to collect items from store*/}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>VAT </Col> {/*mini header displayed*/}
                  <Col>${cart.vatPrice}</Col>
                  {/* VAT price*/}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price </Col> {/*mini header displayed*/}
                  <Col>${cart.totalPrice}</Col>{' '}
                  {/*total price including all Tax's and Fee's*/}
                </Row>
              </ListGroup.Item>
              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
                {/*display whatever the error is through a Message and the variant = alert component */}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0} //button is disabled if no items are in the cart
                  onClick={placeOrderHandler} //order is placed upon clicking
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage
