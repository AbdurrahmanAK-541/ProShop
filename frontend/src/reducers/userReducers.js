import {
  USER_UPDATED_PROFILE_REQUEST,
  USER_UPDATED_PROFILE_SUCCESS,
  USER_UPDATED_PROFILE_FAIL,
  USER_UPDATED_PROFILE_RESET,
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
  LIST_OF_USERS_REQUEST,
  LIST_OF_USERS_SUCCESS,
  LIST_OF_USERS_FAIL,
  LIST_OF_USERS_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  EDIT_USER_RESET,
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
    case USER_UPDATED_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const listOfUsersReducer = (state = { users: [] }, action) => {
  //empty state to begin with
  switch (action.type) {
    case LIST_OF_USERS_REQUEST:
      return { loading: true }
    case LIST_OF_USERS_SUCCESS:
      return { loading: false, users: action.payload }
    //upon success, set the user infotmation to payload and a success value to true to use in the screen
    case LIST_OF_USERS_FAIL:
      return { loading: false, error: action.payload }

    case LIST_OF_USERS_RESET:
      return { users: [] }

    default:
      return state
  }
}

export const deleteUserReducer = (state = {}, action) => {
  //empty state to begin with
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true }
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true }
    //upon success, set the user infotmation to payload and a success value to true to use in the screen
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const editUserReducer = (state = { user: {} }, action) => {
  //empty user object passed into the state.
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return { loading: true }
    case EDIT_USER_SUCCESS:
      return { loading: false, success: true }
    //upon success, set the user infotmation to payload and a success value to true to use in the screen
    case EDIT_USER_FAIL:
      return { loading: false, error: action.payload }
    case EDIT_USER_RESET:
      return {
        user: {},
        //return the original state. (state object with an empty user)
      }
    default:
      return state
  }
}
