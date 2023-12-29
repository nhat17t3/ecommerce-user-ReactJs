import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer2 = () => {


  return (
    <Fragment>
<footer className="footer">
  <div className="footer-middle">
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <div className="widget widget-about">
            <img
              src="/logov2.png"
              className="footer-logo"
              alt="Footer Logo"
              width={105}
              height={25}
            />
            <p>
              Chúng tôi luôn đem đến những sản phẩm với chất lượng tốt nhất cho khách hàng
            </p>
            <div className="social-icons">
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Facebook"
              >
                <i className="icon-facebook-f" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Twitter"
              >
                <i className="icon-twitter" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Instagram"
              >
                <i className="icon-instagram" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Youtube"
              >
                <i className="icon-youtube" />
              </a>
              <a
                href="#"
                className="social-icon"
                target="_blank"
                title="Pinterest"
              >
                <i className="icon-pinterest" />
              </a>
            </div>
            {/* End .soial-icons */}
          </div>
          {/* End .widget about-widget */}
        </div>
        {/* End .col-sm-6 col-lg-3 */}
        <div className="col-sm-6 col-lg-3">
          <div className="widget">
            <h4 className="widget-title">Cửa hàng</h4>
            {/* End .widget-title */}
            <ul className="widget-list">
            <li> <a href="#">Về chúng tôi</a></li>
            <li> <a href="#">Thương hiệu nổi bật</a></li>
            <li> <a href="#">Danh mục sản phẩm</a></li>
            <li> <a href="#">Bài viết nổi bật</a></li>
            </ul>
            {/* End .widget-list */}
          </div>
          {/* End .widget */}
        </div>
        {/* End .col-sm-6 col-lg-3 */}
        <div className="col-sm-6 col-lg-3">
          <div className="widget">
            <h4 className="widget-title">Thông tin</h4>
            {/* End .widget-title */}
            <ul className="widget-list">
            <li> <a href="#">Trung tâm trợ giúp</a></li>
            <li> <a href="#">Chính sách hoàn trả</a></li>
            <li> <a href="#">Thông tin vận chuyển</a></li>
            <li> <a href="#">Chính sách bảo mật</a></li>
            </ul>
            {/* End .widget-list */}
          </div>
          {/* End .widget */}
        </div>
        {/* End .col-sm-6 col-lg-3 */}
        <div className="col-sm-6 col-lg-3">
          <div className="widget">
            <h4 className="widget-title">Hỗ trợ</h4>
            {/* End .widget-title */}
            <ul className="widget-list">
            <li> <a href="#">Trung tâm trợ giúp </a></li>
            <li> <a href="#"> Tài liệu </a></li>
            <li> <a href="#"> Khôi phục tài khoản </a></li>
            <li> <a href="#"> Đơn hàng của bạn </a></li>
            </ul>
            {/* End .widget-list */}
          </div>
          {/* End .widget */}
        </div>
        {/* End .col-sm-6 col-lg-3 */}
      </div>
      {/* End .row */}
    </div>
    {/* End .container */}
  </div>
  {/* End .footer-middle */}
  <div className="footer-bottom">
    <div className="container">
      <p className="footer-copyright">
        Copyright © 2019 Molla Store. All Rights Reserved.
      </p>
      {/* End .footer-copyright */}
      <figure className="footer-payments">
        <img
          src="assets/images/payments.png"
          alt="Payment methods"
          width={272}
          height={20}
        />
      </figure>
      {/* End .footer-payments */}
    </div>
    {/* End .container */}
  </div>
  {/* End .footer-bottom */}
</footer>

    </Fragment>
  );
};

export default Footer2;
