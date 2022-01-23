import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutProcess from '../components/CheckoutProcess'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentMethodScreen = ({ history }) => {
  //destructure props (history)
  const cart = useSelector((state) => state.cart)
  const { userAddress } = cart //
  //select from the state the cart sections of the state to get user shipping address
  //above useState('') because the aim is to fill the

  if (!userAddress) {
    //redirect if no address is inputted
    history.push('/address') //redirect them to Address.Screen.js
  }

  const [payment, setPayment] = useState('PayPal')
  //component level state: payment, setPayment
  //State has a default of PayPal as the payment method

  const dispatch = useDispatch() //used to dipatch saveAddress function

  const submitHandler = (e) => {
    //calling submit handler and setting event to
    e.preventDefault()
    dispatch(savePaymentMethod(payment))
    //dispatch savePaymentMethod function and pass in payment object
    history.push('/completeOrder') //moves onto new/next page which is order
  }
  return (
    <FormContainer>
      <CheckoutProcess p1 p2 p3 />
      {/*bring in the check out process that involves part1 (login) and part 2(userAddress ) part 3(payment)*/}
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Col>
            {/* PayPal or Credit Card Payment Option*/}
            {/*  */}
            <Form.Check
              type='radio'
              label='PayPal Or Credit Card'
              id='PayPal'
              name='PayPalPaymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPayment(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        {/*Spaces out the form */}

        {/*Button to proceed to the next step after submitting payment method*/}
        <Button type='submit' variant='primary'>
          Proceed To Order
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen
