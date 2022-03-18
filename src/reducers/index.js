import { combineReducers } from "redux";
import cart from "./cart";

import authReducer from "./auth.reducers";
import paymentReducer from "./payment.reducers";
import brandReducer from "./brand.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import slideReducer from "./slice.reducers";
import feedbackReducer from "./feedback.reducers";
import transporterReducer from "./transporter.reducers";
import voucherReducer from "./voucher.reducers";
import categoryArticleReducer from "./categoryArticle.reducers";
import articleReducer from "./article.reducers";
import ratingReducer from "./rating.reducers";
import favouriteReducer from "./favourite.reducers";
import orderReducer from "./order.reducers";
import userReducer from "./user.reducers";
import transportReducer from "./transport.reducers";
export default combineReducers({
  cart,
  auth: authReducer,
  payment: paymentReducer,
  brand: brandReducer,
  category: categoryReducer,
  product: productReducer,
  slide: slideReducer,
  feedback: feedbackReducer,
  transporter: transporterReducer,
  voucher: voucherReducer,
  categoryArticle: categoryArticleReducer,
  article: articleReducer,
  rating: ratingReducer,
  favourite: favouriteReducer,
  order1: orderReducer,
  user: userReducer,
  transport: transportReducer,
});
