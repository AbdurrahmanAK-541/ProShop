import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllOrders } from '../actions/ordersActions'

const ListOfOrdersScreen = ({ history }) => {
  //bring in history from the props
  const dispatch = useDispatch()

  const allOrdersList = useSelector((state) => state.allOrdersList) //allOrdersList reducers being brought in from the state through useSelector
  const { loading, error, orders } = allOrdersList
  //useres will be mapped in <tbody>

  const userLogin = useSelector((state) => state.userLogin) //userLogin reducers being brought in from the state through useSelector
  const { userInformation } = userLogin

  useEffect(() => {
    if (userInformation && userInformation.isAdmin) {
      dispatch(listAllOrders()) //action being dispatched
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInformation])
  //dependencies. pass in successfully deleted because of changes, useEffect needs to run again so the usersList reloads

  return (
    <>
      <h1> List Of orders </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER Name</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID ?</th>
              <th>DELIVERED ?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

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
                    <Button variant='dark' className='btn-sm'>
                      Order Details
                    </Button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ListOfOrdersScreen
