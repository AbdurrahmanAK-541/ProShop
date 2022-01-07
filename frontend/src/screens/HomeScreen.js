import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productsActions'


export const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect (() => {
       dispatch(listProducts())
    }, [dispatch])
    
    return (
        <>
              <h1>  Products </h1> 
              {loading ?  
                <Loader />
              : error ? 
              <Message variant='danger'>{error}</Message> /* variant danger to display the message in Red */ /* */
              : 
               <Row>
                  {products.map(product => (
                      <Col key={product._id} sm={12} lg={4} xl={3}>
                       <Product product={product}/>
                      </Col>
                  ))}
              </Row>}  
              
        </>
    )
}

export default HomeScreen
