import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productsActions'

const ListOfProductsScreen = ({ match, history }) => {
  //bring in history from the props
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList) //productList reducers being brought in from the state through useSelector
  const { loading, error, products } = productList
  //useres will be mapped in <tbody>

  const userLogin = useSelector((state) => state.userLogin) //userLogin reducers being brought in from the state through useSelector
  const { userInformation } = userLogin

  useEffect(() => {
    if (userInformation && userInformation.isAdmin) {
      dispatch(listProducts()) //action being dispatched
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInformation])
  //dependencies. pass in successfully deleted because of changes, useEffect needs to run again so the usersList reloads

  const deleteUserHandler = (id) => {
    if (window.confirm('Are You Sure You Want To Delete This Product?')) {
      //delete Products
    }
    //Adding a confirmation before deleting
    //pass in the userDelete action. pass in the id that will also be passed in the Handler
  }

  const createProductsHandler = (product) => {
    console.log('create products')
  }

  return (
    <>
      <Row className='align-items-centre'>
        <Col>
          <h1>List Of Products</h1>
        </Col>
      </Row>

      <Col className='text-right'>
        <Button className='my-3' onClick={createProductsHandler}>
          <i className='fas fa-plus'></i> Create Product
        </Button>
      </Col>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <NavLink to={`/admin/product/${product._id}/editProducts`}>
                    <Button variant='dark' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </NavLink>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteUserHandler(product._id)
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

export default ListOfProductsScreen
