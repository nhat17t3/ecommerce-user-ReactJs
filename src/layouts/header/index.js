import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { filterFavouriteByUser, getListCategory, logout } from "../../actions";
import { addToCart, getCart, removeItemFromCart } from "../../actions/cart";


function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MainHeader = (props) => {
  const history = useHistory();
  let query = useQuery();
  const authenticate = useSelector((state) => state.auth.user?.id);
  const userId = useSelector((state) => state.auth.user?.id);
  const username = useSelector((state) => state.auth.user?.username);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    // dispatch(getCartByServer());
  }, []);

  // useEffect(() => {
  //   dispatch(getListCategory());
  // }, []);
  // const listCate = useSelector((state) => state.category.listCategory);


  // select product from reducer cart
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  // length of product in cart
  const length = products.length;
  // for show alert
  const alert = useAlert();

  // for delete the product form cart or list
  const confirmDelete = (index, item) => {
    dispatch(removeItemFromCart(index, item));
    dispatch(addToCart());
    alert.error("Deleted successfully!");
  };


  const [searchFeild, setSearchFeild] = useState(query.get("key"));
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchFeild, "search");
    if (searchFeild !== "") history.push(`/shop/search?key=${searchFeild}`);
    else history.push(`/shop`);
  };

  return (
    <>
    <header className="header">
  <div className="header-top">
    <div className="container">
      <div className="header-left">
        {/* <div className="header-dropdown">
          <a href="#">Usd</a>
          <div className="header-menu">
            <ul>
              <li>
                <a href="#">Eur</a>
              </li>
              <li>
                <a href="#">Usd</a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="header-dropdown">
          <a href="#">Vietnamese</a>
          <div className="header-menu">
            <ul>
              <li>
                <a href="#">English</a>
              </li>
              <li>
                <a href="#">Vietnamese</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-right">
        <ul className="top-menu">
          <li>
            <a href="#">Links</a>
            <ul>
              <li>
                <a href="tel:#">
                  <i className="icon-phone" />
                  Gọi: +0369 651 657
                </a>
              </li>
              {/* <li>
                <a href="wishlist.html">
                  <i className="icon-heart-o" />
                  Wishlist <span>(3)</span>
                </a>
              </li> */}
              <li>
                <a href="#">Về cúng tôi</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
            
              {!authenticate ? (
                    <li>
                    <Link to="/signin" data-toggle="modal">
                      <i className="icon-user" />
                      Đăng nhập
                    </Link>
                  </li>
                  ) : (
                    <>
                    <li>
                    <Link to="/profile" data-toggle="modal">
                      <i className="icon-user" />
                      Tài Khoản
                    </Link>
                  </li>
                  <li>
                    <a href="/"
                            onClick={() => dispatch(logout())} data-toggle="modal">
                      <i className="icon-user" />
                      Đăng xuất
                    </a>
                  </li>
                    </>
                  )}
            </ul>
          </li>
        </ul>
        {/* End .top-menu */}
      </div>
      {/* End .header-right */}
    </div>
    {/* End .container */}
  </div>
  {/* End .header-top */}
  <div className="sticky-wrapper" style={{}}>
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler">
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <a href="index.html" className="logo">
            <img
              src="/logov2.png"
              alt="Molla Logo"
              width={105}
              height={25}
            />
          </a>
          <nav className="main-nav">
            <ul
              className="menu sf-arrows sf-js-enabled"
              style={{ touchAction: "pan-y" }}
            >
              

              <li>
                <Link to="/" className="sf-with-ul">
                  Trang chủ
                </Link>
                {/* <ul style={{ display: "none" }}>
                  <li>
                    <a href="about.html" className="sf-with-ul">
                      About
                    </a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <a href="about.html">About 01</a>
                      </li>
                      <li>
                        <a href="about-2.html">About 02</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html" className="sf-with-ul">
                      Contact
                    </a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <a href="contact.html">Contact 01</a>
                      </li>
                      <li>
                        <a href="contact-2.html">Contact 02</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="faq.html">FAQs</a>
                  </li>
                  <li>
                    <a href="404.html">Error 404</a>
                  </li>
                  <li>
                    <a href="coming-soon.html">Coming Soon</a>
                  </li>
                </ul> */}
              </li>

              <li>
                <Link to="/shop" className="sf-with-ul">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/blog" className="sf-with-ul">
                  Bài viết
                </Link>
              </li>
              <li>
                <Link to="/contact" className="sf-with-ul">
                  Về chúng tôi
                </Link>
              </li>



            </ul>
            {/* End .menu */}
          </nav>
          {/* End .main-nav */}
        </div>
        {/* End .header-left */}
        <div className="header-right">
          <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
              <i className="icon-search" />
            </a>
            <form action="#" method="get" onSubmit={handleSearch}>
              <div className="header-search-wrapper">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Search in..."
                  required=""
                  value={searchFeild}
                  onChange={(e) => setSearchFeild(e.target.value)}
                />
              </div>
              {/* End .header-search-wrapper */}
            </form>
          </div>
          {/* End .header-search */}

          <div className="dropdown cart-dropdown">
          <Link to="/cart-page"
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i className="icon-shopping-cart" />
              <span className="cart-count">{length}</span>
            </Link>
            {/* <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-cart-products">
                <div className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <a href="product.html">
                        Beige knitted elastic runner shoes
                      </a>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">1</span>x $84.00
                    </span>
                  </div>
                  <figure className="product-image-container">
                    <a href="product.html" className="product-image">
                      <img
                        src="assets/images/products/cart/product-1.jpg"
                        alt="product"
                      />
                    </a>
                  </figure>
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                </div>
                <div className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <a href="product.html">
                        Blue utility pinafore denim dress
                      </a>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">1</span>x $76.00
                    </span>
                  </div>
                  <figure className="product-image-container">
                    <a href="product.html" className="product-image">
                      <img
                        src="assets/images/products/cart/product-2.jpg"
                        alt="product"
                      />
                    </a>
                  </figure>
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                </div>
              </div>
              <div className="dropdown-cart-total">
                <span>Total</span>
                <span className="cart-total-price">$160.00</span>
              </div>
              <div className="dropdown-cart-action">
                <Link to="/cart-page" href="cart.html" className="btn btn-primary">
                  View Cart
                </Link>
                <Link to="/checkout" className="btn btn-outline-primary-2">
                  <span>Checkout</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
            </div> */}
            {/* End .dropdown-menu */}
          </div>
          {/* End .cart-dropdown */}
        </div>
        {/* End .header-right */}
      </div>
      {/* End .container */}
    </div>
  </div>
  {/* End .header-middle */}
</header>

    </>
  );
};

export default MainHeader;
