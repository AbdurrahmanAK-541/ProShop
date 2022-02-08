import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  deleteProductsReducer,
  createProductsReducer,
  updateProductsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers' /*imported so that it can be used*/
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdatedProfileReducer,
  listOfUsersReducer,
  deleteUserReducer,
  editUserReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailReducer,
  payOrderReducer,
  userOrderListReducer,
} from './reducers/ordersReducers'

//viewed in the state
const reducer = combineReducers({
  //user reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  deleteProduct: deleteProductsReducer,
  createProduct: createProductsReducer,
  updateProduct: updateProductsReducer,

  cart: cartReducer /*naming conventions: Call the reducer to whatever its called in the state then the reducers*/,
  //user reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer, //bringing in userDetailsReducer which is now visible in the state
  userUpdatedProfile: userUpdatedProfileReducer, //bringing in userDetailsReducer which is now visible in the state
  listOfUsers: listOfUsersReducer, //Bringing in listOfUsersReducer which is now visible in the state
  deleteUser: deleteUserReducer,
  editUser: editUserReducer,
  //order reducers
  orderCreate: orderCreateReducer, //bringing in createOrderReducer which is now visible in the sate -> now create an action :)
  orderDetail: orderDetailReducer,
  payOrder: payOrderReducer,
  userOrderList: userOrderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
/*fetched from localStorage and IF it exists then we get it from cartItems and if its there then we run it through JSON.parse 
as it needs to be stored as a String ELSE if its not found in localStorage then pass in an empty array*/

const userInformationFromStorage = localStorage.getItem('userInformation')
  ? JSON.parse(localStorage.getItem('userInformation'))
  : null

//saved and loaded from local storage, through store.js -> whenever the store initialises, its automatically added to the state
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') //checks for user's address from storage
  ? JSON.parse(localStorage.getItem('shippingAddress')) //if it exists then use it
  : {} //if it doesn't exist then it will pass an empty object

//ADDED payment method to the local storage.
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') //checks for user's payment Method from storage
  ? JSON.parse(localStorage.getItem('paymentMethod')) //if it exists then use it
  : {} //if it doesn't exist then it will pass an empty object

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  }, //add to the cart State
  userLogin: { userInformation: userInformationFromStorage }, //added to the login state
  /*11:19 6.33 added our cart to the intialState and set it to an object and set cartItems to the cartItemsFromStorage(localstorage)*/
  /*^^ currently an empty array as nothing is being passed in to be stored (seen in redux dev-tool)*/
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
