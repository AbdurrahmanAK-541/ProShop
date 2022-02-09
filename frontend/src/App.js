import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import AddressScreen from './screens/AddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ListOfUsersScreen from './screens/ListOfUsersScreen'
import EditUserScreen from './screens/EditUserScreen'
import ListOfProductsScreen from './screens/ListOfProductsScreen'
import EditProductScreen from './screens/EditProductScreen'
import ListOfOrdersScreen from './screens/ListOfOrdersScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          {/*P1 */}
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/address' component={AddressScreen} />
          {/*P2 */}
          <Route path='/payment' component={PaymentMethodScreen} />
          {/*P3*/}
          <Route path='/completeOrder' component={PlaceOrderScreen} />
          {/*P4 */}
          <Route path='/order/:id' component={OrderScreen} />
          <Route
            path='/cart/:id?'
            component={CartScreen} /*id is optional hence why I added a ?*/
          />
          <Route path='/admin/userList' component={ListOfUsersScreen} />
          <Route path='/admin/productList' component={ListOfProductsScreen} />
          <Route path='/admin/orderList' component={ListOfOrdersScreen} />
          <Route path='/admin/user/:id/editUsers' component={EditUserScreen} />
          <Route
            path='/admin/product/:id/editProducts'
            component={EditProductScreen}
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
