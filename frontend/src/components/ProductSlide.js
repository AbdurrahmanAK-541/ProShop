import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
//import { NavLink } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import Loader from './Loader'
import { listTopRatedProducts } from '../actions/productsActions'

const ProductSlide = () => {
  const dispatch = useDispatch()

  const topRatedProducts = useSelector((state) => state.topRatedProducts) //8:30
  const { loading, error, products } = topRatedProducts

  useEffect(() => {
    dispatch(listTopRatedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : /*
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    */
  null
}

export default ProductSlide
