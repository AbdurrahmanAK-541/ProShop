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
} from '../constants/userConstants'

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
