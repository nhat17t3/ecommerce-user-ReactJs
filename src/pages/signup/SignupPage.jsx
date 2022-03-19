import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { signup } from "../../actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // const [roles , setRoles] = useState([]);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const showError = auth.error;

  const signupUser = (e) => {
    e.preventDefault();
    const send = {
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      roles: ["ROLE_USER"],
    };

    console.log(send);
    dispatch(signup(send));

    setEmail("");
    setUsername("");
    setPassword("");
    setPhone("");
    setFirstName("");
    setLastName("");
  };

  // if (auth.message == "") {
  //   return <Redirect to={`/signin`} />;
  // }

  if (auth.loading) {
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
                  <h3 className="mb-4">Đăng kí</h3>
                  <form onSubmit={signupUser}>
                    <div className="mb-3">
                      <label className="form-label">Họ</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder=""
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tên</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder=""
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tên đăng nhập</label>
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
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        placeholder=""
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

                    <button
                      className="btn w-100 btn-primary mb-4"
                      type="submit"
                    >
                      Đăng kí
                    </button>
                  </form>
                  {/* form end.// */}
                  <p className="mb-1 text-center">
                    Bạn đã có tài khoản?{" "}
                    <Link to="/signin" href="#">
                      Đăng nhập
                    </Link>
                  </p>
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

export default SignupPage;
