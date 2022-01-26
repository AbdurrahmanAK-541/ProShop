import React, { useState } from 'react'
import { Form, Button, Col, FormGroup } from 'react-bootstrap'
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

  const [paymentMethod, setPaymentMethod] = useState('PayPal') //? payment/paymentMethod ..
  //component level state: payment, setPayment
  //State has a default of PayPal as the payment method

  const dispatch = useDispatch() //used to dipatch saveAddress function

  const submitHandler = (e) => {
    //calling submit handler and setting event to
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    //dispatch savePaymentMethod action and pass in payment object (method)
    history.push('/completeOrder') //moves onto new/next page which is order
  }
  return (
    <FormContainer>
      <CheckoutProcess p1 p2 p3 />
      {/*bring in the check out process that involves part1 (login) and part 2(userAddress ) part 3(payment)*/}
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Col>
            {/* PayPal or Credit Card Payment Option*/}
            {/*  */}
            <Form.Check
              type='radio' //radio buttons -> cant check more than one method
              label='PayPal Or Credit Card' //displayed to user
              id='PayPal'
              name='PayPalPaymentMethod'
              value='PayPal'
              checked //checked by default
              onChange={(e) => setPaymentMethod(e.target.value)} //when chosen, it's selected as payment method??
            ></Form.Check>
          </Col>
        </FormGroup>

        {/*Spaces out the form */}

        {/*Button to proceed to the next step after submitting payment method*/}
        <Button
          className='justify-content-center mt-5' //spaced out the form button --> looks nicer
          type='submit'
          variant='primary'
        >
          Proceed To Order
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen
