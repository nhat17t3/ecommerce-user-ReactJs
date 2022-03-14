import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeInformation, logout } from "../../actions";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header";

const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // const [username, setUsername] = useState("");
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone , setPhone] = useState("");
  const [address , setAddress] = useState("");


  useEffect(() => {
    if(user){
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address)
    }
  }, [user]);


  const updateUser = (e) => {
    e.preventDefault();
    const send = {
      firstName,
      lastName,
      phone,
      address,
    };

    console.log(send);
    dispatch(changeInformation(+user.id,send));
  };
  return (
    <Fragment>
      {/* //Header Style One */}
      <Main_Header />
      {/* Profile Content */}
      <div className="container py-5">
        <div className="row">
          <aside className="col-lg-3">
            {/* COMPONENT MENU LIST */}
            <div className="card p-3 h-100">
              <nav className="nav flex-column nav-pills">
              <Link to="/profile" className="nav-link active" href="#">
                  Cá nhân
                </Link>
                <Link className="nav-link" href="#" to="/orders">
                  Đơn hàng đã đặt
                </Link>
                <Link className="nav-link" href="#" to="/wishlist">
                  Sản phẩm yêu thích
                </Link>
                <Link to="/Change_Password" className="nav-link" href="#">
                  Đổi mật khẩu
                </Link>
                <a className="nav-link" href="#" onClick={()=>dispatch(logout())}>
                  Đăng xuất
                </a>
                
              </nav>
            </div>
            {/* COMPONENT MENU LIST END .// */}
          </aside>
          <div className="col-lg-9">
            <article className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row gx-3">
                        <div className="col-6 mb-3">
                        <label className="form-label">
                        Họ
                      </label>
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
                        {/* col .// */}
                        <div className="col-6 mb-3">
                        <label className="form-label">
                        Tên
                      </label>
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
                        {/* col .// */}
                        <div className="col-lg-6 col-md-6 mb-3">
                        <label className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled
                      />
                        </div>
                        {/* col .// */}
                        <div className="col-lg-6 col-md-6 mb-3">
                        <label className="form-label">
                        Số điện thoại
                      </label>
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
                        {/* col .// */}
                        <div className="col-lg-12 mb-3">
                        <label className="form-label">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder=""
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        // required
                      />
                        </div>
                        {/* col .// */}
                        {/* <div className="col-lg-6 col-6 mb-3">
                          <label className="form-label">Birthday</label>
                          <input className="form-control" type="date" />
                        </div> */}
                        {/* col .// */}
                      </div>
                      {/* row.// */}
                    </div>
                    {/* col.// */}
                    {/* <aside className="col-lg-4">
                      <div className="text-lg-center mt-3">
                        <img
                          className="img-lg mb-3 img-avatar"
                          src="bootstrap5-ecommerce/images/avatars/avatar1.jpg"
                          alt="User Photo"
                        />
                        <div>
                          <a className="btn btn-sm btn-light" href="#">
                            <i className="fa fa-camera" /> Upload
                          </a>
                          <a className="btn btn-sm btn-outline-danger" href="#">
                            <i className="fa fa-trash" />
                          </a>
                        </div>
                      </div>
                    </aside> */}
                    {/* col.// */}
                  </div>
                  {/* row.// */} <br />
                  <button className="btn btn-primary" type="submit" onClick={updateUser}>
                    Lưu thay đổi
                  </button>
                </form>
                {/* <hr className="my-4" />
                <div className="row" style={{ maxWidth: "920px" }}>
                  <div className="col-md">
                    <article className="box mb-3 bg-light">
                      <a className="btn float-end btn-light btn-sm" href="#">
                        Change
                      </a>
                      <p className="title mb-0">Password</p>
                      <small
                        className="text-muted d-block"
                        style={{ width: "70%" }}
                      >
                        You can reset or change your password by clicking here
                      </small>
                    </article>
                  </div>
                  <div className="col-md">
                    <article className="box mb-3 bg-light">
                      <a
                        className="btn float-end btn-outline-danger btn-sm"
                        href="#"
                      >
                        Deactivate
                      </a>
                      <p className="title mb-0">Remove account</p>
                      <small
                        className="text-muted d-block"
                        style={{ width: "70%" }}
                      >
                        Once you delete your account, there is no going back.
                      </small>
                    </article>
                  </div>
                 
                </div> */}
                {/* row.// */}
              </div>
              {/* card-body .// */}
            </article>
            {/* card .// */}
          </div>
        </div>
      </div>

      <Main_Footer />
   
    </Fragment>
  );
};

export default Profile;
