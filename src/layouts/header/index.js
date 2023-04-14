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
  // const [searchFeild, setSearchFeild] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log(searchFeild, "search");
  //   dispatch(searchListProductByName(searchFeild, 100, 0));
  //   history.push(`/shop?search=${searchFeild}&page=${1}`);

  //   if(searchFeild == "") history.push(`/shop`);

  //   // setCurrentPage(1);
  // };

  const authenticate = useSelector((state) => state.auth.user?.id);
  const userId = useSelector((state) => state.auth.user?.id);
  const username = useSelector((state) => state.auth.user?.username);

  // for dispatch the function
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  // useEffect(() => {
  //   dispatch(getListCategory());
  // }, []);
  // const listCate = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    dispatch(filterFavouriteByUser(userId));
  }, [userId]);
  const listFavourite = useSelector((state) => state.favourite.listFavourite);

  // select product from reducer cart
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  // length of product in cart
  const length = products.length;
  // for show alert
  const alert = useAlert();

  // // get all wishlist product from redux
  // const WishlistProducts = useSelector((state) => state.cart.Wishlist_Products);
  // // get the length of the wishlist product
  // const wishlistProductLenght = WishlistProducts.length;

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
    // if (searchFeild === "") dispatch(getListArticleByPage(limit, currentPage - 1,categoryArticleId));
    // else dispatch(searchListArticleByName(searchFeild, limit, currentPage - 1));
    if (searchFeild !== "") history.push(`/shop/search?key=${searchFeild}`);
    else history.push(`/shop`);
  };

  return (
    <Fragment>
      {/* <header className="section-header  " style={{marginBottom: "100px"}}> */}
      <header className="section-header  ">

{/* navbar */}
{/* <nav className="navbar navbar-expand-lg navbar-light bg-white py-4   fixed-top" style={{borderBottom: " 2px solid"}}>
  <div className="container">
   
      <Link to="/" className=" order-lg-0">
                  <img
                    className=""
                    style={{ width: "80px", height: "60px" }}
                    src="/logov2.png"
                  />
                </Link>
    
    <div className="order-lg-2 nav-btns" style={{"minWidth": "150px"}}>
      <button type="button" className="btn position-relative hoverItem">
      <Link to="/cart-page" className="text-dark hoverItem">
        <i className="fa fa-shopping-cart " />
        <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">{length}</span>
      </Link>
      </button>
      <button type="button" className="btn position-relative">
      <Link to="/wishlist" className="text-dark hoverItem">
        <i className="fa fa-heart" />
        <span className="position-absolute top-0 start-100 translate-middle badge bg-primary">{listFavourite.length}</span>
        </Link>
      </button>
      <button type="button" className="btn position-relative search-button">
       
        
        {!authenticate ? (
                    <Link to="/signin" className="text-dark">
                      <i className="fa fa-user" />
                      <span className="ms-1 d-none d-sm-inline-block">
                        
                      </span>
                    </Link>
                  ) : (
                    <div className="nav-item dropdown d-inline">
                      <a
                        className="dropdown-toggle text-dark "
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-user" /> 
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Cá nhân
                          </Link>
                        </li>
                      
                        <li>
                          <Link className="dropdown-item" to="/orders">
                            Đơn hàng
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/"
                            onClick={() => dispatch(logout())}
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
      </button>
    </div>


    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span className="navbar-toggler-icon" />
      
    </button>



    <div className="collapse navbar-collapse order-lg-1" id="navMenu">
      <ul className="navbar-nav mx-auto text-center">
        <li className="nav-item px-2 py-2 hoverItem ">
          <Link className="nav-link text-uppercase text-dark hoverItem fw-bold" to="/">
                    Trang chủ
                  </Link>
        </li>
        <li className="nav-item px-2 py-2">
        <Link className="nav-link text-uppercase text-dark hoverItem fw-bold" to="/shop">
                    Sản phẩm
                  </Link>
        </li>
        <li className="nav-item px-2 py-2">
        <Link className="nav-link text-uppercase text-dark hoverItem fw-bold" to="/blog">
        Bài viết
                  </Link>
        </li>
        <li className="nav-item px-2 py-2">
        <Link className="nav-link  text-uppercase text-dark hoverItem fw-bold" to="/contact">
                    Liên hệ
                  </Link>
        </li>
      

       
      </ul>
    </div>
  </div>
 
</nav> */}


{/* end of navbar */}




        <section className="header-main">
          <div className="container">
            <div className="row gy-3 align-items-center">
              <div className="col-lg-2 col-sm-4 col-4">
                <Link to="/" className="navbar-brand">
                  <img
                    className=""
                    style={{ width: "80px", height: "60px" }}
                    src="/logov2.png"
                  />
                </Link>
                
              </div>
              <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="float-end d-flex">
                  <Link to="/wishlist" className="btn btn-light me-2">
                    <i className="fa fa-heart" />
                    <span className="ms-1 d-none d-sm-inline-block">
                      Yêu thích {listFavourite.length}
                    </span>
                  </Link>
                  <Link to="/cart-page" className="btn btn-light me-2">
                    <i className="fa fa-shopping-cart" />
                    <span className="ms-1">Giỏ hàng {length}</span>
                  </Link>
                  {!authenticate ? (
                    <Link to="/signin" className="btn btn-light">
                      <i className="fa fa-user" />
                      <span className="ms-1 d-none d-sm-inline-block">
                        Đăng nhập
                      </span>
                    </Link>
                  ) : (
                    <div className="nav-item dropdown d-inline">
                      <a
                        className="dropdown-toggle nav-link btn btn-light"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Tài khoản
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Cá nhân
                          </Link>
                        </li>
                      
                        <li>
                          <Link className="dropdown-item" to="/orders">
                            Đơn hàng
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/"
                            onClick={() => dispatch(logout())}
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-lg-5 col-md-12 col-12">
                <form action="#" className onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      style={{ width: "55%" }}
                      placeholder="Tìm kiếm sản phẩm"
                      name="searchFeild"
                      id="searchFeild"
                      value={searchFeild}
                      onChange={(e) => setSearchFeild(e.target.value)}
                    />
                    
                    <button className="btn btn-warning"  type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  
                </form>
              </div>
          
            </div>
            
          </div>
          
        </section>
        <nav className="navbar navbar-light  navbar-expand-lg color-custom bg-custom">
          <div className="container">
            <button
              className="navbar-toggler border"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar_main"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbar_main">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link ps-0 color-custom" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-custom" to="/shop">
                    Sản phẩm
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link color-custom" to="/blog">
                    Bài viết
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link color-custom" to="/contact">
                    Liên hệ
                  </Link>
                </li>

              
              </ul>
            </div>
            
          </div>
        </nav> 
        
      </header>
    </Fragment>
  );
};

export default MainHeader;
