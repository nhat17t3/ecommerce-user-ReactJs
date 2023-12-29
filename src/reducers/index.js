import { combineReducers } from "redux";
import articleReducer from "./article.reducers";
import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";
import categoryArticleReducer from "./categoryArticle.reducers";
import orderReducer from "./order.reducers";
import paymentReducer from "./payment.reducers";
import productReducer from "./product.reducers";
import userReducer from "./user.reducers";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  category: categoryReducer,
  product: productReducer,
  categoryArticle: categoryArticleReducer,
  article: articleReducer,
  order: orderReducer,
  user: userReducer,
  cart: cartReducer
});

export default rootReducer;
