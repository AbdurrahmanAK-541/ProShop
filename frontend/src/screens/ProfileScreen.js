import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

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

  useEffect(() => {
    if (!userInformation) {
      // if there's no user information, then the user is not logged in
      history.push('/login') //send the user to the login page to login
    } else {
      //or
      if (!user.name) {
        //check for the user name coming from UserDetails
        dispatch(getUserDetails('profile')) //userDetails gets in an id but in this case will be taking in 'profile' and that's what will be passed in the URL 10:22
      } else {
        //or if we do have the user...
        setName(user.name) //display the user name
        setEmail(user.email) //display the user email
      }
    }
  }, [dispatch, history, userInformation, user]) //passed in dependencies for useEffect. fired off when a change is submitted

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      //if the inputted password is not equal to the inputted confirm password
      setMessage('Passwords Do Not Match') //display warning message
    } else {
      //Dispatch Update Profile
    }
  }

  return (
    //The Form Fields, similar to the one in RegisterScreen.js
    <Row>
      <Col md={3}>
        <h2>User's Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
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

          <Button type='submit' variant='primary'>
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
