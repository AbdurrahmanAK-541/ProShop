import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATED_PROFILE_REQUEST,
  USER_UPDATED_PROFILE_SUCCESS,
  USER_UPDATED_PROFILE_FAIL,
  USER_DETAILS_RESET,
  LIST_OF_USERS_REQUEST,
  LIST_OF_USERS_SUCCESS,
  LIST_OF_USERS_FAIL,
  LIST_OF_USERS_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  EDIT_USER_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_FAIL,
} from '../constants/userConstants'
import { USER_ORDER_LIST_RESET } from '../constants/ordersConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      heades: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInformation', JSON.stringify(data)) //8:00 44
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInformation') //removes the user information from local storage when logging out
  dispatch({ type: USER_LOGOUT }) //DISPATCH = Action completed
  dispatch({ type: USER_ORDER_LIST_RESET }) //DISPATCH = Action completed
  dispatch({ type: USER_DETAILS_RESET }) //DISPATCH = Action completed
  dispatch({ type: LIST_OF_USERS_RESET }) //CANT SEE LIST OF USERS AFTER LOGGING OUT AS ADMIN
}
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS, //LOGS user in as soon as they register
      payload: data,
    })

    localStorage.setItem('userInformation', JSON.stringify(data)) //8:00 44
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//49 3:30
//pass through profile as the id
//pass in getState as we need to send a token
export const getUserDetails = (id) => async (dispatch, getState) => {
  //attaining user through id
  //get user information from getState which constains the user token
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)
    //GET request to api/users/ id which is 'profile' passed in as id and config that includes users token, login information etc

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data, //data attained and displayed on profile screen
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  //takes in the user object and passes in getState as token is needed
  //get user information from getState which constains the user token
  try {
    dispatch({
      type: USER_UPDATED_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)
    //PUT request to /api/users/profile (backend)
    //pass in the user object (user data) as a second argument as it's the data that's updated

    dispatch({
      type: USER_UPDATED_PROFILE_SUCCESS,
      payload: data, //data UPDATED and displayed on profile screen (dispatched in profile screen)
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data, //data UPDATED and displayed on profile screen (dispatched in profile screen)
    })

    localStorage.setItem('userInformation', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATED_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const usersList = () => async (dispatch, getState) => {
  //takes in the user object and passes in getState as token is needed
  //get user information from getState which constains the user token
  try {
    dispatch({
      type: LIST_OF_USERS_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.get(`/api/users`, config)
    //PUT request to /api/users/profile (backend)
    //pass in the user object (user data) as a second argument as it's the data that's updated

    dispatch({
      type: LIST_OF_USERS_SUCCESS,
      payload: data, //data UPDATED and displayed on profile screen (dispatched in profile screen)
    })
  } catch (error) {
    dispatch({
      type: LIST_OF_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userDelete = (id) => async (dispatch, getState) => {
  //pass in the id to know which user to delete.
  //get user information from getState which constains the user token
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    await axios.delete(`/api/users/${id}`, config)
    //PUT request to /api/users/profile (backend)
    //pass in the user object (user data) as a second argument as it's the data that's updated

    dispatch({ type: DELETE_USER_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userEdit = (user) => async (dispatch, getState) => {
  //pass in the user object
  //get user information from getState which constains the user token
  try {
    dispatch({
      type: EDIT_USER_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()
    //destrucutre from getState function to get userLogin.
    //destructure userLogin to attain the user's information which is in user login => gives access to the logged in user object

    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${userInformation.token}`, //pass the token in the headers as Authorization and set it to Bearer
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)
    //passed in the user object.
    //PUT request to /api/users/:id (backend)
    //pass in the user object (user data) as a second argument as it's the data that's updated

    dispatch({ type: EDIT_USER_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
