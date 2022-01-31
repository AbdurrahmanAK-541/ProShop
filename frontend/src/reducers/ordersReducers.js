import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
} from '../constants/ordersConstants'

//import to store.js
//pass in state as an empty object and an action
export const orderCreateReducer = (state = {}, action) => {
  //was createOrderReducer
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false, //no longer required hence why it's set to false
        success: true, //created order successfully
        order: action.payload, //order will be the action.payload
      }
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload, //error will be action.payload
      }
    default:
      return state
  }
}

export const orderDetailReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  //in  the state, pass in orderItems as an empty array and shippingAddress as an empty object
  //set loading to true because it will then load the order before loading was true --> set to true as a default.
  //was createOrderReducer
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state, //whats already in the state
        loading: true,
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false, //no longer required hence why it's set to false
        order: action.payload, //order will be the action.payload
      }
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload, //error will be action.payload
      }
    default:
      return state
  }
}
