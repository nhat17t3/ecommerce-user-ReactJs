import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createFavourite,
  filterFavouriteByUser,
  getListProductByPage,
  getListSlide,
} from "../../actions";
import {
  addItemToCart,
  addToCart,
  getCart,
  getCartByServer,
  increaseItemQuantity,
} from "../../actions/cart";
import Footer2 from "../../layouts/footer";
import MainHeader from "../../layouts/header";

export default function Main() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCart());

    dispatch(getCartByServer());
  }, []);
  const alert = useAlert();

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
      // alert.success('Already in cart!');
      toast.success("Sản phẩm đã có trong giỏ hàng");
      dispatch(
        increaseItemQuantity(productIndex, product, (itemQty = itemQty + 1))
      );
    } else {
      dispatch(addItemToCart(Object.assign({}, product, { quantity: 1 })));
      // props.setAlert(
      //   '{product.products_name} has been added to cart',
      //   'success'
      // );
      // alert.success('Successfully added to cart!');
      toast.success("Thêm vào giỏ hàng thành công");
    }
    // to add the product in localstorage

    dispatch(addToCart());
  };
  // add and update the cart button
  // const addAndUpdatenTheCart = item => {
  //   let product = item;
  //   let productExists = false;
  //   productsOnCart.forEach((p, idx) => {
  //     if (product.id === p.id) {
  //       productExists = true;
  //       // assign product from redux cart
  //       product = p;
  //     }
  //   });
  //   addProductToCart(product);
  //   // if (productExists) {
  //   //   addProductToCart(product);
  //   // } else {
  //   //   addProductToCart(product);
  //   // }

  // };

  const userId = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    dispatch(filterFavouriteByUser(userId));
  }, [userId]);
  const listFavourite = useSelector((state) => state.favourite.listFavourite);

  const AddToWishList = async (item) => {
    let productExists = false;
    let productIndex = -1;
    listFavourite.forEach((p, idx) => {
      if (item.id === p.product?.id) {
        productExists = true;
        productIndex = idx;
      }
    });
    if (productExists) {
      // alert.success(`Already in Wishlist!`);
    } else {
      await dispatch(createFavourite({ userId: userId, productId: item.id }));
      dispatch(filterFavouriteByUser(userId));

      // alert.success("Successfully added to Wishlist!");
    }
  };

  /////////////////////////////////////////////////////////////////

  const [index1, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(getListSlide());
  }, []);
  const listSlide = useSelector((state) => state.slide.listSlide);

  ///////////////////////////////////
  useEffect(() => {
    dispatch(getListProductByPage(30, 0, 0, 0, "createdAtDESC"));
  }, []);

  const listProduct = useSelector((state) => state.product.listProduct);

  const listNew = listProduct
    .filter((item) => item.isActive == true)
    .slice(0, 4);
  const listHot = listProduct
    .filter((item) => item.isHot == true && item.isActive == true)
    .slice(0, 4);

  return (
    <>
      <MainHeader />
      {/* <section className="section-intro bg-primary padding-y-lg">
  <div className="container">
    <article className="my-5">
      <h1 className="display-4 text-white"> Best products &amp; <br /> brands in our store</h1>
      <p className="lead text-white">Trendy Products, Factory Prices, Excellent Service</p>
      <a href="#" className="btn btn-warning"> Purchase now</a> 
      <a href="#" className="btn btn-light"> Learn more </a>
    </article>
  </div> 
</section> */}

      <section className="section-intro  ">
        <Carousel activeIndex={index1} onSelect={handleSelect} interval={2000}>
          {listSlide.map((element, index) => {
            if (element.isActive == true)
              return (
                <Carousel.Item>
                  <img
                    // className="d-block "
                    src={element.image}
                    alt="First slide"
                    // width={}
                    // height={650}
                    style={{ width: "100%", maxHeight: "650px" }}
                  />
                  {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
                </Carousel.Item>
              );
            else return null;
          })}
        </Carousel>
      </section>

      <section className="padding-y">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">Sản phẩm Hot </h3>
          </header>
          <div className="row">
            {listHot.map((product, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <figure className="card card-product-grid">
                  <div className="img-wrap">
                    <span className="topbar">
                      <span className="badge bg-danger"> Hot </span>
                    </span>
                    <img src={product.image} />
                  </div>
                  <figcaption className="info-wrap border-top">
                    <div className="price-wrap">
                      <strong className="price">
                        {product.promotionPrice} VNĐ
                      </strong>
                      <del className="price-old">{product.unitPrice} VNĐ</del>
                    </div>
                    {/* price-wrap.// */}
                    <p
                      style={{
                        cursor: "pointer",
                        textOverflow: "ellipsis",
                      }}
                      className="title mb-2 name-product"
                      onClick={() => {
                        history.push(`/product-detail/${product.id}`);
                      }}
                    >
                      {product.name}
                    </p>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => addProductToCart(product)}
                    >
                      Thêm vào giỏ
                    </button>
                    <button
                      className="btn btn-light btn-icon"
                      onClick={() => AddToWishList(product)}
                    >
                      <i className="fa fa-heart" />
                    </button>
                  </figcaption>
                </figure>
              </div>
            ))}
            {/* col end.// */}
          </div>
          {/* row end.// */}
        </div>
        {/* container end.// */}
      </section>

      <section className="padding-y bg-light">
        <div className="container">
          <article className="card content-body">
            <div className="row g-5">
              <div className="col-md-3">
                <div className="icontext">
                  <div className="icon">
                    <span className="icon-sm">
                      <i className="fa fa-coins fa-lg text-primary" />
                    </span>
                  </div>
                  <div className="text">
                    <h6 className="title">Giá cả hợp lí</h6>
                    <p>Bạn sẽ luôn có mức giá tốt nhất</p>
                  </div>
                </div>
                {/* icontext // */}
              </div>
              {/* col // */}
              <div className="col-md-3">
                <div className="icontext">
                  <div className="icon">
                    <span className="icon-sm">
                      <i className="fa fa-car fa-lg text-primary" />
                    </span>
                  </div>
                  <div className="text">
                    <h6 className="title">Miễn phí vận chuyển</h6>
                    <p>Giao hàng nhanh chóng tận nơi</p>
                  </div>
                </div>
                {/* icontext // */}
              </div>
              {/* col // */}
              <div className="col-md-3">
                <div className="icontext">
                  <div className="icon">
                    <span className="icon-sm">
                      <i className="fa fa-comment-dots fa-lg text-primary" />
                    </span>
                  </div>
                  <div className="text">
                    <h6 className="title">24/7 Hỗ trợ</h6>
                    <p>Nhân viên tư vẫn nhiệt tình</p>
                  </div>
                </div>
                {/* icontext // */}
              </div>
              {/* col // */}
              <div className="col-md-3">
                <div className="icontext">
                  <div className="icon">
                    <span className="icon-sm">
                      <i className="fa  fa-list-alt fa-lg text-primary" />
                    </span>
                  </div>
                  <div className="text">
                    <h6 className="title">Cam kết chính hãng</h6>
                    <p>Nguồn hàng chất lượng cao</p>
                  </div>
                </div>
                {/* icontext // */}
              </div>
              {/* col // */}
            </div>
          </article>
        </div>
      </section>

      <section className="padding-y">
        <div className="container">
          <header className="section-heading">
            <h3 className="section-title">Sản phẩm mới</h3>
          </header>
          <div className="row">
            {listNew.map((product, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <figure className="card card-product-grid">
                  <div className="img-wrap">
                    <span className="topbar">
                      <span className="badge bg-success"> New </span>
                    </span>
                    <img src={product.image} />
                  </div>
                  <figcaption className="info-wrap border-top">
                    <div className="price-wrap">
                      <strong className="price">
                        {product.promotionPrice} VNĐ
                      </strong>
                      <del className="price-old">{product.unitPrice} VNĐ</del>
                    </div>
                    {/* price-wrap.// */}
                    <p
                      style={{
                        cursor: "pointer",
                        textOverflow: "ellipsis",
                      }}
                      className="title mb-2 name-product"
                      onClick={() => {
                        history.push(`/product-detail/${product.id}`);
                      }}
                    >
                      {product.name}
                    </p>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => addProductToCart(product)}
                    >
                      Thêm vào giỏ
                    </button>
                    <button
                      className="btn btn-light btn-icon"
                      onClick={() => AddToWishList(product)}
                    >
                      <i className="fa fa-heart" />
                    </button>
                  </figcaption>
                </figure>
              </div>
            ))}
            {/* col end.// */}
          </div>
          {/* row end.// */}
        </div>
        {/* container end.// */}
      </section>

      {/* <section className="padding-y">
  <div className="container">
    <header className="section-heading">
      <h3 className="section-title">Recommended</h3>
    </header> 
    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-6">
        <figure className="card-product-grid">
          <a href="#" className="img-wrap rounded bg-gray-light"> 
            <img height={250} className="mix-blend-multiply" src="images/items/9.jpg" /> 
          </a>
          <figcaption className="pt-2">
            <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart" /> </a>
            <strong className="price">$17.00</strong>
            <a href="#" className="title text-truncate">Blue jeans shorts for men</a>
            <small className="text-muted">Sizes: S, M, XL</small>
          </figcaption>
        </figure>
      </div> 

    </div> 
  </div> 
</section> */}

      <Footer2 />
    </>
  );
}
