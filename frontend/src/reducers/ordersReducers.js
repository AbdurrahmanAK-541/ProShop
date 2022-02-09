import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  PAY_ORDER_RESET,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  USER_ORDER_LIST_FAIL,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_RESET,
  ALL_ORDERS_LIST_REQUEST,
  ALL_ORDERS_LIST_SUCCESS,
  ALL_ORDERS_LIST_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_RESET,
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

//orderPayReducer
export const payOrderReducer = (state = {}, action) => {
  //set the state to an empty object
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return {
        loading: true,
      }
    case PAY_ORDER_SUCCESS:
      return {
        loading: false, //no longer required hence why it's set to false
        success: true, //order will be the action.payload
      }
    case PAY_ORDER_FAIL:
      return {
        error: action.payload, //error will be action.payload
      }
    case PAY_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const deliverOrderReducer = (state = {}, action) => {
  //set the state to an empty object
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return {
        loading: true,
      }
    case DELIVER_ORDER_SUCCESS:
      return {
        loading: false, //no longer required hence why it's set to false
        success: true, //order will be the action.payload
      }
    case DELIVER_ORDER_FAIL:
      return {
        error: action.payload, //error will be action.payload
      }
    case DELIVER_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const userOrderListReducer = (state = { orders: [] }, action) => {
  //order[]
  //set the state to an empty object
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case USER_ORDER_LIST_SUCCESS:
      return {
        loading: false, //no longer required hence why it's set to false
        orders: action.payload, //order will be the action.payload displayed
      }
    case USER_ORDER_LIST_FAIL:
      return {
        error: action.payload, //error will be action.payload
      }
    case USER_ORDER_LIST_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const allOrdersListReducer = (state = { orders: [] }, action) => {
  //order[]
  //set the state to an empty object
  switch (action.type) {
    case ALL_ORDERS_LIST_REQUEST:
      return {
        loading: true,
      }
    case ALL_ORDERS_LIST_SUCCESS:
      return {
        loading: false, //no longer required hence why it's set to false
        orders: action.payload, //order will be the action.payload displayed
      }
    case ALL_ORDERS_LIST_FAIL:
      return {
        error: action.payload, //error will be action.payload
      }
    default:
      return state
  }
}
