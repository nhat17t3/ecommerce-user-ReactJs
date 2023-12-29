import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getListArticleByPage, getListProductByPage } from "../../actions";
import {
  addItemToCart,
  addToCart,
  getCart,
  getCartByServer,
  increaseItemQuantity,
} from "../../actions/cart";
import Layout from "../../layouts/Layout";

export default function Main() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartByServer());
  }, []);
  // get all product on cart from redux store
  const productsOnCart = useSelector((state) => state.cart.products);
  // add to cart function
  const addProductToCart = (item) => {
    let product = item;
    let itemQty = product.quantity;
    let productExists = false;
    let productIndex = -1;
    productsOnCart.forEach((p, idx) => {
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
        increaseItemQuantity(productIndex, product, (itemQty = itemQty + 1))
      );
    } else {
      dispatch(addItemToCart(Object.assign({}, product, { quantity: 1 })));
      toast.success("Thêm vào giỏ hàng thành công");
    }
    // to add the product in localstorage
    dispatch(addToCart());
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("pageNumber", 1 - 1);
    formData.append("pageSize", 10);
    dispatch(getListProductByPage(formData));
  }, []);
  const listProduct = useSelector((state) => state.product.listProduct);

  useEffect(() => {
    const formData = new FormData();
    formData.append("pageNumber", 1 - 1);
    formData.append("pageSize", 10);
    console.log("formData111", formData);
    dispatch(getListArticleByPage(formData));
  }, []);
  const articles = useSelector((state) => state.article.listArticle);

  // const listNew = listProduct
  //   .filter((item) => item.isActive == true)
  //   .slice(0, 4);
  // const listHot = listProduct
  //   .filter((item) => item.isHot == true && item.isActive == true)
  //   .slice(0, 4);

  return (
    <>
      <Layout>
        <main className="main">
          <div className="intro-section bg-lighter pt-5 pb-6">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="intro-slider-container slider-container-ratio slider-container-1 mb-2 mb-lg-0">
                    <div
                      className="intro-slider intro-slider-1 owl-carousel owl-simple owl-light owl-nav-inside owl-loaded owl-drag"
                      data-toggle="owl"
                      data-owl-options='{
                                  "nav": false, 
                                  "responsive": {
                                      "768": {
                                          "nav": true
                                      }
                                  }
                              }'
                    >
                      {/* End .intro-slide */}
                      {/* End .intro-slide */}
                      {/* End .intro-slide */}
                      <div className="owl-stage-outer">
                        <div
                          className="owl-stage"
                          style={{
                            transform: "translate3d(-1544px, 0px, 0px)",
                            transition: "all 0s ease 0s",
                            width: 5404,
                          }}
                        >
                          <div
                            className="owl-item cloned"
                            style={{ width: 772 }}
                          >
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-2-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-2.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  News and Inspiration
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">New Arrivals</h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
                            </div>
                          </div>
                          <div
                            className="owl-item cloned"
                            style={{ width: 772 }}
                          >
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-3-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-3.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  Outdoor Furniture
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">
                                  Outdoor Dining <br />
                                  Furniture
                                </h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
                            </div>
                          </div>
                          <div
                            className="owl-item active"
                            style={{ width: 772 }}
                          >
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-1-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-1.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  Topsale Collection
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">
                                  Living Room
                                  <br />
                                  Furniture
                                </h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
                            </div>
                          </div>
                          <div className="owl-item" style={{ width: 772 }}>
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-2-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-2.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  News and Inspiration
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">New Arrivals</h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
                            </div>
                          </div>
                          <div className="owl-item" style={{ width: 772 }}>
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-3-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-3.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  Outdoor Furniture
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">
                                  Outdoor Dining <br />
                                  Furniture
                                </h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
                            </div>
                          </div>
                          <div
                            className="owl-item cloned"
                            style={{ width: 772 }}
                          >
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-1-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-1.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  Topsale Collection
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">
                                  Living Room
                                  <br />
                                  Furniture
                                </h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
                            </div>
                          </div>
                          <div
                            className="owl-item cloned"
                            style={{ width: 772 }}
                          >
                            <div className="intro-slide">
                              <figure className="slide-image">
                                <picture>
                                  <source
                                    media="(max-width: 480px)"
                                    srcSet="assets/images/slider/slide-2-480w.jpg"
                                  />
                                  <img
                                    src="assets/images/slider/slide-2.jpg"
                                    alt="Image Desc"
                                  />
                                </picture>
                              </figure>
                              {/* End .slide-image */}
                              <div className="intro-content">
                                <h3 className="intro-subtitle">
                                  News and Inspiration
                                </h3>
                                {/* End .h3 intro-subtitle */}
                                <h1 className="intro-title">New Arrivals</h1>
                                {/* End .intro-title */}
                                <a
                                  href="category.html"
                                  className="btn btn-outline-white"
                                >
                                  <span>SHOP NOW</span>
                                  <i className="icon-long-arrow-right" />
                                </a>
                              </div>
                              {/* End .intro-content */}
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
                          className="owl-next"
                        >
                          <i className="icon-angle-right" />
                        </button>
                      </div>
                      <div className="owl-dots">
                        <button role="button" className="owl-dot active">
                          <span />
                        </button>
                        <button role="button" className="owl-dot">
                          <span />
                        </button>
                        <button role="button" className="owl-dot">
                          <span />
                        </button>
                      </div>
                    </div>
                    {/* End .intro-slider owl-carousel owl-simple */}
                    <span className="slider-loader" />
                    {/* End .slider-loader */}
                  </div>
                  {/* End .intro-slider-container */}
                </div>
                {/* End .col-lg-8 */}
                <div className="col-lg-4">
                  <div className="intro-banners">
                    <div className="row row-sm">
                      <div className="col-md-6 col-lg-12">
                        <div className="banner banner-display">
                          <a href="#">
                            <img
                              src="assets/images/banners/home/intro/banner-1.jpg"
                              alt="Banner"
                            />
                          </a>
                          <div className="banner-content">
                            <h4 className="banner-subtitle text-darkwhite">
                              <a href="#">Clearence</a>
                            </h4>
                            {/* End .banner-subtitle */}
                            <h3 className="banner-title text-white">
                              <a href="#">
                                Chairs &amp; Chaises <br />
                                Up to 40% off
                              </a>
                            </h3>
                            {/* End .banner-title */}
                            <a
                              href="#"
                              className="btn btn-outline-white banner-link"
                            >
                              Shop Now
                              <i className="icon-long-arrow-right" />
                            </a>
                          </div>
                          {/* End .banner-content */}
                        </div>
                        {/* End .banner */}
                      </div>
                      {/* End .col-md-6 col-lg-12 */}
                      <div className="col-md-6 col-lg-12">
                        <div className="banner banner-display mb-0">
                          <a href="#">
                            <img
                              src="assets/images/banners/home/intro/banner-2.jpg"
                              alt="Banner"
                            />
                          </a>
                          <div className="banner-content">
                            <h4 className="banner-subtitle text-darkwhite">
                              <a href="#">New in</a>
                            </h4>
                            {/* End .banner-subtitle */}
                            <h3 className="banner-title text-white">
                              <a href="#">
                                Best Lighting <br />
                                Collection
                              </a>
                            </h3>
                            {/* End .banner-title */}
                            <a
                              href="#"
                              className="btn btn-outline-white banner-link"
                            >
                              Discover Now
                              <i className="icon-long-arrow-right" />
                            </a>
                          </div>
                          {/* End .banner-content */}
                        </div>
                        {/* End .banner */}
                      </div>
                      {/* End .col-md-6 col-lg-12 */}
                    </div>
                    {/* End .row row-sm */}
                  </div>
                  {/* End .intro-banners */}
                </div>
                {/* End .col-lg-4 */}
              </div>
              {/* End .row */}
              <div className="mb-6" />
              {/* End .mb-6 */}
              <div
                className="owl-carousel owl-simple owl-loaded owl-drag"
                data-toggle="owl"
                data-owl-options='{
                      "nav": false, 
                      "dots": false,
                      "margin": 30,
                      "loop": false,
                      "responsive": {
                          "0": {
                              "items":2
                          },
                          "420": {
                              "items":3
                          },
                          "600": {
                              "items":4
                          },
                          "900": {
                              "items":5
                          },
                          "1024": {
                              "items":6
                          }
                      }
                  }'
              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(0px, 0px, 0px)",
                      transition: "all 0s ease 0s",
                      width: 1199,
                    }}
                  >
                    <div
                      className="owl-item active"
                      style={{ width: "169.667px", marginRight: 30 }}
                    >
                      <a href="#" className="brand">
                        <img
                          src="assets/images/brands/1.png"
                          alt="Brand Name"
                        />
                      </a>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "169.667px", marginRight: 30 }}
                    >
                      <a href="#" className="brand">
                        <img
                          src="assets/images/brands/2.png"
                          alt="Brand Name"
                        />
                      </a>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "169.667px", marginRight: 30 }}
                    >
                      <a href="#" className="brand">
                        <img
                          src="assets/images/brands/3.png"
                          alt="Brand Name"
                        />
                      </a>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "169.667px", marginRight: 30 }}
                    >
                      <a href="#" className="brand">
                        <img
                          src="assets/images/brands/4.png"
                          alt="Brand Name"
                        />
                      </a>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "169.667px", marginRight: 30 }}
                    >
                      <a href="#" className="brand">
                        <img
                          src="assets/images/brands/5.png"
                          alt="Brand Name"
                        />
                      </a>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "169.667px", marginRight: 30 }}
                    >
                      <a href="#" className="brand">
                        <img
                          src="assets/images/brands/6.png"
                          alt="Brand Name"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="owl-nav disabled">
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
                    className="owl-next"
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
          {/* End .bg-lighter */}
          <div className="mb-6" />
          {/* End .mb-6 */}
          <div className="container">
            <div className="heading heading-center mb-3">
              <h2 className="title-lg">Trendy Products</h2>
              {/* End .title */}
              <ul
                className="nav nav-pills justify-content-center"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="trendy-all-link"
                    data-toggle="tab"
                    href="#trendy-all-tab"
                    role="tab"
                    aria-controls="trendy-all-tab"
                    aria-selected="true"
                  >
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trendy-fur-link"
                    data-toggle="tab"
                    href="#trendy-fur-tab"
                    role="tab"
                    aria-controls="trendy-fur-tab"
                    aria-selected="false"
                  >
                    Furniture
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trendy-decor-link"
                    data-toggle="tab"
                    href="#trendy-decor-tab"
                    role="tab"
                    aria-controls="trendy-decor-tab"
                    aria-selected="false"
                  >
                    Decor
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trendy-light-link"
                    data-toggle="tab"
                    href="#trendy-light-tab"
                    role="tab"
                    aria-controls="trendy-light-tab"
                    aria-selected="false"
                  >
                    Lighting
                  </a>
                </li>
              </ul>
            </div>
            {/* End .heading */}
            <div className="tab-content tab-content-carousel">
              <div
                className="tab-pane p-0 fade show active"
                id="trendy-all-tab"
                role="tabpanel"
                aria-labelledby="trendy-all-link"
              >
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
                                  "items":2
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
                  {/* End .product */}
                  {/* End .product */}
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(-594px, 0px, 0px)",
                        transition: "all 0.4s ease 0s",
                        width: 2079,
                      }}
                    >
                      <div
                        className="owl-item"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-1-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-1-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Butler Stool Ladder</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$251,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-2-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-2-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Octo 4240</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$746,00</div>
                            {/* End .product-price */}
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#1f1e18" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#e8e8e8" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <span className="product-label label-new">NEW</span>
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-3-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-3-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Flow Slim Armchair</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$970,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <span className="product-label label-sale">
                              30% OFF
                            </span>
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-4-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-4-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Roots Sofa Bed</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">
                              <span className="new-price">$337,00</span>
                              <span className="old-price">Was $449,00</span>
                            </div>
                            {/* End .product-price */}
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#878883" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#dfd5c2" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-5-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-5-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Petite Table Lamp</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$675,00</div>
                            {/* End .product-price */}
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#74543e" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#e8e8e8" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-6-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-6-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Elephant Armchair</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$457,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-1-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-1-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Butler Stool Ladder</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$251,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
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
                      className="owl-next"
                    >
                      <i className="icon-angle-right" />
                    </button>
                  </div>
                  <div className="owl-dots disabled" />
                </div>
                {/* End .owl-carousel */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="trendy-fur-tab"
                role="tabpanel"
                aria-labelledby="trendy-fur-link"
              >
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
                                  "items":2
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
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(0px, 0px, 0px)",
                        transition: "all 0s ease 0s",
                        width: 594,
                      }}
                    >
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <span className="product-label label-new">NEW</span>
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-3-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-3-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Flow Slim Armchair</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$970,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <span className="product-label label-sale">
                              30% OFF
                            </span>
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-4-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-4-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Roots Sofa Bed</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">
                              <span className="new-price">$337,00</span>
                              <span className="old-price">Was $449,00</span>
                            </div>
                            {/* End .product-price */}
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#878883" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#dfd5c2" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-nav disabled">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev disabled"
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
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="trendy-decor-tab"
                role="tabpanel"
                aria-labelledby="trendy-decor-link"
              >
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
                                  "items":2
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
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(0px, 0px, 0px)",
                        transition: "all 0s ease 0s",
                        width: 594,
                      }}
                    >
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-1-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-1-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Butler Stool Ladder</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$251,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-6-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-6-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Elephant Armchair</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$457,00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-nav disabled">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev disabled"
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
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="trendy-light-tab"
                role="tabpanel"
                aria-labelledby="trendy-light-link"
              >
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
                                  "items":2
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
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(0px, 0px, 0px)",
                        transition: "all 0s ease 0s",
                        width: 594,
                      }}
                    >
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-2-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-2-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Octo 4240</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$746,00</div>
                            {/* End .product-price */}
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#1f1e18" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#e8e8e8" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: 277, marginRight: 20 }}
                      >
                        <div className="product product-11 text-center">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/demos/demo-2/products/product-5-1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                              <img
                                src="assets/images/demos/demo-2/products/product-5-2.jpg"
                                alt="Product image"
                                className="product-image-hover"
                              />
                            </a>
                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist"
                              >
                                <span>add to wishlist</span>
                              </a>
                            </div>
                            {/* End .product-action-vertical */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <h3 className="product-title">
                              <a href="product.html">Petite Table Lamp</a>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">$675,00</div>
                            {/* End .product-price */}
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#74543e" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#e8e8e8" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .product-body */}
                          <div className="product-action">
                            <a href="#" className="btn-product btn-cart">
                              <span>add to cart</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-nav disabled">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev disabled"
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
              {/* .End .tab-pane */}
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .container */}
          <div className="container categories pt-6">
            <h2 className="title-lg text-center mb-4">Shop by Categories</h2>
            {/* End .title-lg text-center */}
            <div className="row">
              <div className="col-6 col-lg-4">
                <div className="banner banner-display banner-link-anim">
                  <a href="#">
                    <img
                      src="assets/images/banners/home/banner-1.jpg"
                      alt="Banner"
                    />
                  </a>
                  <div className="banner-content banner-content-center">
                    <h3 className="banner-title text-white">
                      <a href="#">Outdoor</a>
                    </h3>
                    {/* End .banner-title */}
                    <a href="#" className="btn btn-outline-white banner-link">
                      Shop Now
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                  {/* End .banner-content */}
                </div>
                {/* End .banner */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-6 col-lg-4 order-lg-last">
                <div className="banner banner-display banner-link-anim">
                  <a href="#">
                    <img
                      src="assets/images/banners/home/banner-4.jpg"
                      alt="Banner"
                    />
                  </a>
                  <div className="banner-content banner-content-center">
                    <h3 className="banner-title text-white">
                      <a href="#">Lighting</a>
                    </h3>
                    {/* End .banner-title */}
                    <a href="#" className="btn btn-outline-white banner-link">
                      Shop Now
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                  {/* End .banner-content */}
                </div>
                {/* End .banner */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-12 col-lg-4 banners-sm">
                <div className="row">
                  <div className="banner banner-display banner-link-anim col-lg-12 col-6">
                    <a href="#">
                      <img
                        src="assets/images/banners/home/banner-2.jpg"
                        alt="Banner"
                      />
                    </a>
                    <div className="banner-content banner-content-center">
                      <h3 className="banner-title text-white">
                        <a href="#">Furniture and Design</a>
                      </h3>
                      {/* End .banner-title */}
                      <a href="#" className="btn btn-outline-white banner-link">
                        Shop Now
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .banner-content */}
                  </div>
                  {/* End .banner */}
                  <div className="banner banner-display banner-link-anim col-lg-12 col-6">
                    <a href="#">
                      <img
                        src="assets/images/banners/home/banner-3.jpg"
                        alt="Banner"
                      />
                    </a>
                    <div className="banner-content banner-content-center">
                      <h3 className="banner-title text-white">
                        <a href="#">Kitchen &amp; Utensil</a>
                      </h3>
                      {/* End .banner-title */}
                      <a href="#" className="btn btn-outline-white banner-link">
                        Shop Now
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .banner-content */}
                  </div>
                  {/* End .banner */}
                </div>
              </div>
              {/* End .col-sm-6 col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
          <div className="mb-5" />
          {/* End .mb-6 */}
          <div className="container">
            <div className="heading heading-center mb-6">
              <h2 className="title">Recent Arrivals</h2>
              {/* End .title */}
              <ul
                className="nav nav-pills nav-border-anim justify-content-center"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="top-all-link"
                    data-toggle="tab"
                    href="#top-all-tab"
                    role="tab"
                    aria-controls="top-all-tab"
                    aria-selected="true"
                  >
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-fur-link"
                    data-toggle="tab"
                    href="#top-fur-tab"
                    role="tab"
                    aria-controls="top-fur-tab"
                    aria-selected="false"
                  >
                    Furniture
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-decor-link"
                    data-toggle="tab"
                    href="#top-decor-tab"
                    role="tab"
                    aria-controls="top-decor-tab"
                    aria-selected="false"
                  >
                    Decor
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-light-link"
                    data-toggle="tab"
                    href="#top-light-tab"
                    role="tab"
                    aria-controls="top-light-tab"
                    aria-selected="false"
                  >
                    Lighting
                  </a>
                </li>
              </ul>
            </div>
            {/* End .heading */}
            <div className="tab-content">
              <div
                className="tab-pane p-0 fade active show"
                id="top-all-tab"
                role="tabpanel"
                aria-labelledby="top-all-link"
              >
                <div className="products">
                  <div className="row justify-content-center">
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-12-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-12-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Block Side Table/Trolley</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$229,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#333333" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#e8e8e8" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-10-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-10-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Carronade Suspension Lamp</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$892,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#e8e8e8" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#333333" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <span className="product-label label-new">NEW</span>
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-9-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-9-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Garden Armchair</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$94,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-8-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-8-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Madra Log Holder</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$104,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#333333" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#927764" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-11-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-11-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Original Outdoor Beanbag</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$259,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-13-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-13-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">2-Seater</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$3.107,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-14-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-14-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Wingback Chair</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$2.486,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#999999" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#cc9999" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <span className="product-label label-new">NEW</span>
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-16-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-16-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Decor</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">Cushion Set 3 Pieces</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$199,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .products */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="top-fur-tab"
                role="tabpanel"
                aria-labelledby="top-fur-link"
              >
                <div className="products">
                  <div className="row justify-content-center">
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <span className="product-label label-new">NEW</span>
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-9-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-9-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Garden Armchair</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$94,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-12-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-12-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Block Side Table/Trolley</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$229,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#333333" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#e8e8e8" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-13-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-13-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">2-Seater</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$3.107,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .products */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="top-decor-tab"
                role="tabpanel"
                aria-labelledby="top-decor-link"
              >
                <div className="products">
                  <div className="row justify-content-center">
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-8-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-8-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Madra Log Holder</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$104,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#333333" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#927764" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-11-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-11-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Original Outdoor Beanbag</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$259,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-14-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-14-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Wingback Chair</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$2.486,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#999999" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#cc9999" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .products */}
              </div>
              {/* .End .tab-pane */}
              <div
                className="tab-pane p-0 fade"
                id="top-light-tab"
                role="tabpanel"
                aria-labelledby="top-light-link"
              >
                <div className="products">
                  <div className="row justify-content-center">
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-10-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-10-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <h3 className="product-title">
                            <a href="product.html">Carronade Suspension Lamp</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$892,00</div>
                          {/* End .product-price */}
                          <div className="product-nav product-nav-dots">
                            <a
                              href="#"
                              className="active"
                              style={{ background: "#e8e8e8" }}
                            >
                              <span className="sr-only">Color name</span>
                            </a>
                            <a href="#" style={{ background: "#333333" }}>
                              <span className="sr-only">Color name</span>
                            </a>
                          </div>
                          {/* End .product-nav */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                    <div className="col-6 col-md-4 col-lg-3">
                      <div className="product product-11 mt-v3 text-center">
                        <figure className="product-media">
                          <span className="product-label label-new">NEW</span>
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-2/products/product-16-1.jpg"
                              alt="Product image"
                              className="product-image"
                            />
                            <img
                              src="assets/images/demos/demo-2/products/product-16-2.jpg"
                              alt="Product image"
                              className="product-image-hover"
                            />
                          </a>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist "
                            >
                              <span>add to wishlist</span>
                            </a>
                          </div>
                          {/* End .product-action-vertical */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Decor</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">Cushion Set 3 Pieces</a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">$199,00</div>
                          {/* End .product-price */}
                        </div>
                        {/* End .product-body */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-md-4 col-lg-3 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .products */}
              </div>
              {/* .End .tab-pane */}
            </div>
            {/* End .tab-content */}
            <div className="more-container text-center">
              <a href="#" className="btn btn-outline-darker btn-more">
                <span>Load more products</span>
                <i className="icon-long-arrow-down" />
              </a>
            </div>
            {/* End .more-container */}
          </div>
          {/* End .container */}
          <div className="container">
            <hr />
            <div className="row justify-content-center">
              <div className="col-lg-4 col-sm-6">
                <div className="icon-box icon-box-card text-center">
                  <span className="icon-box-icon">
                    <i className="icon-rocket" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Payment &amp; Delivery</h3>
                    {/* End .icon-box-title */}
                    <p>Free shipping for orders over $50</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-lg-4 col-sm-6 */}
              <div className="col-lg-4 col-sm-6">
                <div className="icon-box icon-box-card text-center">
                  <span className="icon-box-icon">
                    <i className="icon-rotate-left" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Return &amp; Refund</h3>
                    {/* End .icon-box-title */}
                    <p>Free 100% money back guarantee</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-lg-4 col-sm-6 */}
              <div className="col-lg-4 col-sm-6">
                <div className="icon-box icon-box-card text-center">
                  <span className="icon-box-icon">
                    <i className="icon-life-ring" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Quality Support</h3>
                    {/* End .icon-box-title */}
                    <p>Alway online feedback 24/7</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-lg-4 col-sm-6 */}
            </div>
            {/* End .row */}
            <div className="mb-2" />
            {/* End .mb-2 */}
          </div>
          {/* End .container */}
          <div
            className="blog-posts pt-7 pb-7"
            style={{ backgroundColor: "#fafafa" }}
          >
            <div className="container">
              <h2 className="title-lg text-center mb-3 mb-md-4">
                From Our Blog
              </h2>
              {/* End .title-lg text-center */}
              <div
                className="owl-carousel owl-simple carousel-with-shadow owl-loaded owl-drag"
                data-toggle="owl"
                data-owl-options='{
                      "nav": false, 
                      "dots": true,
                      "items": 3,
                      "margin": 20,
                      "loop": false,
                      "responsive": {
                          "0": {
                              "items":1
                          },
                          "600": {
                              "items":2
                          },
                          "992": {
                              "items":3
                          }
                      }
                  }'
              >
                {/* End .entry */}
                {/* End .entry */}
                {/* End .entry */}
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(0px, 0px, 0px)",
                      transition: "all 0s ease 0s",
                      width: 1188,
                    }}
                  >
                    <div
                      className="owl-item active"
                      style={{ width: 376, marginRight: 20 }}
                    >
                      <article className="entry entry-display">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/home/post-1.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}
                        <div className="entry-body pb-4 text-center">
                          <div className="entry-meta">
                            <a href="#">Nov 22, 2018</a>, 0 Comments
                          </div>
                          {/* End .entry-meta */}
                          <h3 className="entry-title">
                            <a href="single.html">Sed adipiscing ornare.</a>
                          </h3>
                          {/* End .entry-title */}
                          <div className="entry-content">
                            <p>
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit. Phasellus hendrerit.
                              <br />
                              Pelletesque aliquet nibh necurna.{" "}
                            </p>
                            <a href="single.html" className="read-more">
                              Read More
                            </a>
                          </div>
                          {/* End .entry-content */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: 376, marginRight: 20 }}
                    >
                      <article className="entry entry-display">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/home/post-2.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}
                        <div className="entry-body pb-4 text-center">
                          <div className="entry-meta">
                            <a href="#">Dec 12, 2018</a>, 0 Comments
                          </div>
                          {/* End .entry-meta */}
                          <h3 className="entry-title">
                            <a href="single.html">
                              Fusce lacinia arcuet nulla.
                            </a>
                          </h3>
                          {/* End .entry-title */}
                          <div className="entry-content">
                            <p>
                              Sed pretium, ligula sollicitudin laoreet
                              <br />
                              viverra, tortor libero sodales leo, eget blandit
                              nunc tortor eu nibh. Nullam mollis justo.{" "}
                            </p>
                            <a href="single.html" className="read-more">
                              Read More
                            </a>
                          </div>
                          {/* End .entry-content */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: 376, marginRight: 20 }}
                    >
                      <article className="entry entry-display">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/home/post-3.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}
                        <div className="entry-body pb-4 text-center">
                          <div className="entry-meta">
                            <a href="#">Dec 19, 2018</a>, 2 Comments
                          </div>
                          {/* End .entry-meta */}
                          <h3 className="entry-title">
                            <a href="single.html">
                              Quisque volutpat mattis eros.
                            </a>
                          </h3>
                          {/* End .entry-title */}
                          <div className="entry-content">
                            <p>
                              Suspendisse potenti. Sed egestas, ante et
                              vulputate volutpat, eros pede semper est, vitae
                              luctus metus libero eu augue.{" "}
                            </p>
                            <a href="single.html" className="read-more">
                              Read More
                            </a>
                          </div>
                          {/* End .entry-content */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                    </div>
                  </div>
                </div>
                <div className="owl-nav disabled">
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
                    className="owl-next"
                  >
                    <i className="icon-angle-right" />
                  </button>
                </div>
                <div className="owl-dots disabled">
                  <button role="button" className="owl-dot active">
                    <span />
                  </button>
                </div>
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* container */}
            <div className="more-container text-center mb-0 mt-3">
              <a href="blog.html" className="btn btn-outline-darker btn-more">
                <span>View more articles</span>
                <i className="icon-long-arrow-right" />
              </a>
            </div>
            {/* End .more-container */}
          </div>
          <div
            className="cta cta-display bg-image pt-4 pb-4"
            style={{
              backgroundImage: "url(assets/images/backgrounds/cta/bg-6.jpg)",
            }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9 col-xl-8">
                  <div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
                    <div className="col">
                      <h3 className="cta-title text-white">
                        Sign Up &amp; Get 10% Off
                      </h3>
                      {/* End .cta-title */}
                      <p className="cta-desc text-white">
                        Molla presents the best in interior design
                      </p>
                      {/* End .cta-desc */}
                    </div>
                    {/* End .col */}
                    <div className="col-auto">
                      <a href="login.html" className="btn btn-outline-white">
                        <span>SIGN UP</span>
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .col-auto */}
                  </div>
                  {/* End .row no-gutters */}
                </div>
                {/* End .col-md-10 col-lg-9 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </div>
          {/* End .cta */}
        </main>
      </Layout>
    </>
  );
}
