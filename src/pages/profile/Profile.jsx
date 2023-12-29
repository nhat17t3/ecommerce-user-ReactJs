import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeInformation } from "../../actions";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // const [username, setUsername] = useState("");
  const [nameReceiver, setNameReceiver] = useState("");
  const [addressReceiver, setAddressReceiver] = useState("");
  const [emailReceiver, setEmailReceiver] = useState("");
  const [phoneReceiver, setPhoneReceiver] = useState("");

  useEffect(() => {
    if (user) {
      setNameReceiver(user.name);
      setAddressReceiver(user.address);
      setEmailReceiver(user.email);
      setPhoneReceiver(user.phone);
    }
  }, [user]);

  const updateUser = (e) => {
    e.preventDefault();
    const send = {
      name: nameReceiver,
      email: emailReceiver,
      phone: phoneReceiver,
      address:
        selectedProvince.name +
        ";" +
        selectedDistrict.name +
        ";" +
        selectedCommune.name +
        ";" +
        homeNumber,
    };

    console.log(send);
    dispatch(changeInformation(+user.id, send));
  };

  /////////////// render địa chỉ theo tỉnh thành, quận huyện, xã
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [homeNumber, setHomeNumber] = useState("");

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/?depth=2"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []); // Chỉ gọi API khi component được mount

  useEffect(() => {
    // Gọi API để lấy danh sách huyện/quận khi tỉnh được chọn
    const fetchDistricts = async () => {
      try {
        if (selectedProvince) {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
          );
          setDistricts(response.data.districts);
          console.log("districts" + response);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [selectedProvince]); // Gọi API khi selectedProvince thay đổi

  useEffect(() => {
    // Gọi API để lấy danh sách xã/phường khi huyện được chọn
    const fetchCommunes = async () => {
      try {
        if (selectedDistrict) {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
          );
          setCommunes(response.data.wards);
          console.log("wards" + response);
        }
      } catch (error) {
        console.error("Error fetching communes:", error);
      }
    };

    fetchCommunes();
  }, [selectedDistrict]); // Gọi API khi selectedDistrict thay đổi

  return (
    <Fragment>
      <Main_Header />
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">
              My Account<span>Shop</span>
            </h1>
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
                My Account
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
                      <form action="post" onSubmit={updateUser}>
                        <div className="row">
                          <div className="col-sm-6">
                            <label className="form-label">Tên người nhận</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inlineFormInputGroup0"
                              placeholder=""
                              name="nameReceiver"
                              value={nameReceiver}
                              onChange={(e) => setNameReceiver(e.target.value)}
                              required
                            />
                          </div>
                          {/* End .col-sm-6 */}
                          <div className="col-sm-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inlineFormInputGroup1"
                              placeholder=""
                              name="phoneReceiver"
                              value={phoneReceiver}
                              onChange={(e) => setPhoneReceiver(e.target.value)}
                              required
                            />
                          </div>
                          {/* End .col-sm-6 */}
                        </div>
                        {/* End .row */}
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="inlineFormInputGroup1"
                          placeholder=""
                          name="emailReceiver"
                          value={emailReceiver}
                          onChange={(e) => setEmailReceiver(e.target.value)}
                        />
                        <div className="row">
                          <div className="col-sm-6">
                            <label htmlFor className="form-label">
                              Tỉnh/Thành Phố
                            </label>
                            <select
                              className="form-control"
                              required
                              value={selectedProvince}
                              onChange={(e) => {
                                setSelectedProvince(JSON.parse(e.target.value));
                                setSelectedDistrict("");
                                setSelectedCommune("");
                              }}
                            >
                              <option value="" disabled hidden>
                                Chọn tỉnh/thành phố
                              </option>
                              {provinces.map((province) => (
                                <option
                                  key={province.code}
                                  value={JSON.stringify(province)}
                                >
                                  {province.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* End .col-sm-6 */}
                          <div className="col-sm-6">
                            <label htmlFor className="form-label">
                              Quận/Huyện
                            </label>
                            <select
                              className="form-control"
                              value={selectedDistrict}
                              onChange={(e) => {
                                setSelectedDistrict(JSON.parse(e.target.value));
                                setSelectedCommune("");
                              }}
                              disabled={!selectedProvince}
                              required
                            >
                              <option value="" disabled hidden>
                                Chọn huyện/quận
                              </option>
                              {districts.map((district) => (
                                <option
                                  key={district.code}
                                  value={JSON.stringify(district)}
                                >
                                  {district.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* End .col-sm-6 */}
                        </div>
                        {/* End .row */}
                        <div className="row">
                          <div className="col-sm-6">
                            <label htmlFor className="form-label">
                              Phường/Xã
                            </label>
                            <select
                              className="form-control"
                              required
                              value={selectedCommune}
                              onChange={(e) => {
                                setSelectedCommune(JSON.parse(e.target.value));
                              }}
                              disabled={!selectedDistrict}
                            >
                              <option value="" disabled hidden>
                                Chọn xã/phường
                              </option>
                              {communes.map((commune) => (
                                <option
                                  key={commune.code}
                                  value={JSON.stringify(commune)}
                                >
                                  {commune.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* End .col-sm-6 */}
                          <div className="col-sm-6">
                            <label htmlFor className="form-label">
                              Số nhà
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inlineFormInputGroup1"
                              placeholder="addressReceiver"
                              name="addressReceiver"
                              value={homeNumber}
                              onChange={(e) => setHomeNumber(e.target.value)}
                              required
                            />
                          </div>
                          {/* End .col-sm-6 */}
                        </div>
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

export default Profile;
