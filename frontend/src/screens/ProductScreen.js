import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, productReview } from '../actions/productsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { REVIEW_PRODUCT_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  /*Added history because it's needed to push*/
  const [qty, setQty] = useState(1) /* 34 3.30*/
  const [rating, setRating] = useState(0) //set to 0 by defauly
  const [comment, setComment] = useState('') //set to an empty object

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const reviewProduct = useSelector((state) => state.reviewProduct)
  const {
    error: errorReviewingProduct,
    success: successfulyReviewProduct,
  } = reviewProduct

  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.id}?qty=${qty}`
    ) /*redirected to the cart, added a query string of qty thats set to quantity selected */
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option> /*Array starts from 0, I want to start from 1*/
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message> Be The First Person To Leave A Review </Message>
              )}
              {/*Reviews is imbedded into product... if it has a length of 0 then Message */}
              {/* 85//9:00 How to delete reviews from compass */}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2> Write a Review </h2>
                  {userInformation ? (
                    <h1></h1>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Login</Link> Before Leaving A
                      Review
                    </Message>
                  )}
                </ListGroupItem>
                {/*Cycyle through all the reviews using .map and then for each reiview include the following objects ..*/}
                {/*rating comonent has a value that includes the review rating */}
                {/*List Group Item has a unique key since its a list */}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
