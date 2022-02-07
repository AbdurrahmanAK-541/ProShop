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
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}
