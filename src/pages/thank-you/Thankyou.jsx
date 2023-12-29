import React, { Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header";

const Thankyou = () => {
  return (
    <Fragment>
      <Main_Header />

      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                404
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div
          className="error-content text-center"
          style={{
            backgroundImage: "url(assets/images/backgrounds/error-bg.jpg)",
          }}
        >
          <div className="container">
            <h1>Cám ơn bạn đã đặt hàng</h1>
            <p>Chúng tôi sẽ tiếp nhận thông tin đơn hàng và sớm giao đến bạn</p>
            <Link
              to="/shop"
              className="btn btn-outline-primary-2 btn-minwidth-lg"
            >
              <span>BACK TO HOMEPAGE</span>
              <i className="icon-long-arrow-right" />
            </Link>
          </div>
          {/* End .container */}
        </div>
        {/* End .error-content text-center */}
      </main>

      <Main_Footer />
    </Fragment>
  );
};

export default Thankyou;
