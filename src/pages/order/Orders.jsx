import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById, updateOrderStatus } from "../../actions";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserById(+user.id));
  }, []);
  const findItem = useSelector((state) => state.user.user);
  const listOrder = findItem.orders;

  const handleCancel = async (orderId) => {
    const formData = new FormData();
    formData.append("status", "cancled");
    await dispatch(updateOrderStatus(+orderId, formData));
  };

  const handleSucess = async (orderId) => {
    const formData = new FormData();
    formData.append("status", "delivered");
    await dispatch(updateOrderStatus(+orderId, formData));
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
                      /////////////////////
                      {listOrder?.map((element) => (
                        <div className="row" style={{ background: "#f9f9f9" }}>
                          <div className="col-lg-6">
                            <div className="card card-dashboard">
                              <div className="card-body">
                                <h3 className="card-title">
                                  Thông tin đơn hàng
                                </h3>
                                {/* End .card-title */}
                                <p>
                                  Tên người nhận: {element.nameReceiver}
                                  <br />
                                  Số điện thoại: {element.phoneReceiver}
                                  <br />
                                  Địa chỉ: {element.addressReceiver}
                                  <br />
                                  Số tiền: {element.totalPrice}
                                  <br />
                                  Trạng thái đơn hàng: {element.orderStatus}
                                  <br />
                                  Trạng thái thanh toán: {element.paymentStatus}
                                  <br />
                                  Phương thức thanh toán:{" "}
                                  {element.paymentMethod.name}
                                  <br />
                                  <button
                                    className="btn btn-danger mr-2"
                                    onClick={() => handleCancel(element.id)}
                                  >
                                    Hủy <i className="icon-edit" />
                                  </button>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleSucess(element.id)}
                                  >
                                    Đã nhận được hàng{" "}
                                    <i className="icon-edit" />
                                  </button>
                                </p>
                              </div>
                              {/* End .card-body */}
                            </div>
                            {/* End .card-dashboard */}
                          </div>
                          {/* End .col-lg-6 */}
                          <div className="col-lg-6">
                            <div className="card card-dashboard">
                              <div className="card-body">
                                <h3 className="card-title">
                                  Danh sách sản phẩm
                                </h3>
                                {/* End .card-title */}
                                <table className="table table-summary">
                                  <thead>
                                    <tr>
                                      <th>Product</th>
                                      <th>Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {element.orderDetails !== undefined &&
                                    element.orderDetails !== null
                                      ? element.orderDetails.map(
                                          (item, index) => (
                                            <tr>
                                              <td>
                                                <a href="#">
                                                  {item.product.name}
                                                </a>
                                                <br />X {item.quantity}
                                              </td>
                                              <td>
                                                {item.quantity * item.price} VNĐ
                                              </td>
                                            </tr>
                                          )
                                        )
                                      : null}
                                    {/* <tr className="summary-subtotal">
                      <td>Subtotal:</td>
                      <td>{totalCart} VNĐ</td>
                    </tr>
                    <tr>
                      <td>Shipping:</td>
                      <td>Free shipping</td>
                    </tr> */}
                                    <tr className="summary-total">
                                      <td>Total:</td>
                                      <td>{element.totalPrice} VNĐ</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {/* End .card-body */}
                            </div>
                            {/* End .card-dashboard */}
                          </div>
                          {/* End .col-lg-6 */}
                        </div>
                      ))}
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

export default Orders;
