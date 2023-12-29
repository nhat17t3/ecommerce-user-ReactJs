import { gapi } from "gapi-script";
import React, { Fragment, useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login, loginGoogle } from "../../actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";

const Login_Page1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const showError = auth.error;

  var clientId =
    "241161812492-r3ha2i13qf4fg1rll11jm4lem8l4tg6m.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
      });
    }
    gapi.load("client:auth2", start);
  });

  const loginUser = (e) => {
    e.preventDefault();
    const send = {
      email: username,
      password,
    };

    console.log(send);
    dispatch(login(send));
    setUsername("");
    setPassword("");
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Ở đây, bạn có thể xử lý dữ liệu từ response, ví dụ: lưu thông tin user vào state hoặc gửi đến server
    const userInfoGoogle = {
      providerName: "google",
      providerId: response.googleId,
      email: response.profileObj.email,
      name: response.profileObj.name,
      roles: ["USER"],
    };
    console.log(userInfoGoogle);
    dispatch(loginGoogle(userInfoGoogle));
  };

  // Hàm xử lý khi đăng nhập thất bại
  const responseErrorGoogle = (error) => {
    console.error(error);
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (auth.loading) {
    return <div className="loader"></div>;
  }

  return (
    <Fragment>
      <MainHeader />
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Đăng nhập</a>
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div
          className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
          style={{
            backgroundImage: 'url("assets/images/backgrounds/login-bg.jpg")',
          }}
        >
          <div className="container">
            <div className="form-box">
              <div className="form-tab">
                <ul className="nav nav-pills nav-fill" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="signin-tab-2"
                      data-toggle="tab"
                      href="#signin-2"
                      role="tab"
                      aria-controls="signin-2"
                      aria-selected="false"
                    >
                      Đăng nhập
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      id="register-tab-2"
                      data-toggle="tab"
                      href="#register-2"
                      role="tab"
                      aria-controls="register-2"
                      aria-selected="true"
                      to="signup"
                    >
                      Đăng kí
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="signin-2"
                    role="tabpanel"
                    aria-labelledby="signin-tab-2"
                  >
                    <form action="#" onSubmit={loginUser}>
                      <div className="form-group">
                        <label htmlFor="singin-email-2">email address *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="singin-email-2"
                          name="singin-email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-group">
                        <label htmlFor="singin-password-2">Password *</label>
                        <input
                          type="password"
                          className="form-control"
                          id="singin-password-2"
                          name="singin-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                        >
                          <span>Gửi</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="signin-remember-2"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="signin-remember-2"
                          >
                            Ghi nhớ
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <a href="#" className="forgot-link">
                          Quên mật khẩu?
                        </a>
                      </div>
                      {/* End .form-footer */}
                    </form>
                    <div className="form-choice">
                      <p className="text-center">Hoặc đăng nhập với</p>
                      <div className="row">
                        <div className="col-sm-6">
                          {/* <a href="#" className="btn btn-login btn-g">
                      <i className="icon-google" />
                      Login With Google
                    </a> */}
                          <GoogleLogin
                            clientId={clientId}
                            buttonText="Đăng nhập bằng Google"
                            onSuccess={responseGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={"single_host_origin"}
                          />
                        </div>
                        {/* End .col-6 */}
                        <div className="col-sm-6">
                          <a href="#" className="btn btn-login btn-f">
                            <i className="icon-facebook-f" />
                            Login With Facebook
                          </a>
                        </div>
                        {/* End .col-6 */}
                      </div>
                      {/* End .row */}
                    </div>
                    {/* End .form-choice */}
                  </div>
                  {/* .End .tab-pane */}
                  {/* .End .tab-pane */}
                </div>
                {/* End .tab-content */}
              </div>
              {/* End .form-tab */}
            </div>
            {/* End .form-box */}
          </div>
          {/* End .container */}
        </div>
        {/* End .login-page section-bg */}
      </main>

      <MainFooter />
    </Fragment>
  );
};

export default Login_Page1;
