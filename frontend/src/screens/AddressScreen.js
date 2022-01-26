import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutProcess from '../components/CheckoutProcess'
import { saveAddress } from '../actions/cartActions'

const AddressScreen = ({ history }) => {
  //destructure props (history) - needed to redirect/push
  const cart = useSelector((state) => state.cart)
  const { userAddress } = cart
  //select from the state the cart sections of the state to get user shipping address
  //above useState('') because the aim is to fill the
  const [address, setAddress] = useState(userAddress.address) //get userAddress and get address
  const [city, setCity] = useState(userAddress.city) //get userAddress and get city
  const [postCode, setPostCode] = useState(userAddress.postCode) //get userAddress and get post code //52
  const [country, setCountry] = useState(userAddress.country) //get userAddress and get country

  const dispatch = useDispatch() //used to dipatch saveAddress function

  const submitHandler = (e) => {
    //calling submit handler and setting event to
    e.preventDefault()
    dispatch(saveAddress({ address, city, postCode, country }))
    //dispatch save address function and pass in object with the form data
    history.push('/payment') //moves onto new/next page which is payment
  }
  return (
    <FormContainer>
      <CheckoutProcess p1 p2 />
      {/*bring in the check out process that involves part1 (login) and part 2(userAddress )*/}
      <h1>User Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>User Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>User city</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postCode'>
          <Form.Label>User post Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter post Code'
            value={postCode}
            required
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>User Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          className='justify-content-center mt-3' //spaced out the form button --> looks nicer
          type='submit'
          variant='primary'
        >
          Proceed To Payment
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddressScreen
