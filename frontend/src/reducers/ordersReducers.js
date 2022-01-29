import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
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
