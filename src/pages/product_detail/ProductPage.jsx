import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getListCategory, getProductById } from "../../actions";
import {
  addItemToCart,
  addToCart,
  getCart,
  getCartByServer,
  increaseItemQuantity,
} from "../../actions/cart";
import Layout from "../../layouts/Layout";

const Product_Page = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartByServer());
  }, []);

  useEffect(() => {
    dispatch(getListCategory());
  }, []);
  const listCategory = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    dispatch(getProductById(Number(productId)));
  }, []);

  const findItem = useSelector((state) => state.product.product);
  var maniImagePath = findItem?.images?.length
    ? findItem.images[0].imagePath
    : null;
  var detailImagePath = findItem?.images?.filter(function (word) {
    return word.isPrimary != true;
  });
  console.log(detailImagePath);

  // get all product from redux store
  // const products = useSelector((state) => state.cart.Detail_Products);
  // console.log("detailed products is", products);
  // get cart product from the store
  const cartProducts = useSelector((state) => state.cart.products);

  const [amount, setAmount] = useState(1);

  // add to cart function
  const addProductToCart = (item) => {
    // const product = Object.assign({}, item, { quantity: products.quantity });
    let product = item;
    let itemQty = product.quantity;
    let productExists = false;
    let productIndex = -1;
    console.log("itemQty is", itemQty);
    cartProducts.forEach((p, idx) => {
      if (product.id === p.id) {
        productExists = true;
        productIndex = idx;
        product = p;
      }
    });
    if (productExists) {
      if (itemQty === undefined) {
        itemQty = 1;
      } else {
        itemQty = product.quantity;
      }
      toast.success("Sản phẩm đã có trong giỏ hàng");
      dispatch(
        increaseItemQuantity(productIndex, product, product.quantity + amount)
      );
    } else {
      dispatch(addItemToCart(Object.assign({}, product, { quantity: amount })));
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    }
    // to add the product in localstorage
    dispatch(addToCart());
  };

  const increaseQty = () => {
    setAmount(amount + 1);
  };

  const decreaseQty = () => {
    setAmount(amount - 1);
  };

  return (
    <>
      <Layout>
        <main className="main">
          <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
            <div className="container d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Products</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Default
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="container">
              <div className="product-details-top">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-gallery product-gallery-vertical">
                      <div className="row">
                        <figure className="product-main-image">
                          <img
                            id="product-zoom"
                            src={maniImagePath}
                            data-zoom-image={maniImagePath}
                            alt="product image"
                          />
                        </figure>
                        {/* End .product-main-image */}
                        <div
                          id="product-zoom-gallery"
                          className="product-image-gallery"
                        >
                          {detailImagePath?.map((element) => {
                            return (
                              <a
                                className="product-gallery-item active"
                                href="#"
                                data-image={element.imagePath}
                                data-zoom-image={element.imagePath}
                              >
                                <img
                                  src={element.imagePath}
                                  alt="product side"
                                />
                              </a>
                            );
                          })}
                        </div>
                        {/* End .product-image-gallery */}
                      </div>
                      {/* End .row */}
                    </div>
                    {/* End .product-gallery */}
                  </div>
                  {/* End .col-md-6 */}
                  <div className="col-md-6">
                    <div className="product-details">
                      <h1 className="product-title">{findItem.name}</h1>
                      {/* End .product-title */}
                      <div className="ratings-container">
                        <div className="ratings">
                          <div
                            className="ratings-val"
                            style={{ width: "0%" }}
                          />
                          {/* End .ratings-val */}
                        </div>
                        {/* End .ratings */}
                        <a
                          className="ratings-text"
                          href="#product-review-link"
                          id="review-link"
                        >
                          ( 0 Reviews )
                        </a>
                      </div>
                      {/* End .rating-container */}
                      <div className="product-price">{findItem.price} VNĐ</div>
                      {/* End .product-price */}
                      <div className="product-content">
                        <p>{findItem.shortDescription}</p>
                      </div>
                      {/* End .product-content */}
                      <div className="details-filter-row details-row-size">
                        <label htmlFor="qty">Qty:</label>
                        <div className="product-details-quantity">
                          <div className="input-group  input-spinner">
                            {amount > 1 ? (
                              <div className="input-group-prepend">
                                <button
                                  style={{ minWidth: 26 }}
                                  className="btn btn-decrement btn-spinner"
                                  type="button"
                                  onClick={() => decreaseQty()}
                                >
                                  <i className="icon-minus" />
                                </button>
                              </div>
                            ) : null}
                            <input
                              min={1}
                              max={10}
                              step={1}
                              data-decimals={0}
                              type="text"
                              style={{ textAlign: "center" }}
                              className="form-control "
                              required=""
                              placeholder=""
                              name="amount"
                              value={amount}
                              disabled
                            />
                            <div className="input-group-append">
                              <button
                                style={{ minWidth: 26 }}
                                className="btn btn-increment btn-spinner"
                                type="button"
                                onClick={() => increaseQty()}
                              >
                                <i className="icon-plus" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* End .product-details-quantity */}
                      </div>
                      {/* End .details-filter-row */}
                      <div className="product-details-action">
                        <button
                          href="#"
                          className="btn-product btn-cart"
                          onClick={() => addProductToCart(findItem)}
                        >
                          <span>add to cart</span>
                        </button>
                      </div>
                      {/* End .product-details-action */}
                      <div className="product-details-footer">
                        <div className="product-cat">
                          <span>Category:</span>
                          <a href="#">Women</a>,<a href="#">Dresses</a>,
                          <a href="#">Yellow</a>
                        </div>
                        {/* End .product-cat */}
                        <div className="social-icons social-icons-sm">
                          <span className="social-label">Share:</span>
                          <a
                            href="#"
                            className="social-icon"
                            title="Facebook"
                            target="_blank"
                          >
                            <i className="icon-facebook-f" />
                          </a>
                          <a
                            href="#"
                            className="social-icon"
                            title="Twitter"
                            target="_blank"
                          >
                            <i className="icon-twitter" />
                          </a>
                          <a
                            href="#"
                            className="social-icon"
                            title="Instagram"
                            target="_blank"
                          >
                            <i className="icon-instagram" />
                          </a>
                          <a
                            href="#"
                            className="social-icon"
                            title="Pinterest"
                            target="_blank"
                          >
                            <i className="icon-pinterest" />
                          </a>
                        </div>
                      </div>
                      {/* End .product-details-footer */}
                    </div>
                    {/* End .product-details */}
                  </div>
                  {/* End .col-md-6 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .product-details-top */}
              <div className="product-details-tab">
                <ul
                  className="nav nav-pills justify-content-center"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="product-desc-link"
                      data-toggle="tab"
                      href="#product-desc-tab"
                      role="tab"
                      aria-controls="product-desc-tab"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="product-info-link"
                      data-toggle="tab"
                      href="#product-info-tab"
                      role="tab"
                      aria-controls="product-info-tab"
                      aria-selected="false"
                    >
                      Additional information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="product-shipping-link"
                      data-toggle="tab"
                      href="#product-shipping-tab"
                      role="tab"
                      aria-controls="product-shipping-tab"
                      aria-selected="false"
                    >
                      Shipping &amp; Returns
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="product-review-link"
                      data-toggle="tab"
                      href="#product-review-tab"
                      role="tab"
                      aria-controls="product-review-tab"
                      aria-selected="false"
                    >
                      Reviews (2)
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="product-desc-tab"
                    role="tabpanel"
                    aria-labelledby="product-desc-link"
                  >
                    <div className="product-desc-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: findItem.description,
                        }}
                      />
                    </div>
                    {/* End .product-desc-content */}
                  </div>
                  {/* .End .tab-pane */}
                  <div
                    className="tab-pane fade"
                    id="product-info-tab"
                    role="tabpanel"
                    aria-labelledby="product-info-link"
                  >
                    <div className="product-desc-content">
                      <h3>Information</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros. Nullam
                        malesuada erat ut turpis. Suspendisse urna viverra non,
                        semper suscipit, posuere a, pede. Donec nec justo eget
                        felis facilisis fermentum. Aliquam porttitor mauris sit
                        amet orci.{" "}
                      </p>
                      <h3>Fabric &amp; care</h3>
                      <ul>
                        <li>Faux suede fabric</li>
                        <li>Gold tone metal hoop handles.</li>
                        <li>RI branding</li>
                        <li>Snake print trim interior </li>
                        <li>Adjustable cross body strap</li>
                        <li>
                          {" "}
                          Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop:
                          61cm
                        </li>
                      </ul>
                      <h3>Size</h3>
                      <p>one size</p>
                    </div>
                    {/* End .product-desc-content */}
                  </div>
                  {/* .End .tab-pane */}
                  <div
                    className="tab-pane fade"
                    id="product-shipping-tab"
                    role="tabpanel"
                    aria-labelledby="product-shipping-link"
                  >
                    <div className="product-desc-content">
                      <h3>Delivery &amp; returns</h3>
                      <p>
                        We deliver to over 100 countries around the world. For
                        full details of the delivery options we offer, please
                        view our <a href="#">Delivery information</a>
                        <br />
                        We hope you’ll love every purchase, but if you ever need
                        to return an item you can do so within a month of
                        receipt. For full details of how to make a return,
                        please view our <a href="#">Returns information</a>
                      </p>
                    </div>
                    {/* End .product-desc-content */}
                  </div>
                  {/* .End .tab-pane */}
                  <div
                    className="tab-pane fade"
                    id="product-review-tab"
                    role="tabpanel"
                    aria-labelledby="product-review-link"
                  >
                    <div className="reviews">
                      <h3>Reviews (2)</h3>
                      <div className="review">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <h4>
                              <a href="#">Samanta J.</a>
                            </h4>
                            <div className="ratings-container">
                              <div className="ratings">
                                <div
                                  className="ratings-val"
                                  style={{ width: "80%" }}
                                />
                                {/* End .ratings-val */}
                              </div>
                              {/* End .ratings */}
                            </div>
                            {/* End .rating-container */}
                            <span className="review-date">6 days ago</span>
                          </div>
                          {/* End .col */}
                          <div className="col">
                            <h4>Good, perfect size</h4>
                            <div className="review-content">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ducimus cum dolores assumenda
                                asperiores facilis porro reprehenderit animi
                                culpa atque blanditiis commodi perspiciatis
                                doloremque, possimus, explicabo, autem fugit
                                beatae quae voluptas!
                              </p>
                            </div>
                            {/* End .review-content */}
                            <div className="review-action">
                              <a href="#">
                                <i className="icon-thumbs-up" />
                                Helpful (2)
                              </a>
                              <a href="#">
                                <i className="icon-thumbs-down" />
                                Unhelpful (0)
                              </a>
                            </div>
                            {/* End .review-action */}
                          </div>
                          {/* End .col-auto */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .review */}
                      <div className="review">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <h4>
                              <a href="#">John Doe</a>
                            </h4>
                            <div className="ratings-container">
                              <div className="ratings">
                                <div
                                  className="ratings-val"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings-val */}
                              </div>
                              {/* End .ratings */}
                            </div>
                            {/* End .rating-container */}
                            <span className="review-date">5 days ago</span>
                          </div>
                          {/* End .col */}
                          <div className="col">
                            <h4>Very good</h4>
                            <div className="review-content">
                              <p>
                                Sed, molestias, tempore? Ex dolor esse iure hic
                                veniam laborum blanditiis laudantium iste amet.
                                Cum non voluptate eos enim, ab cumque nam, modi,
                                quas iure illum repellendus, blanditiis
                                perspiciatis beatae!
                              </p>
                            </div>
                            {/* End .review-content */}
                            <div className="review-action">
                              <a href="#">
                                <i className="icon-thumbs-up" />
                                Helpful (0)
                              </a>
                              <a href="#">
                                <i className="icon-thumbs-down" />
                                Unhelpful (0)
                              </a>
                            </div>
                            {/* End .review-action */}
                          </div>
                          {/* End .col-auto */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .review */}
                    </div>
                    {/* End .reviews */}
                  </div>
                  {/* .End .tab-pane */}
                </div>
                {/* End .tab-content */}
              </div>
              {/* End .product-details-tab */}
              <h2 className="title text-center mb-4">You May Also Like</h2>
              {/* End .title text-center */}
              <div
                className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow owl-loaded owl-drag"
                data-toggle="owl"
                data-owl-options='{
                      "nav": false, 
                      "dots": true,
                      "margin": 20,
                      "loop": false,
                      "responsive": {
                          "0": {
                              "items":1
                          },
                          "480": {
                              "items":2
                          },
                          "768": {
                              "items":3
                          },
                          "992": {
                              "items":4
                          },
                          "1200": {
                              "items":4,
                              "nav": true,
                              "dots": false
                          }
                      }
                  }'
              >
                {/* End .product */}
                {/* End .product */}
                {/* End .product */}
                {/* End .product */}
                {/* End .product */}
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(-297px, 0px, 0px)",
                      transition: "all 0.4s ease 0s",
                      width: 1485,
                    }}
                  >
                    <div
                      className="owl-item"
                      style={{ width: 277, marginRight: 20 }}
                    >
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          <span className="product-label label-new">New</span>
                          <a href="product.html">
                            <img
                              src="assets/images/products/product-4.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist btn-expandable"
                            >
                              <span>add to wishlist</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product-icon btn-quickview"
                              title="Quick view"
                            >
                              <span>Quick view</span>
                            </a>
                            <a
                              href="#"
                              className="btn-product-icon btn-compare"
                              title="Compare"
                            >
                              <span>Compare</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Women</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Brown paperbag waist <br />
                              pencil skirt
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$60.00</div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "20%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 2 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                          <div className="product-nav product-nav-thumbs">
                            <a href="#" className="active">
                              <img
                                src="assets/images/products/product-4-thumb.jpg"
                                alt="product desc"
                              />
                            </a>
                            <a href="#">
                              <img
                                src="assets/images/products/product-4-2-thumb.jpg"
                                alt="product desc"
                              />
                            </a>
                            <a href="#">
                              <img
                                src="assets/images/products/product-4-3-thumb.jpg"
                                alt="product desc"
                              />
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: 277, marginRight: 20 }}
                    >
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          <span className="product-label label-out">
                            Out of Stock
                          </span>
                          <a href="product.html">
                            <img
                              src="assets/images/products/product-6.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist btn-expandable"
                            >
                              <span>add to wishlist</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product-icon btn-quickview"
                              title="Quick view"
                            >
                              <span>Quick view</span>
                            </a>
                            <a
                              href="#"
                              className="btn-product-icon btn-compare"
                              title="Compare"
                            >
                              <span>Compare</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Jackets</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Khaki utility boiler jumpsuit
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">
                            <span className="out-price">$120.00</span>
                          </div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "80%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 6 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                        </div>
                        {/* End .product-body */}
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: 277, marginRight: 20 }}
                    >
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          <span className="product-label label-top">Top</span>
                          <a href="product.html">
                            <img
                              src="assets/images/products/product-11.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist btn-expandable"
                            >
                              <span>add to wishlist</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product-icon btn-quickview"
                              title="Quick view"
                            >
                              <span>Quick view</span>
                            </a>
                            <a
                              href="#"
                              className="btn-product-icon btn-compare"
                              title="Compare"
                            >
                              <span>Compare</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Shoes</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Light brown studded Wide fit wedges
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$110.00</div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "80%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 1 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                          <div className="product-nav product-nav-thumbs">
                            <a href="#" className="active">
                              <img
                                src="assets/images/products/product-11-thumb.jpg"
                                alt="product desc"
                              />
                            </a>
                            <a href="#">
                              <img
                                src="assets/images/products/product-11-2-thumb.jpg"
                                alt="product desc"
                              />
                            </a>
                            <a href="#">
                              <img
                                src="assets/images/products/product-11-3-thumb.jpg"
                                alt="product desc"
                              />
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: 277, marginRight: 20 }}
                    >
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/products/product-10.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist btn-expandable"
                            >
                              <span>add to wishlist</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product-icon btn-quickview"
                              title="Quick view"
                            >
                              <span>Quick view</span>
                            </a>
                            <a
                              href="#"
                              className="btn-product-icon btn-compare"
                              title="Compare"
                            >
                              <span>Compare</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Jumpers</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Yellow button front tea top
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$56.00</div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "0%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 0 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                        </div>
                        {/* End .product-body */}
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: 277, marginRight: 20 }}
                    >
                      <div className="product product-7 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/products/product-7.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist btn-expandable"
                            >
                              <span>add to wishlist</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product-icon btn-quickview"
                              title="Quick view"
                            >
                              <span>Quick view</span>
                            </a>
                            <a
                              href="#"
                              className="btn-product-icon btn-compare"
                              title="Compare"
                            >
                              <span>Compare</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Jeans</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Blue utility pinafore denim dress
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$76.00</div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "20%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 2 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                        </div>
                        {/* End .product-body */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="owl-nav">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <i className="icon-angle-left" />
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next disabled"
                  >
                    <i className="icon-angle-right" />
                  </button>
                </div>
                <div className="owl-dots disabled" />
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* End .container */}
          </div>
          {/* End .page-content */}
        </main>
      </Layout>
    </>
  );
};

export default Product_Page;
