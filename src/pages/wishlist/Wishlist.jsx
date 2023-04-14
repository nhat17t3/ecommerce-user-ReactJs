import PropTypes from 'prop-types';
import React, { Fragment, useState,useEffect } from 'react';
import { useAlert } from 'react-alert';
import { connect, useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addItemToCart,
  addToCart,
  AddWishlistProducts, increaseItemQuantity, removeItemFromCart, removeItemFromWishlist, WishlistdecreaseItemQuantity,
  WishlistincreaseItemQuantity
} from '../../actions/cart';
import { deleteFavourite,filterFavouriteByUser, logout } from "../../actions";

import MainFooter from '../../layouts/footer';
import MainHeader from '../../layouts/header';


const Wishlist = props => {
 
  const dispatch = useDispatch();

  
  const userId = useSelector((state) => state.auth.user.id);
  useEffect(() => {
    dispatch(filterFavouriteByUser(userId));
  }, [userId]);



const listProduct = useSelector((state) => state.favourite.listFavourite)
  var WishlistProducts = listProduct.map((product, index) => {
  return Object.assign({}, product, { quantity: 1 });
});

  // get all wishlist product from redux
  // const WishlistProducts = useSelector(state => state.cart.Wishlist_Products);
  // get the lenght of woislist product
  const length = WishlistProducts.length;
  // save currency state from localStorage
  


  // for show alert
  const alert = useAlert();

  // get all product from redux store
  // const products = useSelector(state => state.cart.Wishlist_Products);
  // get cart product from the store
  // const cartProduct = useSelector(state => state.cart.products);

  const products = useSelector(state => state.cart.products);

  console.log('detailed products is', products);
  // add to cart function

  const addProductToCart = item => {
    const product = item;
    let itemQty = product.quantity;
    let productExists = false;
    let productIndex = -1;
    products.forEach((p, idx) => {
      if (product.id === p.id) {
        productExists = true;
        productIndex = idx;
      }
    });
    if (productExists) {
      if (itemQty === undefined) {
        itemQty = 1;
      } else {
        itemQty = product.quantity;
      }
      alert.success('Already in cart!');
      dispatch(increaseItemQuantity(
        productIndex,
        product,
        (itemQty = itemQty + 1)
      ));
    } else {
      dispatch(addItemToCart(product));
      // props.setAlert(
      //   '{product.products_name} has been added to cart',
      //   'success'
      // );
      alert.success('Successfully added to cart!');
    }
    // to add the product in localstorage

    dispatch(addToCart());
  };

  // add and update the cart button
  const addAndUpdatenTheCart = item => {
    let product = item;
    let productExists = false;
    products.forEach((p, idx) => {
      if (product.id === p.id) {
        productExists = true;
        // assign product from redux cart
        product = p;
      }
    });
    if (productExists) {
      addProductToCart(product);
    } else {
      addProductToCart(product);
    }

  };
  
 
  // For delete product from wishlist
  const confirmDelete = async (index, item) => {
  

    await dispatch(deleteFavourite({userId: userId, productId : item.id }));
      dispatch(filterFavouriteByUser(userId));
    // alert.error('Deleted successfully!');
  };

  

  return (
    <Fragment>
      {/* //Header Style One */}
      <MainHeader />
     

        {/* Profile Content */}
      <div className="container py-5">
        <div className="row">
          <aside className="col-lg-3">
            {/* COMPONENT MENU LIST */}
            <div className="card p-3 h-100">
              <nav className="nav flex-column nav-pills">
              <Link to="/profile" className="nav-link " href="#">
                  Cá nhân
                </Link>
                <Link className="nav-link" href="#" to="/orders">
                  Đơn hàng đã đặt
                </Link>
                <Link className="nav-link active" href="#" to="/wishlist">
                  Sản phẩm yêu thích
                </Link>
                <Link to="/Change_Password" className="nav-link" href="#">
                  Đổi mật khẩu
                </Link>
                <a className="nav-link" href="#" onClick={()=>dispatch(logout())}>
                  Đăng xuất
                </a>
                
              </nav>
            </div>
            {/* COMPONENT MENU LIST END .// */}
          </aside>
          <div className="col-lg-9">
            <article className="card">
              <div className="card-body">
               
               
      <div className="div">

    

{length === 0 || length === undefined || length === null ? (
 <div className="container">
 <div className="row text-center">
   <div className="col-12 empty-content">
     <div className="pro-empty-page">
       <h2 style={{fontSize:300}}>
         <i className="fas fa-shopping-cart" />
       </h2>
       <h1>Danh sách yêu thích của bạn đang trống</h1>
       <p>
         <Link to="/shop" className="btn btn-secondary" >Tiếp tục mua sắm </Link>
       </p>
     </div>
   </div>
 </div>
</div>
) : (
  <Fragment>
    
  <section className="">
    <div className="container">
      {/* =================== COMPONENT CART+SUMMARY ====================== */}
      <div className="row">
        <h2 className='text-center mb-3'>Danh sách sản phẩm yêu thích</h2>
        
        <div className="col-md-12">
        {WishlistProducts !== undefined && WishlistProducts.length > 0
              ? WishlistProducts.map((item, index) =>  (
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
                          <Link to={`product-detail/${item.id}`} className="title">{item.name}</Link>
                          <span className="text-muted">{item.category.name}</span>
                        </div>
                      </a>
                    </div>
                    {/* col.// */}
                    <div className="col-auto">
                      {/* input-group.// */}
                    </div>
                    {/* col.// */}
                    <div className="col">
                      <strong className="price">
                        {(item.quantity * item.promotionPrice)} VNĐ/ 1sp
                      </strong>
                    </div>
                    <div className="col text-end">
                      <button href="#" className="btn btn-icon btn-light me-5" onClick={() => addAndUpdatenTheCart(item)}>
                        <i className="fas fa-shopping-cart" />
                      </button>
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
       
        {/* col.// */}
      </div>
      {/* row.// */}
      {/* =================== COMPONENT 1 CART+SUMMARY .//END  ====================== */}
      <br />
      <br />
    </div>
    {/* container .//  */}
  </section>
  </Fragment>
)}
 </div>
              </div>
              {/* card-body .// */}
            </article>
            {/* card .// */}
          </div>
        </div>
      </div>
     
      <MainFooter />
    </Fragment>
  );
};


export default Wishlist;
