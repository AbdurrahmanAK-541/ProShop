import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProducts,
  productDelete,
  productCreate,
} from '../actions/productsActions'
import { CREATE_PRODUCT_RESET } from '../constants/productConstants'

const ListOfProductsScreen = ({ match, history }) => {
  //bring in history from the props
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList) //productList reducers being brought in from the state through useSelector
  const { loading, error, products } = productList
  //useres will be mapped in <tbody>

  const deleteProduct = useSelector((state) => state.deleteProduct) //deleteProduct reducers being brought in from the state through useSelector
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successfullyDeleted,
  } = deleteProduct

  const createProduct = useSelector((state) => state.createProduct) //createProduct reducers being brought in from the state through useSelector
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successfullyCreated,
    product: createdProduct,
  } = createProduct

  const userLogin = useSelector((state) => state.userLogin) //userLogin reducers being brought in from the state through useSelector
  const { userInformation } = userLogin

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET })

    if (!userInformation.isAdmin) {
      history.push('/login')
    }

    if (successfullyCreated) {
      history.push(`/admin/product/${createdProduct._id}/editProducts`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInformation,
    successfullyDeleted,
    successfullyCreated,
    createdProduct,
  ])
  //dependencies. pass in successfully deleted because of changes, useEffect needs to run again so the usersList reloads
  //pass in succDele as a dependecy to the useEffect so that when it happens, it runs again and lists the products and the deleted product will be gone.

  const deleteUserHandler = (id) => {
    if (window.confirm('Are You Sure You Want To Delete This Product?')) {
      dispatch(productDelete(id))
    }
    //Adding a confirmation before deleting
    //pass in the userDelete action. pass in the id that will also be passed in the Handler
  }

  const createProductsHandler = () => {
    dispatch(productCreate()) //dispatching the action
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
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
              <th>PRICE BEFORE</th>
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
                <td>${product.priceBefore}</td>
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
