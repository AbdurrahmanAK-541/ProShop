import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productsActions'
import TabName from '../components/TabName'
import ProductSlide from '../components/ProductSlide'
//import Paging from '../components/Paging'
import { Link } from 'react-router-dom'

export const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  //const pageNumber = match.params.pageNumber || 1

  //getting the keyword from the URL (set in the App.js in the route)
  //keyword will be passed into listProducts as it's the action that gets the products from the backend
  //might be nothing --> send to main homescreen
  //whatever it is, it will have to go through listProducts action
  //if there's no specific page number, set it to 1.
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products /*page, pages*/ } = productList

  useEffect(() => {
    dispatch(listProducts(keyword /*pageNumber*/)) //accounted for in listProducts in productAction.js
  }, [dispatch, keyword /*pageNumber*/])
  //add keyword as a dependency so thay useEffect fires off whenever the keyword or pageNumber is changed

  return (
    <>
      <TabName />
      {!keyword ? (
        <ProductSlide />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Back
        </Link>
      )}
      <h1> Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error}
        </Message> /* */ /* variant danger to display the message in Red */
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/*<Paging pages={pages} page={page} /> */}

          {/* passing down page, pages ... from productList state above*/}
          {/* if theres a keyword inputted use the keyword. else, use an empty string.*/}
        </>
      )}
    </>
  )
}

export default HomeScreen
