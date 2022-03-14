import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListProductByPage, getListSlide } from '../../actions';
import Footer2 from '../../layouts/footer';
import MainHeader from '../../layouts/header';


export default function Main() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(getListSlide());
  }, []);
  const listSlide = useSelector((state) => state.slide.listSlide);

  useEffect(() => {
    dispatch(getListProductByPage(4,0,"",""));
  }, []);

  const listHot = useSelector((state) => state.product.listProduct);

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

<section className="section-intro bg-primary ">
<Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
      {
        listSlide.map((element)=>

        <Carousel.Item>
        <img
          // className="d-block "
          src={element.image}
          alt="First slide"
          // width={}
          height={500}
          style={{width: "100%"}}

        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

        )
      }
    </Carousel>
</section>


<section className="padding-y">
  <div className="container">
    <header className="section-heading">
      <h3 className="section-title">New products</h3>
    </header> 
    <div className="row">
    {listHot.map((element)=>
    
      <div className="col-lg-3 col-md-6 col-sm-6">
        <figure className="card card-product-grid">
          <div className="img-wrap"> 
            <img src={element.image} /> 
          </div>
          <figcaption className="info-wrap border-top">
            <div className="price-wrap">
              <span className="price">$790.50</span>
            </div> {/* price-wrap.// */}
            <p className="title mb-2 name-product">{element.name}</p>
            <a href="#" className="btn btn-primary me-2">Thêm vào giỏ</a>
            <a href="#" className="btn btn-light btn-icon"> <i className="fa fa-heart" /> </a>
          </figcaption>
        </figure>
      </div> 
      )}
      {/* col end.// */}
    </div> {/* row end.// */}
  </div> {/* container end.// */}
</section>


<section className="padding-y bg-light">
  <div className="container">
  <article className="card content-body"><div className="row g-5"> <div className="col-md-3"> <div className="icontext"> <div className="icon"> <span className="icon-sm"> <i className="fa fa-coins fa-lg text-primary" /> </span> </div> <div className="text"> <h6 className="title">Reasonable prices</h6> <p>Have you ever finally just </p> </div> </div> {/* icontext // */} </div>{/* col // */} <div className="col-md-3"> <div className="icontext"> <div className="icon"> <span className="icon-sm"> <i className="fa fa-car fa-lg text-primary" /> </span> </div> <div className="text"> <h6 className="title">Free shipping</h6> <p>Have you ever finally just </p> </div> </div> {/* icontext // */} </div>{/* col // */} <div className="col-md-3"> <div className="icontext"> <div className="icon"> <span className="icon-sm"> <i className="fa fa-comment-dots fa-lg text-primary" /> </span> </div> <div className="text"> <h6 className="title">24/7 Support</h6> <p>Have you ever finally just </p> </div> </div> {/* icontext // */} </div> {/* col // */} <div className="col-md-3"> <div className="icontext"> <div className="icon"> <span className="icon-sm"> <i className="fa fa-lock fa-lg text-primary" /> </span> </div> <div className="text"> <h6 className="title">Highly secured</h6> <p>Have you ever finally just </p> </div> </div> {/* icontext // */} </div>{/* col // */}</div></article>

  </div>
</section>

<section className="padding-y">
  <div className="container">
    <header className="section-heading">
      <h3 className="section-title">Hot products</h3>
    </header> 
    <div className="row">
    {listHot.map((element)=>
    
      <div className="col-lg-3 col-md-6 col-sm-6">
        <figure className="card card-product-grid">
          <div className="img-wrap"> 
            <img src={element.image} /> 
          </div>
          <figcaption className="info-wrap border-top">
            <div className="price-wrap">
              <span className="price">$790.50</span>
            </div> {/* price-wrap.// */}
            <p className="title mb-2 name-product">{element.name}</p>
            <a href="#" className="btn btn-primary me-2">Thêm vào giỏ</a>
            <a href="#" className="btn btn-light btn-icon"> <i className="fa fa-heart" /> </a>
          </figcaption>
        </figure>
      </div> 
      )}
      {/* col end.// */}
    </div> {/* row end.// */}
  </div> {/* container end.// */}
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
  )
}
