import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers' /*imported so that it can be used*/
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer /*naming conventions: Call the reducer to whatever its called in the state then the reducers*/,
  userLogin: userLoginReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
/*fetched from localStorage and IF it exists then we get it from cartItems and if its there then we run it through JSON.parse 
as it needs to be stored as a String ELSE if its not found in localStorage then pass in an empty array*/

const userInformationFromStorage = localStorage.getItem('userInformation')
  ? JSON.parse(localStorage.getItem('userInformation'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInformation: userInformationFromStorage },
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
