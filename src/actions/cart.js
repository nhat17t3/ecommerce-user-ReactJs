import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  CLEAR_CART,
  ADDTOCART,
  DETIAL_ITEM,
  DETIAL_INCREASE_ITEM,
  DETIAL_DECREASE_ITEM,
  ADD_WISHLIST_PRODUCT,
  INCREASE_WISHLIST_PRODUCT,
  DECREASE_WISHLIST_PRODCUT,
  WISHLIST_REMOVE_ITEM,
  GET_CART
} from './types';

// FOR ADD ITEM TO CART
export const addItemToCart = product => {
  return {
    type: ADD_ITEM,
    product
  };
};

// FOR SHOW A DETIAL PRODUCT FROM STATIC-JSON ON SINGLE PAGE
export const DetailedProducts = product => {
  return {
    type: DETIAL_ITEM,
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

// FOR INCREASE THE QUANTITY IN SINGLE PRODUCT PAGE
export const DetailincreaseItemQuantity = (index, product, quantity) => {
  return {
    type: DETIAL_INCREASE_ITEM,
    index,
    product,
    quantity
  };
};

// FOR DECREASE THE QUANTITY IN SINGLE PRODUCT PAGE
export const DetaildecreaseItemQuantity = (index, product, quantity) => {
  return {
    type: DETIAL_DECREASE_ITEM,
    index,
    product,
    quantity
  };
};

// FOR ADD PRODUCT TO WISHLIST PAGE
export const AddWishlistProducts = product => {
  return {
    type: ADD_WISHLIST_PRODUCT,
    product
  };
};

// FOR INCREASE THE QUANTITY OF WISHLIST PRODUCT PAGE
export const WishlistincreaseItemQuantity = (index, product, quantity) => {
  return {
    type: INCREASE_WISHLIST_PRODUCT,
    index,
    product,
    quantity
  };
};

// FOR DECREASE THE QUANTITY IN WISHLIST PRODUCT PAGE
export const WishlistdecreaseItemQuantity = (index, product, quantity) => {
  return {
    type: DECREASE_WISHLIST_PRODCUT,
    index,
    product,
    quantity
  };
};

// REMOVE ITEM FORM CART
export const removeItemFromWishlist = (index, product) => {
  return {
    type: WISHLIST_REMOVE_ITEM,
    index,
    product
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
