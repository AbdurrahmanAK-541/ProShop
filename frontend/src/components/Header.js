import React from 'react'
import { Route } from 'react-router-dom' //Needed for the SearchBar..
import { useDispatch, useSelector } from 'react-redux' //reminder: dispatch=action selector=bring something in
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBar from './SearchBar' //from different folder use one dot
import { logout } from '../actions/userActions' //from different folder use two dots

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>FoodHub</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBar history={history} />} />

            {/*5:00..86 */}
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
              {userInformation ? (
                <NavDropdown title={userInformation.name} id='username'>
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  {/*FIXED link issue */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href='/login'>
                  {' '}
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              )}
              {userInformation && userInformation.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item href='/admin/userList'>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/admin/productList'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/admin/orderList'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
