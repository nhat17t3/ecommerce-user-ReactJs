import React from "react";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../HOC/PrivateRoute";
import ArticleDetail from "../pages/ArticleDetail";
import CartPage from "../pages/cart/CartPage";
import { default as ChangePassword, default as Change_Password } from "../pages/Changepassword/Change_Password";
import Checkout from "../pages/checkout/Checkout";
import Contact from "../pages/Contact";
import ListArticle from "../pages/ListArticle";
import Login_Page from "../pages/login/LoginPage";
import Main from "../pages/Main/Main";
import Order_Detail from "../pages/order-detail/Order_Detail";
import Orders from "../pages/order/Orders";
import ProductPage from "../pages/product_detail/ProductPage";
import Profile from "../pages/profile/Profile";
import Shop_Search from "../pages/shop search/ShopPage";
import Shop_Page from "../pages/shop/ShopPage";
import SignupPage from "../pages/signup/SignupPage";
import Thankyou from "../pages/thank-you/Thankyou";
import WhiteList from "../pages/wishlist/Wishlist";





// set alert time and position
const options = {
  timeout: 2000,
  position: positions.TOP_RIGHT,
};

const Routes = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Switch>
        <Route path="/" exact component={Main} />

        <Route exact path="/signin" component={Login_Page} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/shop" component={Shop_Page} />
        <Route exact path="/shop/search" component={Shop_Search} />
        <Route exact path='/product-detail/:productId' component={ProductPage} />
        <Route exact path='/cart-page' component={CartPage} />
        <PrivateRoute exact path='/checkout' component={Checkout} />
        <PrivateRoute exact path='/thankyou' component={Thankyou} />

        <PrivateRoute exact path='/orders' component={Orders} />
        <PrivateRoute exact path='/order-detail' component={Order_Detail} />
        {/* <PrivateRoute exact path='/shipping-address' component={Shipping_Address} /> */}
        <PrivateRoute exact path='/change-password' component={Change_Password} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/Change_Password' component={ChangePassword} />
        <PrivateRoute exact path='/wishlist' component={WhiteList} />

        <Route exact path="/blog" component={ListArticle} />
        <Route exact path='/blog-detail/:blogId' component={ArticleDetail} />

        <Route exact path="/contact" component={Contact} />
      </Switch>
    </Provider>
  );
};

export default Routes;
