import axios from 'axios' /*imported axios --> make a request to the api to get the data fields for the product to add to the cart */
import { CART_ADD_ITEM } from '../constants/cartConstants' /**/


export const addToCart = (id, qty) => async (dispatch, getState) =>{ 
/*added function that takes in the id and qty taken from the URL then Thunk to pass in dispatch and getState to allow the retaining of 
the entire state tree (can get anything such as productList, productDetails etc we can attain 
with getState.(whatever is needed from store*/
/*saving the cart to local storage*/

    const { data } = await axios.get(`/api/products/${id}`)
    /* make a request: destructure the data and get it from axios (we have to 'await' since its asyncrynous*/
    /*then get from axios the products from whateber the id that is passed in */

    dispatch({ /*uses distpatch to trigger a state change by calling in the reducer and action*/
        type: CART_ADD_ITEM,
        payload: { /* this is the data pack that will be sent using the GET method in HTTP that will contain info submitted to the server*/
            product: data._id, 
            name: data.name, 
            image: data.price, 
            countInStock: data.countInStock,
            qty
        }
    })
    /*Once it's dispatched, we store it locally using localStorage API*/
    /*we use getState to store the whole cart that includes the cartitems*/
    /*JSON.stringify is used since a JSON object will be returned and we can only save strings in localStorage*/
    /*where do we get it? from the store.js */
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}