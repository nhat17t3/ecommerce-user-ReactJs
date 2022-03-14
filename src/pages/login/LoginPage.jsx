import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";

const Login_Page1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const showError = auth.error;

  const loginUser = (e) => {
    e.preventDefault();
    const send = {
      usernameOrEmail: username,
      password,
    };

    console.log(send);
    dispatch(login(send));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (auth.authenticating) {
    return <div className="loader"></div>;
  }

  return (
    <Fragment>
      <MainHeader />
      <section className="padding-y bg-light">
        <div className="container">
          <div className="row d-flex justify-content-center">
            {/* <div className="col-4"></div> */}
            <aside className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-4">Đăng nhập</h3>
                  <form onSubmit={loginUser}>
                    <div className="mb-3">
                      <label className="form-label">
                        Email hoặc tên đăng nhập
                      </label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Mật khẩu</label>
                      {/* <a className="float-end" href="#">
                        Forgot?
                      </a> */}
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex mb-3">
                      {/* <label className="form-check me-auto">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          defaultChecked
                        />
                        <span className="form-check-label"> Remember </span>
                      </label> */}
                      <a href="#" className="text-decoration-none">
                        Quên mật khẩu
                      </a>
                    </div>
                    <button className="btn w-100 btn-primary mb-4" type="submit">
                      Đăng nhập
                    </button>
                  </form>
                  {/* form end.// */}
                  <p className="mb-1 text-center">Bạn chưa có tài khoản? <Link to="/signup" href="#">Đăng kí</Link></p>

                </div>
                {/* card-body end.// */}
              </div>
              {/* card end.// */}
              {/* ============= COMPONENT LOGIN 1 END.// ============= */}
            </aside>
          </div>
        </div>
      </section>
      <MainFooter />
    </Fragment>
  );
};

export default Login_Page1;
