import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  CLEAR_CART,
  ADDTOCART,
  GET_CART,
  GET_CART_BY_SERVER,
} from "../constants/cart.constants";

const initialState = {
  products: [],
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      let x = 0;
      if (localStorage.getItem("cartItem")) {
        let cart = JSON.parse(localStorage.getItem("cartItem"));
        cart.forEach((product) => {
          x += product.quantity * product.price;
        });
        return {
          ...state,
          products: cart,
          total: x,
        };
      } else
        return {
          ...state,
          products: [],
          total: 0,
        };

    case GET_CART_BY_SERVER:
      let k = 0;
      if (localStorage.getItem("cartItem")) {
        let cart = JSON.parse(localStorage.getItem("cartItem"));
        let data = action.payload.dataResponse
        let final = [];
        
        cart.forEach((item) => {
          data.forEach((product) => {
            if(item.id == product.id) final.push(Object.assign({}, product, { quantity: item.quantity }))
          });
        });
        final.forEach((product) => {
          k += product.quantity * product.price;
        });
        return {
          ...state,
          products: final,
          total: k,
        };
      } else
        return {
          ...state,
          products: [],
          total: 0,
        };

    case ADD_ITEM:
      let aNewProducts = [...state.products, action.product];
      let aNewTotal = 0;

      aNewProducts.forEach((product) => {
        aNewTotal += product.quantity * product.price;
      });
      return {
        ...state,
        products: aNewProducts,
        total: aNewTotal,
      };

    case REMOVE_ITEM:
      const rNewProducts = state.products.filter(
        (p) => p.id !== action.product.id
      );
      let rNewTotal = 0;
      rNewProducts.forEach((product) => {
        rNewTotal += product.quantity * product.price;
      });
      console.log("reduces remove to cart");

      return {
        ...state,
        products: rNewProducts,
        total: rNewTotal,
      };

    case INCREASE_ITEM:
      // for increse product price
      let seletedproduct = action.product;
      const prodPrice = seletedproduct.price;
      const prodQTY = seletedproduct.quantity + 1;

      let iNewProducts = state.products.map((product, index) => {
        if (action.index === index) {
          return Object.assign({}, product, { quantity: action.quantity>action.product.instock ? action.product.instock : action.quantity  });
        }
        return product;
      });
      let iNewTotal = 0;

      iNewProducts.forEach((product) => {
        iNewTotal += product.quantity * product.price;
      });

      return {
        ...state,
        products: iNewProducts,
        total: iNewTotal,
        productTotal: prodPrice * prodQTY,
      };

    case DECREASE_ITEM:
      let dNewProducts = state.products.map((product, index) => {
        if (action.index === index) {
          return Object.assign({}, product, { quantity: action.quantity });
        }
        return product;
      });
      let dNewTotal = 0;
      dNewProducts.forEach((product) => {
        dNewTotal += product.quantity * product.price;
      });

      return {
        ...state,
        products: dNewProducts,
        total: dNewTotal,
      };

    case CLEAR_CART:
      return {
        products: [],
        total: 0,
      };

    case ADDTOCART:
      // save product to localstorage
      localStorage.setItem("cartItem", JSON.stringify(state.products));

    default:
      return state;
  }
}
