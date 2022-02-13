import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listUserOrder } from '../actions/ordersActions'
//import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import { USER_UPDATED_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails) //get user details from the state.
  const { loading, error, user } = userDetails //get loading, error and user from the state

  const userLogin = useSelector((state) => state.userLogin) // will be used to check if user is logged in
  const { userInformation } = userLogin //getting user information from the state

  const userUpdatedProfile = useSelector((state) => state.userUpdatedProfile) //used to check if user profile successfully
  const { success } = userUpdatedProfile // get the success value from the update profile state

  const userOrderList = useSelector((state) => state.userOrderList) //get user details from the state. (reducer/store)
  const { loading: loadingOrders, error: errorOrders, orders } = userOrderList //get loading, error and user from the state

  useEffect(() => {
    if (!userInformation) {
      // if there's no user information, then the user is not logged in
      history.push('/login') //send the user to the login page to login
    } else {
      //or
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATED_PROFILE_RESET })
        //check for the user name coming from UserDetails
        dispatch(getUserDetails('profile')) //userDetails gets in an id but in this case will be taking in 'profile' and that's what will be passed in the URL 10:22
        dispatch(listUserOrder()) //can be seen in the redux state
      } else {
        //or if we do have the user...
        setName(user.name) //display the user name
        setEmail(user.email) //display the user email
      }
    }
  }, [dispatch, history, userInformation, user, success]) //passed in dependencies for useEffect. fired off when a change is submitted

  const submitHandler = (e) => {
    //call submit handler by submitting the form
    e.preventDefault()
    if (password !== confirmPassword) {
      //if the inputted password is not equal to the inputted confirm password
      setMessage('Passwords Do Not Match') //display warning message
    } else {
      //if passwords math then
      dispatch(updateUserProfile({ id: user._id, name, email, password })) //dispatch updateUserProfile which passes in the user by calling it from userActions.js
      //id is the user object passed in to the action once submitted
    }
  }

  return (
    //The Form Fields, similar to the one in RegisterScreen.js
    <Row>
      <Col md={3}>
        <h2>User's Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Profile Updated Successfully</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>User name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='Password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='Password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            className='justify-content-center mt-3'
            type='submit'
            variant='primary'
          >
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{ color: 'Orangered' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{ color: 'Orangered' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <NavLink to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='dark'>
                        Details
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
