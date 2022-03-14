import React from "react";
// import Not_Found from "../pages/other-pages/404";
// import AboutPage1 from '../pages/about/about-one/About_Page1';
// import AboutPage2 from '../pages/about/about-two/About_Page2';
// import BlogPage1 from '../pages/blog/blog-one/Blog_Page1';
// import BlogPage2 from '../pages/blog/blog-two/Blog_page2';
// import WhiteList from '../pages/product/wishlist/Wishlist';
// import CartPage1 from '../pages/cart/cart-one/Cart_Page1';
// import CartPage2 from '../pages/cart/cart-two/Cart_Page2';
// import Checkout from '../pages/order/checkout/Checkout';
// import Home_2 from '../pages/home/home-two/index-2';
// import Home_3 from '../pages/home/home-three/index-3';
// import ProductPage1 from '../pages/product/product-one/Product_Page1';
// import ProductPage2 from '../pages/product/product-two/Product_Page2';
// import ProductPage3 from '../pages/product/product-three/Product_Page3';
// import ProductPage4 from '../pages/product/product-four/Product_Page4';
// import ProductPage5 from '../pages/product/product-five/Product_Page5';
// // import ProductPage6 from '../components/product-page/Product_Page6';
// import Compare from '../pages/order/compare/Compare';
// import ShopPage1 from '../pages/shop/shop-one/Shop_Page1';
// import ShopPage2 from '../pages/shop/shop-two/Shop_Page2';
// import ShopPage3 from '../pages/shop/shop-three/Shop_Page3';
// import ShopPage4 from '../pages/shop/shop-four/Shop_Page4';
// import ShopPage5 from '../pages/shop/shop-five/Shop_Page5';
// import ContactPage1 from '../pages/contact/contact-one/Contact_Page1';
// import ContactPage2 from '../pages/contact/contact-two/Contact_Page2';
// import SignUp from '../pages/signup/signup-one/Signup';
// import LoginPage1 from '../pages/login/login-one/Login_Page1';
// import LoginPage2 from '../pages/login/login-two/Login_Page2';
// import Privacy from '../pages/other-pages/Privacy';
// import Orders from '../pages/order/order/Orders';
// import Refund from '../pages/other-pages/Refund';
// import Term from '../pages/other-pages/Term';
// import ShippingAddress from '../pages/order/shipping-address/Shipping_Address';
// import ChangePassword from '../pages/user/Changepassword/Change_Password';
// import Profile from '../pages/user/profile/Profile';
// //import Forgot_Password from '../components/user-page/Change_Password';
// import Thankyou from '../pages/order/thank-you/Thankyou';
// import Landing from '../pages/home/home-one/index';
// import Order_Detail from '../pages/order/order-detail/Order_Detail';
// import Blog_Single_Post from '../pages/blog/blog-single-post/Blog_Single_Post';
// import New_arrival from '../components/email-templates/New_Arrival';
// import Amazing_Deal from '../components/email-templates/Amazing_Deals';
// import Forgot_password from '../components/email-templates/Forgot_Password';
// import Signup from '../components/email-templates/Signup';
// import Winter_sale from '../components/email-templates/Winter_Sale';
// import Overall_sale from '../components/email-templates/Overall_Sale';
// import PrivateRoute from './PrivateRoute';
// for show alert
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../HOC/PrivateRoute";
import CartPage from "../pages/cart/CartPage";
import Change_Password from "../pages/Changepassword/Change_Password";
import Checkout from "../pages/checkout/Checkout";
import Login_Page from "../pages/login/LoginPage";
import Main from "../pages/Main/Main";
import Order_Detail from "../pages/order-detail/Order_Detail";
import Orders from "../pages/order/Orders";
import ProductPage from "../pages/product_detail/ProductPage";
import Profile from "../pages/profile/Profile";
import Shipping_Address from "../pages/shipping-address/Shipping_Address";
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
        <PrivateRoute path="/" exact component={Main} />

        <Route exact path="/signin" component={Login_Page} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/shop" component={Shop_Page} />
        <Route exact path='/product-detail/:productId' component={ProductPage} />
        <Route exact path='/cart-page' component={CartPage} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/thankyou' component={Thankyou} />

        <Route exact path='/orders' component={Orders} />
        <Route exact path='/order-detail' component={Order_Detail} />
        <Route exact path='/shipping-address' component={Shipping_Address} />
        <Route exact path='/change-password' component={Change_Password} />
        <Route exact path='/profile' component={Profile} />
        {/* <Route exact path='/forgot-password' component={ChangePassword} /> */}
        <Route exact path='/wishlist' component={WhiteList} />



        {/* <Route exact path="/" component={Landing} /> */}
        {/* <Route exact path='/404' component={Not_Found} />
        <Route exact path='/thankyou' component={Thankyou} />
        <Route exact path='/about-page1' component={AboutPage1} />
        <Route exact path='/about-page2' component={AboutPage2} />
        <Route exact path='/blog-page1' component={BlogPage1} />
        <Route exact path='/blog-page2' component={BlogPage2} />
        <Route exact path='/blog-single-post' component={Blog_Single_Post} />
        <Route exact path='/wishlist' component={WhiteList} />
        <Route exact path='/cart-page1' component={CartPage1} />
        <Route exact path='/cart-page2' component={CartPage2} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/index-2' component={Home_2} />
        <Route exact path='/index-3' component={Home_3} />
        <Route exact path='/order-detail' component={Order_Detail} />

        <Route exact path='/product-page1/:productId' component={ProductPage1} />
        <Route exact path='/product-page2' component={ProductPage2} />
        <Route exact path='/product-page3/:productId' component={ProductPage3} />
        <Route exact path='/product-page4' component={ProductPage4} />
        <Route exact path='/product-page5' component={ProductPage5} />
        <Route exact path='/compare' component={Compare} />
        <Route exact path='/shop-page1' component={ShopPage1} />
        <Route exact path='/shop-page2' component={ShopPage2} />
        <Route exact path='/shop-page3' component={ShopPage3} />
        <Route exact path='/shop-page4' component={ShopPage4} />
        <Route exact path='/shop-page5' component={ShopPage5} />
        <Route exact path='/contact-page1' component={ContactPage1} />
        <Route exact path='/contact-page2' component={ContactPage2} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login-page1' component={LoginPage1} />
        <Route exact path='/login-page2' component={LoginPage2} />
        <Route exact path='/privacy' component={Privacy} />
        <Route exact path='/refund' component={Refund} />
        <Route exact path='/term' component={Term} />
        <Route exact path='/orders' component={Orders} />
        <Route exact path='/shipping-address' component={ShippingAddress} />
        <Route exact path='/change-password' component={ChangePassword} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/forgot-password' component={ChangePassword} />
        <Route exact path='/thankyou' component={Thankyou} /> */}

        {/* <Route exact path='/email-templates/amazing-deals' component={Amazing_Deal} />
        <Route exact path='/email-templates/new-arrival' component={New_arrival} />
        <Route exact path='/email-templates/overall-sale' component={Overall_sale} />
        <Route exact path='/email-templates/winter-sale' component={Winter_sale} />
        <Route exact path='/email-templates/signup' component={Signup} />
        <Route exact path='/email-templates/forgot-password' component={Forgot_password} /> */}
      </Switch>
    </Provider>
  );
};

export default Routes;
