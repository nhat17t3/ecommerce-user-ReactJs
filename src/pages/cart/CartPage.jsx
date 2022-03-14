import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseItemQuantity,
  getCart,
  increaseItemQuantity,
  removeItemFromCart
} from "../../actions/cart";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";

const Cart_Page1 = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
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
                <h2 style={{fontSize:300}}>
                  <i className="fas fa-shopping-cart" />
                </h2>
                <h1>Giỏ hàng của bạn đang trống</h1>
                <p>
                  <Link to="/shop" className="btn btn-secondary" >Tiếp tục mua sắm </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (

        <section className="padding-y bg-light">
          <div className="container">
            {/* =================== COMPONENT CART+SUMMARY ====================== */}
            <div className="row">
              <div className="col-md-9">
                {products !== undefined && products !== null
                  ? products.map((item, index) => (
                      <article className="card card-body mb-3">
                        <div className="row gy-3 align-items-center">
                          <div className="col-md-6">
                            <a href="#" className="itemside align-items-center">
                              <div className="aside">
                                <img
                                  src={item.image}
                                  height={72}
                                  width={72}
                                  className="img-thumbnail img-sm"
                                />
                              </div>
                              <div className="info">
                                <p className="title">{item.name}</p>
                                <span className="text-muted">{item.category.name}</span>
                              </div>
                            </a>
                          </div>
                          {/* col.// */}
                          <div className="col-auto">
                            <div className="input-group input-spinner">
                            {item.quantity > 1 ? (
                              <button
                                className="btn btn-light"
                                type="button"
                                onClick={() =>
                                  decreaseQty(index, item, item.quantity - 1)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="#999"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 13H5v-2h14v2z" />
                                </svg>
                              </button>
                              ) : null}
                              <input
                                type="text"
                                id="quantity1"
                                name="quantity"
                                className="form-control"
                                //defaultValue={2}
                                value={item.quantity}
                                disabled
                              />
                              <button
                                className="btn btn-light"
                                type="button"
                                onClick={() =>
                                  increaseQty(index, item, item.quantity + 1)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="#999"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </svg>
                              </button>
                            </div>
                            {/* input-group.// */}
                          </div>
                          {/* col.// */}
                          <div className="col">
                            <strong className="price">
                              {(item.quantity * item.promotionPrice).toFixed(2)}
                            </strong>
                          </div>
                          <div className="col text-end">
                            <button href="#" className="btn btn-icon btn-light" onClick={() => confirmDelete(index, item)}>
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                        {/* row.// */}
                      </article>
                    ))
                  : null}
                {/* card .// */}
              </div>
              <aside className="col-lg-3">
                {/* <div className="card mb-3">
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label className="form-label">Have coupon?</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            name
                            placeholder="Coupon code"
                          />
                          <button className="btn btn-light">Apply</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}

                <div className="card">
                  <div className="card-body">
                    {/* <dl className="dlist-align">
                      <dt>Tổng tiền hàng:</dt>
                      <dd className="text-end"> $329.00</dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt>Giảm giá:</dt>
                      <dd className="text-end text-success"> - $60.00 </dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt>TAX:</dt>
                      <dd className="text-end"> $14.00 </dd>
                    </dl>
                    <hr /> */}
                    <dl className="dlist-align">
                      <dt>Tổng tiền hàng:</dt>
                      <dd className="text-end text-dark h5"> {total} VNĐ </dd>
                    </dl>
                    <div className="d-grid gap-2 my-3">
                      <Link to="/checkout" className="btn btn-success w-100">
                        Mua hàng
                      </Link>
                      <Link to="/shop" className="btn btn-light w-100">
                        Trở về shop
                      </Link>
                    </div>
                  </div>
                  {/* card-body.// */}
                </div>
                {/* card.// */}
              </aside>
              {/* col.// */}
            </div>
            {/* row.// */}
            {/* =================== COMPONENT 1 CART+SUMMARY .//END  ====================== */}
            <br />
            <br />
          </div>
          {/* container .//  */}
        </section>

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
})(Cart_Page1);
