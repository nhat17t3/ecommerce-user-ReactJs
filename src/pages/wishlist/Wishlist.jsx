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
import { deleteFavourite,filterFavouriteByUser } from "../../actions";

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
  
  const increaseQty = (index, product, quantity) => {
    // first remove product from cart then update
    props.removeItemFromCart(index, product);
    props.WishlistincreaseItemQuantity(index, product, quantity);
  };

  const decreaseQty = (index, product, quantity) => {
    // first remove product from cart then update
    props.removeItemFromCart(index, product);
    props.WishlistdecreaseItemQuantity(index, product, quantity);
  };
  // For delete product from wishlist
  const confirmDelete = async (index, item) => {
    props.removeItemFromWishlist(index, item);
    props.addToCart();

    await dispatch(deleteFavourite({userId: userId, productId : item.id }));
      dispatch(filterFavouriteByUser(userId));
    alert.error('Delected successfully!');
  };

  

  return (
    <Fragment>
      {/* //Header Style One */}
      <MainHeader />
      {/* //Sticky Header */}
      

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
          
        <section className="padding-y bg-light">
          <div className="container">
            {/* =================== COMPONENT CART+SUMMARY ====================== */}
            <div className="row">
              <h2 className='text-center mb-3'>Danh sách sản phẩm yêu thích</h2>
              <div className="col-2"></div>
              <div className="col-md-9">
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
     
     
      <MainFooter />
    </Fragment>
  );
};

Wishlist.propTypes = {
  WishlistdecreaseItemQuantity: PropTypes.func.isRequired,
  increaseItemQuantity: PropTypes.func.isRequired,
  WishlistincreaseItemQuantity: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  AddWishlistProducts: PropTypes.func.isRequired,
  removeItemFromWishlist: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired
};

export default connect(null, {
  WishlistdecreaseItemQuantity,
  increaseItemQuantity,
  addItemToCart,
  addToCart,
  AddWishlistProducts,
  WishlistincreaseItemQuantity,
  removeItemFromWishlist,
  removeItemFromCart
})(Wishlist);
