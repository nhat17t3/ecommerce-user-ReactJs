import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changePassword } from "../../actions";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // const [username, setUsername] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const changePass = (e) => {
    e.preventDefault();
    const send = {
      oldPass,
      newPass,
    };

    console.log(send);
    if (newPass != newPass2) alert("mật khẩu mới không khớp");
    else dispatch(changePassword(send));
  };
  return (
    <Fragment>
      <Main_Header />

      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">Đổi mật khẩu</h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Shop</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                change password
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="dashboard">
            <div className="container">
              <div className="row">
                <aside className="col-md-4 col-lg-3">
                  <ul
                    className="nav nav-dashboard flex-column mb-3 mb-md-0"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        id="tab-dashboard-link"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="tab-dashboard"
                        aria-selected="false"
                        to="/profile"
                      >
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        id="tab-orders-link"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="tab-orders"
                        aria-selected="false"
                        to="/orders"
                      >
                        Đơn hàng đã đặt
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        id="tab-downloads-link"
                        data-toggle="tab"
                        to="/change-password"
                        role="tab"
                        aria-controls="tab-downloads"
                        aria-selected="false"
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>

                    {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Out
                </a>
              </li> */}
                  </ul>
                </aside>
                {/* End .col-lg-3 */}
                <div className="col-md-8 col-lg-9">
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="tab-account"
                      role="tabpanel"
                      aria-labelledby="tab-account-link"
                    >
                      <form action="post" onSubmit={changePass}>
                        <label className="form-label">Mật khẩu cũ</label>
                        <input
                          type="password"
                          name="oldPass"
                          className="form-control"
                          placeholder=""
                          value={oldPass}
                          onChange={(e) => setOldPass(e.target.value)}
                          required
                        />
                        <label className="form-label">Mật khẩu mới</label>
                        <input
                          type="password"
                          name="newPass"
                          className="form-control"
                          placeholder=""
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          required
                        />
                        <label className="form-label">
                          Nhập lại mật khẩu mới
                        </label>
                        <input
                          type="password"
                          name="newPass2"
                          className="form-control"
                          placeholder=""
                          value={newPass2}
                          onChange={(e) => setNewPass2(e.target.value)}
                          required
                        />

                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                        >
                          <span>SAVE CHANGES</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                      </form>
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                </div>
                {/* End .col-lg-9 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </div>
          {/* End .dashboard */}
        </div>
        {/* End .page-content */}
      </main>
      <Main_Footer />
    </Fragment>
  );
};

export default ChangePassword;
