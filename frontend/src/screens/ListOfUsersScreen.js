import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { usersList, userDelete } from '../actions/userActions'

const ListOfUsersScreen = ({ history }) => {
  //bring in history from the props
  const dispatch = useDispatch()

  const listOfUsers = useSelector((state) => state.listOfUsers) //listOfUsers reducers being brought in from the state through useSelector
  const { loading, error, users } = listOfUsers
  //useres will be mapped in <tbody>

  const userLogin = useSelector((state) => state.userLogin) //userLogin reducers being brought in from the state through useSelector
  const { userInformation } = userLogin

  const deleteUser = useSelector((state) => state.deleteUser) //deleteUser reducers being brought in from the state through useSelector
  const { success: successfulyDeleted } = deleteUser

  useEffect(() => {
    if (userInformation && userInformation.isAdmin) {
      dispatch(usersList()) //action being dispatched
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successfulyDeleted])
  //dependencies. pass in successfully deleted because of changes, useEffect needs to run again so the usersList reloads

  const deleteUserHandler = (id) => {
    if (window.confirm('Are You Sure You Want To Delete This User?')) {
      dispatch(userDelete(id))
    }
    //Adding a confirmation before deleting
    //pass in the userDelete action. pass in the id that will also be passed in the Handler
  }

  return (
    <>
      <h1> List Of Users </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className='fas fa-check'
                      style={{ color: 'DarkGreen' }}
                    ></i>
                  ) : (
                    <i
                      className='fas fa-times'
                      style={{ color: 'Orangered' }}
                    ></i>
                  )}
                </td>
                <td>
                  <NavLink to={`/user/${user._id}/edit`}>
                    <Button variant='dark' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </NavLink>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteUserHandler(user._id)
                    }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ListOfUsersScreen
