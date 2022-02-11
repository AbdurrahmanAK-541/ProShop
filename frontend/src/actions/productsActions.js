import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  REVIEW_PRODUCT_REQUEST,
  REVIEW_PRODUCT_SUCCESS,
  REVIEW_PRODUCT_FAIL,
  TOP_PRODUCT_REQUEST,
  TOP_PRODUCT_SUCCESS,
  TOP_PRODUCT_FAIL,
} from '../constants/productConstants'

//pass in keywords for the searchBar and set it to an empty string by default.
export const listProducts = (keyword = '' /*pageNumber = ''*/) => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}`
      /*&pageNumber=${pageNumber}*/
    )

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productDelete = (id) => async (dispatch, getState) => {
  //takes in the product id that is to be deleted then passes in getState as token is needed

  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST, //DISPATCH the DELETE product request and set loading to true
    })

    const {
      userLogin: { userInformation }, //this is where user info is attained
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    await axios.delete(`/api/products/${id}`, config)
    //DELETE request to /api/orders/id (backend)
    //pass in the paymentResult that will come from PayPal and config to receive token for the id

    dispatch({
      type: DELETE_PRODUCT_SUCCESS, //Selete product successfully...
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL, // order creation failed
      //error message is passed in as the payload.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productCreate = (id) => async (dispatch, getState) => {
  //takes in the product id that is to be deleted then passes in getState as token is needed

  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST, //DISPATCH the DELETE product request and set loading to true
    })

    const {
      userLogin: { userInformation }, //this is where user info is attained
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)
    //DELETE request to /api/orders/id (backend)
    //pass in the paymentResult that will come from PayPal and config to receive token for the id

    dispatch({
      type: CREATE_PRODUCT_SUCCESS, //Selete product successfully...
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL, // order creation failed
      //error message is passed in as the payload.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productUpdate = (product) => async (dispatch, getState) => {
  //takes in the product id that is to be deleted then passes in getState as token is needed
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST, //DISPATCH the DELETE product request and set loading to true
    })

    const {
      userLogin: { userInformation }, //this is where user info is attained
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )
    //PUT request to /api/orders/id (backend)
    //pass in the paymentResult that will come from PayPal and config to receive token for the id

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS, //Selete product successfully...
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL, // order creation failed
      //error message is passed in as the payload.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productReview = (productID, review) => async (
  dispatch,
  getState
) => {
  //takes in the productID and the review object that will contain the rating + comment
  //that is to be deleted then passes in getState as token is needed
  try {
    dispatch({
      type: REVIEW_PRODUCT_REQUEST, //DISPATCH the DELETE product request and set loading to true
    })

    const {
      userLogin: { userInformation }, //this is where user info is attained
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    await axios.post(`/api/products/${productID}/reviews`, review, config)
    //PUT request to /api/orders/id (backend)
    //pass in the review object and the config

    dispatch({
      type: REVIEW_PRODUCT_SUCCESS, //Selete product successfully...
    })
  } catch (error) {
    dispatch({
      type: REVIEW_PRODUCT_FAIL, // order creation failed
      //error message is passed in as the payload.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/topRated`)

    dispatch({
      type: TOP_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TOP_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
