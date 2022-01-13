import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import message from '../components/Message'
import { addToCart } from '../actions/cartActions'


const CartScreen = ({match, location, history}) => { /*history used to redirect*/
    const productId = match.params.id /* 3:06  34*/

    const qty = location.search ? Number(location.search.split('=')[1]) : 1 /* 34 "?qty=1:" --> "?qty=" and "1"  */

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems) /* items added to the cart displayed to the console*/ 

    useEffect(() => {
        if (productId){
            dispatch(addToCart(productId, qty))
        }
    },   [dispatch, productId, qty])

    return (
        <div>
            This is my cart page
        </div>
    )
}

export default CartScreen
