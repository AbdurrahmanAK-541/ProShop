import axios from 'axios'
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
} from '../constants/ordersConstants'

//fire off when PLACE ORDER button is pressed. (57 12:00)
//import createAnOrder action to the orderPage.js
//was createAnOrder
export const createOrder = (order) => async (dispatch, getState) => {
  //takes in the order object and passes in getState as token is needed
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST, //DISPATCH the create order request and set loading to true
    })

    const {
      userLogin: { userInformation }, //this is where user info is attained
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        //headers of content type and authorization set to the token
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)
    //POST request to /api/orders (backend)
    //pass in the order object (user data) as a second argument

    dispatch({
      type: CREATE_ORDER_SUCCESS, //order is created successfully...
      payload: data, //data is passed in as the payload through the state into the order state (in orderPage.js)
    })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL, // order creation failed
      //error message is passed in as the payload.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}