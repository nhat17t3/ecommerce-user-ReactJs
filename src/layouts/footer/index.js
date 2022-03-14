import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer2 = () => {


  return (
    <Fragment>
      <footer className="section-footer bg-custom  color-custom">
  <div className="container">
    <section className="footer-main padding-y">
      <div className="row">
        {/* <aside className="col-12 col-sm-12 col-lg-3">
          <article className="me-lg-4">
            <img src="/logo192.png" className="logo-footer" />
            <p className="mt-3"> © 2021- 2022 Templatemount. <br /> All rights reserved. </p>
          </article>
        </aside> */}
        <aside className="col-6 col-sm-4 col-lg-3">
          <h6 className="title">Cửa hàng</h6>
          <ul className="list-menu mb-4">
            <li> <a href="#">Về chúng tôi</a></li>
            <li> <a href="#">Thương hiệu</a></li>
            <li> <a href="#">Danh mục</a></li>
            <li> <a href="#">Bài viết</a></li>
          </ul>
        </aside>
        <aside className="col-6 col-sm-4 col-lg-3">
          <h6 className="title">Thông tin</h6>
          <ul className="list-menu mb-4">
            <li> <a href="#">Trung tâm trợ giúp</a></li>
            <li> <a href="#">Chính sách hoàn trả</a></li>
            <li> <a href="#">Thông tin vận chuyển</a></li>
            <li> <a href="#">Chính sách bảo mật</a></li>
          </ul>
        </aside>
        <aside className="col-6 col-sm-4  col-lg-3">
          <h6 className="title">Hỗ trợ</h6>
          <ul className="list-menu mb-4">
            <li> <a href="#">Trung tâm trợ giúp </a></li>
            <li> <a href="#"> Tài liệu </a></li>
            <li> <a href="#"> Khôi phục tài khoản </a></li>
            <li> <a href="#"> Đơn hàng của bạn </a></li>
          </ul>
        </aside>
        <aside className="col-12 col-sm-12 col-lg-3">
          <h6 className="title">Tin tức mới</h6>
          <p>Nhận các thông tin mới nhất về sản phẩm </p>
          <form className="mb-3">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Email" />
              <button className="btn btn-light" type="submit">
                Gửi
              </button>
            </div> {/* input-group.// */}
          </form>
        </aside>
      </div> {/* row.// */}
    </section>  {/* footer-top.// */}
    <section className="footer-bottom d-flex justify-content-lg-between border-top">
      <div>
        <i className="fab fa-lg fa-cc-visa" />
        <i className="fab fa-lg fa-cc-amex" />
        <i className="fab fa-lg fa-cc-mastercard" />
        <i className="fab fa-lg fa-cc-paypal" />
      </div>
      {/* <nav className="dropup">
        <button className="dropdown-toggle btn d-flex align-items-center py-0" type="button" data-bs-toggle="dropdown">
          <img src="images/flags/flag-usa.png" className="me-2" height={20} /> 
          <span>English</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><a className="dropdown-item" href="#">Russian</a></li>
          <li><a className="dropdown-item" href="#">Arabic</a></li>
          <li><a className="dropdown-item" href="#">Spanish</a></li>
        </ul>
      </nav> */}
    </section>
  </div> {/* container end.// */}
</footer>

    </Fragment>
  );
};

export default Footer2;
