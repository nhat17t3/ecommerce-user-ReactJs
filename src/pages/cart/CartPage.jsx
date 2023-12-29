import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseItemQuantity,
  getCart,
  getCartByServer,
  increaseItemQuantity,
  removeItemFromCart,
} from "../../actions/cart";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";

const Cart_Page = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartByServer());
  }, []);

  // const cartItem = JSON.parse(localStorage.getItem('cartItem'));
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);

  // for show alert
  const alert = useAlert();

  //check length of cart
  const length = products.length;

  // get value from localStorage
  const cartItem = JSON.parse(localStorage.getItem("cartItem"));

  // console.log('all product of localstrage is', products);
  const [formData, setFormData] = useState({
    quantity: 0,
    products: cartItem,
    cart: [],
    //total: 0,
    subTotal: 0,
  });
  //const { products } = formData;

  const confirmDelete = (index, item) => {
    props.removeItemFromCart(index, item);
    props.addToCart();
    alert.error("Delected successfully!");
  };

  const increaseQty = (index, product, quantity) => {
    props.increaseItemQuantity(index, product, quantity);
    props.addToCart();
  };

  const decreaseQty = (index, product, quantity) => {
    props.decreaseItemQuantity(index, product, quantity);
    props.addToCart();
  };

  return (
    <Fragment>
      <MainHeader />

      {length === 0 || length === undefined || length === null ? (
        <div className="container">
          <div className="row text-center">
            <div className="col-12 empty-content">
              <div className="pro-empty-page">
                <h2 style={{ fontSize: 300 }}>
                  <i className="fas fa-shopping-cart" />
                </h2>
                <h1>Giỏ hàng của bạn đang trống</h1>
                <p>
                  <Link to="/shop" className="btn btn-secondary">
                    Tiếp tục mua sắm{" "}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: 'url("assets/images/page-header-bg.jpg")',
            }}
          >
            <div className="container">
              <h1 className="page-title">
                Shopping Cart<span>Shop</span>
              </h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shopping Cart
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="cart">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <table className="table table-cart table-mobile">
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Tổng tiền</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {products !== undefined && products !== null
                          ? products.map((item, index) => (
                              <tr>
                                <td className="product-col">
                                  <div className="product">
                                    <figure className="product-media">
                                      <a href="#">
                                        <img
                                          src={item.images[0]?.imagePath}
                                          alt="Product image"
                                        />
                                      </a>
                                    </figure>
                                    <h3 className="product-title">
                                      <a href="#"> src={item.name}</a>
                                    </h3>
                                    {/* End .product-title */}
                                  </div>
                                  {/* End .product */}
                                </td>
                                <td className="price-col">{item.price}</td>
                                <td className="quantity-col">
                                  <div className="cart-product-quantity">
                                    <div className="input-group  input-spinner">
                                      {item.quantity > 1 ? (
                                        <div className="input-group-prepend">
                                          <button
                                            style={{ minWidth: 26 }}
                                            className="btn btn-decrement btn-spinner"
                                            type="button"
                                            onClick={() =>
                                              decreaseQty(
                                                index,
                                                item,
                                                item.quantity - 1
                                              )
                                            }
                                          >
                                            <i className="icon-minus" />
                                          </button>
                                        </div>
                                      ) : null}
                                      <input
                                        type="text"
                                        style={{ textAlign: "center" }}
                                        className="form-control "
                                        required=""
                                        placeholder=""
                                        value={item.quantity}
                                        disabled
                                      />
                                      <div className="input-group-append">
                                        <button
                                          style={{ minWidth: 26 }}
                                          className="btn btn-increment btn-spinner"
                                          type="button"
                                          onClick={() =>
                                            increaseQty(
                                              index,
                                              item,
                                              item.quantity + 1
                                            )
                                          }
                                        >
                                          <i className="icon-plus" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  {/* End .cart-product-quantity */}
                                </td>
                                <td className="total-col">
                                  {item.quantity * item.price}
                                </td>
                                <td className="remove-col">
                                  <button
                                    className="btn-remove"
                                    onClick={() => confirmDelete(index, item)}
                                  >
                                    <i className="icon-close" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                    {/* End .table table-wishlist */}
                    <div className="cart-bottom">
                      <div className="cart-discount">
                        <form action="#">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              required=""
                              placeholder="coupon code"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-primary-2"
                                type="submit"
                              >
                                <i className="icon-long-arrow-right" />
                              </button>
                            </div>
                            {/* .End .input-group-append */}
                          </div>
                          {/* End .input-group */}
                        </form>
                      </div>
                      {/* End .cart-discount */}
                      <a href="#" className="btn btn-outline-dark-2">
                        <span>UPDATE CART</span>
                        <i className="icon-refresh" />
                      </a>
                    </div>
                    {/* End .cart-bottom */}
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary summary-cart">
                      <h3 className="summary-title">Cart Total</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>{total} VNĐ</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="free-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="free-shipping"
                                >
                                  Free Shipping
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>$0.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="standart-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="standart-shipping"
                                >
                                  Standart:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>$10.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="express-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="express-shipping"
                                >
                                  Express:
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>$20.00</td>
                          </tr>
                          {/* End .summary-shipping-row */}
                          <tr className="summary-shipping-estimate">
                            <td>
                              Estimate for Your Country
                              <br /> <a href="dashboard.html">Change address</a>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          {/* End .summary-shipping-estimate */}
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>{total} VNĐ</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <Link
                        to="checkout"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        PROCEED TO CHECKOUT
                      </Link>
                    </div>
                    {/* End .summary */}
                    <Link
                      to="/shop"
                      className="btn btn-outline-dark-2 btn-block mb-3"
                    >
                      <span>CONTINUE SHOPPING</span>
                      <i className="icon-refresh" />
                    </Link>
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </div>
            {/* End .cart */}
          </div>
          {/* End .page-content */}
        </main>
      )}

      <MainFooter />
    </Fragment>
  );
};

export default connect(null, {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
  addToCart,
})(Cart_Page);
