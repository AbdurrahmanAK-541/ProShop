import {
  USER_UPDATED_PROFILE_REQUEST,
  USER_UPDATED_PROFILE_SUCCESS,
  USER_UPDATED_PROFILE_FAIL,
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
  USER_DETAILS_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInformation: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInformation: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  //user starts off as an empty object
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true } //will include what's in the initial state (user) and then change loading to true
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload } //user object will be filled with the action.payload (displays information)
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload } //error will be filled with the action.payload
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdatedProfileReducer = (state = {}, action) => {
  //empty state to begin with
  switch (action.type) {
    case USER_UPDATED_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATED_PROFILE_SUCCESS:
      return { loading: false, success: true, userInformation: action.payload }
    //upon success, set the user infotmation to payload and a success value to true to use in the screen
    case USER_UPDATED_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
