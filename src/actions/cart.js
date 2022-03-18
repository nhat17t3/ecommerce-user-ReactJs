import axios from "../helpers/axios";
import { toast } from 'react-toastify';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  ADDTOCART,
  CLEAR_CART,
  GET_CART,
  GET_CART_BY_SERVER
} from '../constants/cart.constants';

// FOR ADD ITEM TO CART
export const addItemToCart = product => {
  return {
    type: ADD_ITEM,
    product
  };
};


// REMOVE ITEM FORM CART
export const removeItemFromCart = (index, product) => {
  return {
    type: REMOVE_ITEM,
    index,
    product
  };
};
// FOR INCREASE QUANTITY OF PRODUCT IN CART ITEM
export const increaseItemQuantity = (index, product, quantity) => {
  return {
    type: INCREASE_ITEM,
    index,
    product,
    quantity
  };
};

// FOR DECREASE THE QUANTITY OF PRODUCT IN CART
export const decreaseItemQuantity = (index, product, quantity) => {
  return {
    type: DECREASE_ITEM,
    index,
    product,
    quantity
  };
};



export const clearCartContent = () => {
  return {
    type: CLEAR_CART
  };
};

export const addToCart = () => {
  return {
    type: ADDTOCART
  };
};


export const getCart = () => {
  return {
    type: GET_CART
  };
};

export const getCartByServer = () => {
  return async (dispatch) => {
    let a = []
    let cart = JSON.parse(localStorage.getItem("cartItem"));
    cart.forEach((product) => {
      a.push(product.id)
    });
    const res = await axios.get(`/api/cart/update?products=${a}`);

    if (res.status === 200) {
      const { dataResponse, message } = res.data;
      dispatch({
        type: GET_CART_BY_SERVER,
        payload: {
          dataResponse: dataResponse,
          message: message,
        },
      });

      toast("get cart success");
    } else {
     
      toast("get cart error");
    }
  };
};
