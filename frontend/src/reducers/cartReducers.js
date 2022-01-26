import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstants'

//initial state for cart reducer
export const cartReducer = (
  state = { cartItems: [], userAddress: {} },
  action
) => {
  //creating cartItems Array = more than one item in Cart
  //included the user address as an empty object
  switch (action.type) {
    case CART_ADD_ITEM:
      const item =
        action.payload /*things passed through the product such as the Id which will be called product*/

      const existItem = state.cartItems.find((x) => x.product === item.product)
      /*finds if item already exists --> Id is called product*/
      /* x passed through an arrow function for each of the items in the curren state in the cart
            items where x.product (which is the id) is equal to the 'current' item.product meaning it exists already in the cart*/

      if (existItem) {
        /*if the item exists*/
        return {
          ...state /*return a state and have what's already in the state*/,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
          /* map through current items in the cart and for each x (new item), if x.product (current item id) is equal to 
                    the existItem.product (existing item id) then return the item for this iteration. else, it'll be x */
        }
      } else {
        /*if the item doesn't exists then push it to the cartItems array*/
        return {
          ...state /*return a state and have what's already in the state*/,
          cartItems: [
            ...state.cartItems,
            item,
          ] /* set the cartItems to an array with the current existing items plus the new items*/,
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    case CART_SAVE_ADDRESS:
      return {
        ...state, //return the initial state plus ...
        userAddress: action.payload, //the user address is also returned with the from data as the payload
      }

    case CART_SAVE_PAYMENT:
      return {
        ...state, //return the initial state
        paymentMethod: action.payload, //set the payload as the payment method
      }

    default:
      return state
  }
}
