import React from 'react'
import { Nav } from 'react-bootstrap'

const CheckoutProcess = ({ p1, p2, p3, p4 }) => {
  //checkout process split into 4 parts
  return (
    <Nav className='justify-content-center mb-5'>
      {' '}
      {/* makes the list spaced out evenly and centre of the page */}
      <Nav.Item>
        {/* if on part one of the process, then login. else, disable login*/}
        {p1 ? (
          <Nav.Link to='/login'>
            <Nav.Link>Sign In</Nav.Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>SignIn</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {/* if on part 2 of the process, then display address . else, disable address*/}
        {p2 ? (
          <Nav.Link href='/address'>
            <Nav.Link>Address</Nav.Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Address</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {/* if on part 3 of the process, then display payment . else, disable payment*/}
        {p3 ? (
          <Nav.Link href='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {/* if on part 4 of the process, then display Order . else, disable order*/}
        {p4 ? (
          <Nav.Link href='/order'>
            <Nav.Link>Order</Nav.Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}
//Nav.Link disabled if already logged in --> makes it look greyed out.

export default CheckoutProcess
