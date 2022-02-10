import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productsActions'

export const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  //getting the keyword from the URL (set in the App.js in the route)
  //keyword will be passed into listProducts as it's the action that gets the products from the backend
  //might be nothing --> send to main homescreen
  //whatever it is, it will have to go through listProducts action
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword)) //accounted for in listProducts in productAction.js
  }, [dispatch, keyword]) //add keyword as a dependency so thay useEffect fires off whenever the keyword is changed

  return (
    <>
      <h1> Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error}
        </Message> /* */ /* variant danger to display the message in Red */
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
