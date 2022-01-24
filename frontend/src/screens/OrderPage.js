import React from 'react'
import {
  Button,
  Col,
  Row,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutProcess from '../components/CheckoutProcess'
import { Link } from 'react-router-dom'

const OrderPage = () => {
  const cart = useSelector((state) => state.cart)

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

  const placeOrderHandler = () => {
    console.log('Place Order')
  }

  return (
    <>
      <CheckoutProcess p1 p2 p3 p4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>User Address</h2>
              <p>
                <strong>Address:</strong>
                {cart.userAddress.address},{cart.userAddress.city},
                {cart.userAddress.postCode},{cart.userAddress.country},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Selected Items</Col>
                  <Col>${cart.sumItemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Collection Fee</Col>
                  <Col>${cart.collectionFee}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>VAT </Col>
                  <Col>${cart.vatPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
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
