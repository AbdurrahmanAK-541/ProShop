import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'
import { Link } from 'react-router-dom'

const EditUserScreen = ({ match, history }) => {
  const userID = match.params.id
  //use match to get the UserID and put it in a variable.
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false) //set to false by default

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if (!user.name || user._id !== userID) {
      //check if the user doesnt exist or if the user id is not equal to the userID that is coming from the url
      dispatch(getUserDetails(userID))
    } else {
      //if the user does exist then set the following fields..
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user, userID]) //passing in the dependencies.
  //pass in the user to the useEffect dependencies so that it updates

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/admin/userList' className='btn btn-dark my-3'>
        Back
      </Link>
      <FormContainer>
        <h1>Edit User Details</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                //value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button
              className='justify-content-center mt-3'
              type='submit'
              variant='primary'
            >
              Update User Profile
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUserScreen
