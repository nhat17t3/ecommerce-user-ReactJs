import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  createFavourite,
  createRating,
  filterFavouriteByUser,
  filterRatingByProduct,
  getListBrand,
  getListCategory,
  getProductById,
} from "../../actions";
import {
  addItemToCart,
  addToCart,
  DetaildecreaseItemQuantity,
  DetailedProducts,
  DetailincreaseItemQuantity,
  getCart,
  getCartByServer,
  increaseItemQuantity,
} from "../../actions/cart";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";
import ReactStars from "react-rating-stars-component";
import Moment from "react-moment";
import { toast } from "react-toastify";

const Product_Page = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getCart());
    
    dispatch(getCartByServer())
  }, []);

  useEffect(() => {
    dispatch(getListBrand());
  }, []);

  const listBrand = useSelector((state) => state.brand.listBrand);

  useEffect(() => {
    dispatch(getListCategory());
  }, []);

  const listCategory = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    dispatch(getProductById(Number(productId)));
  }, []);

  const findItem = useSelector((state) => state.product.product);
  const [imageProduct, setImageProduct] = useState(findItem.image);


  // let findItem1 = Object.assign({}, findItem, { quantity: 1 });

  // for show alert
  const alert = useAlert();

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
      // alert.success(`Already in cart!`);
      toast.success("Sản phẩm đã có trong giỏ hàng");
      dispatch(increaseItemQuantity(
        productIndex,
        product,
        product.quantity + amount
      ));
      // props.DetailincreaseItemQuantity(productIndex, product, itemQty + 1);
    } else {
      dispatch(addItemToCart(Object.assign({}, product, { quantity: amount })));
      // alert.success("Successfully added to cart!");
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    }
    // to add the product in localstorage
    dispatch(addToCart());
  };
  // const [formData, setFormData] = useState({
  //   quantity: 0,
  //   products: products,
  //   cart: [],
  //   subTotal: 0
  // });

  const increaseQty = () => {
    setAmount(amount + 1);
  };

  const decreaseQty = () => {
    setAmount(amount - 1);
  };

  const userId = useSelector((state) => state.auth.user.id);
  useEffect(() => {
    dispatch(filterFavouriteByUser(userId));
  }, [userId]);
  const listFavourite = useSelector((state) => state.favourite.listFavourite);

  const AddToWishList = async (item) => {
    let productExists = false;
    let productIndex = -1;
    listFavourite.forEach((p, idx) => {
      if (item.id === p.product.id) {
        productExists = true;
        productIndex = idx;
      }
    });
    if (productExists) {
      alert.success(`Already in Wishlist!`);
    } else {
      await dispatch(createFavourite({ userId: userId, productId: item.id }));
      dispatch(filterFavouriteByUser(userId));

      alert.success("Successfully added to Wishlist!");
    }
  };
  const [show, setShow] = useState(false);
  const [star, setStar] = useState(5);
  const [ratingContent, setRatingContent] = useState("");
  const rateStar = {
    size: 25,
    count: 5,
    isHalf: false,
    value: 5,
    color: "black",
    activeColor: "yellow",
    onChange: (newValue) => {
      console.log(`Example 3: new value is ${newValue}`);
      setStar(newValue);
    },
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRating = () => {
    const rating = {
      userId: +userId,
      productId: findItem.id,
      star: +star,
      content: ratingContent,
    };

    dispatch(createRating(rating));
    console.log(rating);
    setShow(false);
    setRatingContent("");
    setStar(5);
  };

  useEffect(() => {
    dispatch(filterRatingByProduct(findItem.id, 100, 0));
  }, [findItem]);
  const listRating = useSelector((state) => state.rating.listRating);

  // const images = [];
  // findItem?.moreImage?.split(",").forEach((element)=>{
  //   images.push({

  //       original: element,
  //       thumbnail: element,

  //   })
  // }
  // )

  return (
    <Fragment>
      <MainHeader />
      {/*  */}
      {/* <ImageGallery items={images} /> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            {/* <input
                        type="number"
                        name="star"
                        id="star"
                        className="form-control"
                        placeholder="Số sao"
                        value={star}
                        onChange={(e) => setStar(e.target.value)}
                        required
                        min="0"
                        max="5" 
                      /> */}
            <ReactStars {...rateStar} />
            <textarea
              class="form-control mt-5"
              id="ratingContent"
              rows="4"
              name="ratingContent"
              value={ratingContent}
              onChange={(e) => setRatingContent(e.target.value)}
              required
            >
              {ratingContent}
            </textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleRating}>
            Gửi
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}

      <section className="padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-lg-6">
              <article className="gallery-wrap">
                <div className="img-big-wrap img-thumbnail">
                  <a data-fslightbox="mygalley" data-type="image" >
                    <img height={560} src={imageProduct ? imageProduct : findItem.image } />
                  </a>
                </div>
                <div className="thumbs-wrap">
                <a
                   data-fslightbox="mygalley"
                   data-type="image"
                 
                   className="item-thumb"
                   onClick={()=>setImageProduct(findItem.image)}
                 >
                   <img width={60} height={60} src={findItem.image} />
                 </a>
                {findItem.moreImage?.split(",").map((element)=>
                   <a
                   data-fslightbox="mygalley"
                   data-type="image"
                 
                   className="item-thumb"
                   onClick={()=>setImageProduct(element)}
                 >
                   <img width={60} height={60} src={element} />
                 </a>
                )}
               
                
                </div>
                {/* <ImageGallery items={images} originalHeight={"60"} thumbnailHeight={60} /> */}
              </article>
            </aside>
            <main className="col-lg-6">
              <article className="ps-lg-3">
                <h4 className="title text-success">{findItem.name}</h4>
                {/* <div className="rating-wrap my-3">
            <ul className="rating-stars">
              <li style={{width: '80%'}} className="stars-active"> <img src="images/misc/stars-active.svg" alt="" /> </li>
              <li> <img src="images/misc/starts-disable.svg" alt="" /> </li>
            </ul>
            <b className="label-rating text-warning"> 4.5</b>
            <i className="dot" />
            <span className="label-rating text-muted"> <i className="fa fa-shopping-basket" /> 154 orders </span>
            <i className="dot" />
            <span className="label-rating text-success">In stock</span>
          </div>  */}
                <div className="mb-3">
                  <var className="price h5 me-5">
                    {findItem.promotionPrice} VNĐ
                  </var>
                  <del className="price-old">{findItem.unitPrice} VNĐ</del>
                  {/* <span className="text-muted">/per box</span>  */}
                </div>
                <p>{findItem.shortDesc}</p>
                <dl className="row">
                  <dt className="col-3">Mã sản phẩm:</dt>
                  <dd className="col-9">{findItem.code}</dd>
                  <dt className="col-3">Danh mục:</dt>
                  <dd className="col-9">{findItem.category?.name}</dd>
                  <dt className="col-3">Thương hiệu:</dt>
                  <dd className="col-9">{findItem.brand?.name}</dd>
                  <dt className="col-3">Số lượng còn</dt>
                  <dd className="col-9">{findItem.instock} sản phẩm</dd>
                </dl>
                <hr />
                <div className="row mb-4">
                  {/* <div className="col-md-4 col-6 mb-2">
              <label className="form-label">Size</label>
              <select className="form-select">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div> */}
                  <div className="col-md-4 col-6 mb-3">
                    <label className="form-label d-block">Số lượng</label>
                    <div className="input-group input-spinner">
                      {amount > 1 ? (
                        <button
                          value="quantity1"
                          className="btn btn-icon btn-light"
                          type="button"
                          onClick={() => decreaseQty()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={22}
                            height={22}
                            fill="#999"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 13H5v-2h14v2z" />
                          </svg>
                        </button>
                      ) : null}
                      <input
                        id="quantity1"
                        name="amount"
                        className="form-control text-center"
                        placeholder
                        value={amount}
                        disabled
                      />
                      <button
                        value="quantity1"
                        className="btn btn-icon btn-light"
                        type="button"
                        onClick={() => increaseQty()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          fill="#999"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="btn  btn-primary me-2"
                  onClick={() => addProductToCart(findItem)}
                >
                  <i className="me-1 fa fa-shopping-basket" /> Thêm vào giỏ
                </button>
                <button
                  className="btn  btn-light"
                  onClick={() => AddToWishList(findItem)}
                >
                  <i className="me-1 fa fa-heart" /> Thích
                </button>
              </article>
            </main>
          </div>
        </div>
      </section>
      <section className="padding-y bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <header className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a
                        href="#"
                        data-bs-target="#tab_specs"
                        data-bs-toggle="tab"
                        className="nav-link active"
                      >
                        Mô tả
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        data-bs-target="#tab_warranty"
                        data-bs-toggle="tab"
                        className="nav-link"
                      >
                        Thông số
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#"
                        data-bs-target="#tab_shipping"
                        data-bs-toggle="tab"
                        className="nav-link"
                      >
                        Đánh giá
                      </a>
                    </li>
                    {/* <li className="nav-item">
                <a href="#" data-bs-target="#tab_seller" data-bs-toggle="tab" className="nav-link">Seller profile</a>
              </li> */}
                  </ul>
                </header>
                <div className="tab-content">
                  <article
                    id="tab_specs"
                    className="tab-pane show active card-body"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: findItem.description,
                      }}
                    />
                  </article>
                  <article id="tab_warranty" className="tab-pane card-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: findItem.specification,
                      }}
                    />
                  </article>
                  <article id="tab_shipping" className="tab-pane card-body">
                    <div className="card-body">
                      <h5 className="card-title">
                        Reviews
                        <button
                          href="#"
                          className="btn  btn-primary-light float-end"
                          onClick={handleShow}
                        >
                          Viết đánh giá
                        </button>
                      </h5>

                      <hr />
                      {listRating.map((element) => (
                        <blockquote className="border-bottom">
                          <div className="float-lg-end d-flex mb-3">
                            <div className="btn-group d-inline-flex me-2">
                              {/* <button
                                        className="btn btn-light btn-sm float-end"
                                        data-bs-toggle="tooltip"
                                        data-bs-title="Like"
                                      >
                                        <i className="fa fa-thumbs-up" />
                                      </button>
                                      <button
                                        className="btn btn-light btn-sm float-end"
                                        data-bs-toggle="tooltip"
                                        data-bs-title="Dislike"
                                      >
                                        <i className="fa fa-thumbs-down" />
                                      </button> */}
                            </div>
                            <button className="btn btn-light btn-sm float-end ">
                              <i className="fa fa-ellipsis-v" />
                            </button>
                          </div>
                          <div className="icontext">
                            <img
                              src="/avartar user.jpg"
                              className="img-xs icon rounded-circle"
                            />
                            <div className="text">
                              <h6 className="mb-0">
                                {element.user.firstName}  {element.user.lastName}
                              </h6>
                              <div className="rating-wrap">
                                <ul className="rating-stars">
                                  <li
                                    style={{ width: `${element.star * 20}%` }}
                                    className="stars-active"
                                  >
                                    <img
                                      src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/stars-active.svg"
                                      alt=""
                                    />
                                  </li>
                                  <li>
                                    <img
                                      src="	https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/starts-disable.svg"
                                      alt=""
                                    />
                                  </li>
                                </ul>
                                {/* <b className="dot" /> */}
                                <small className="label-rating text-muted ms-2">
                                  Đánh giá lúc :
                                  <Moment format="YYYY/MM/DD HH:mm">
                                    {element.createdAt}
                                  </Moment>
                                </small>
                              </div>
                            </div>
                          </div>
                          {/* icontext.// */}
                          <div className="mt-3">
                            <p>{element.content}</p>
                          </div>
                        </blockquote>
                      ))}
                    </div>
                  </article>
                  {/* <article id="tab_seller" className="tab-pane card-body">
              Some other tab content  or sample information now <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </article> */}
                </div>
              </div>
            </div>
            {/*                       
                      <aside className="col-lg-4">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Similar items</h5>
                            <article className="itemside mb-3">
                              <a href="#" className="aside">
                                <img
                                  src="images/items/8.jpg"
                                  width={96}
                                  height={96}
                                  className="img-md img-thumbnail"
                                />
                              </a>
                              <div className="info">
                                <a href="#" className="title mb-1">
                                  Rucksack Backpack Large <br /> Line Mounts
                                </a>
                                <strong className="price"> $38.90</strong>
                              </div>
                            </article>
                            <article className="itemside mb-3">
                              <a href="#" className="aside">
                                <img
                                  src="images/items/9.jpg"
                                  width={96}
                                  height={96}
                                  className="img-md img-thumbnail"
                                />
                              </a>
                              <div className="info">
                                <a href="#" className="title mb-1">
                                  Summer New Men's Denim <br /> Jeans Shorts
                                </a>
                                <strong className="price"> $29.50</strong>
                              </div>
                            </article>
                            <article className="itemside mb-3">
                              <a href="#" className="aside">
                                <img
                                  src="images/items/10.jpg"
                                  width={96}
                                  height={96}
                                  className="img-md img-thumbnail"
                                />
                              </a>
                              <div className="info">
                                <a href="#" className="title mb-1">
                                  T-shirts with multiple colors, for men and
                                  lady
                                </a>
                                <strong className="price"> $120.00</strong>
                              </div>
                            </article>
                            <article className="itemside mb-3">
                              <a href="#" className="aside">
                                <img
                                  src="images/items/11.jpg"
                                  width={96}
                                  height={96}
                                  className="img-md img-thumbnail"
                                />
                              </a>
                              <div className="info">
                                <a href="#" className="title mb-1">
                                  Blazer Suit Dress Jacket for Men, Blue color
                                </a>
                                <strong className="price"> $339.90</strong>
                              </div>
                            </article>
                          </div>
                        </div>
                      </aside> */}

            <br />
            <br />
          </div>
        </div>
      </section>

      <MainFooter />
    </Fragment>
  );
};


export default Product_Page;
