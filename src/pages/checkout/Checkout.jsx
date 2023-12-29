import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createOrder, getListPayment } from "../../actions";
import {
  addToCart,
  clearCartContent,
  getCart,
  getCartByServer,
  removeItemFromCart,
} from "../../actions/cart";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header/";

const Checkout = () => {
  const history = useHistory();
  let user = useSelector((state) => state.auth.user);
  let userID = useSelector((state) => state.auth.user.id);
  if (userID == null || userID == undefined) userID = 1;

  const [nameReceiver, setNameReceiver] = useState(`${user.name}`);
  const [phoneReceiver, setPhoneReceiver] = useState(user.phone);
  const [addressReceiver, setAddressReceiver] = useState(user.address);
  const [emailReceiver, setEmailReceiver] = useState(user.email);
  const [note, setNote] = useState("");
  const [paymentId, setPaymentId] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState("UNPAID");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [homeNumber, setHomeNumber] = useState("");

  let checkForm = true;
  if (
    nameReceiver == "" ||
    phoneReceiver == "" ||
    addressReceiver == "" ||
    paymentId == 0
    // ||transporterId == 0
  )
    checkForm = false;

  useEffect(() => {
    dispatch(getListPayment());
  }, []);
  const listPayment = useSelector((state) => state.payment.listPayment);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartByServer());
  }, []);

  const cartproducts = useSelector((state) => state.cart.products);
  // get total from store
  const products = useSelector((state) => state.cart.products);
  const totalCart = useSelector((state) => state.cart.total);
  // adding total with shipping method charges
  const totalnum = parseInt(totalCart);
  // for delete item from cart
  const confirmDelete = (index, item) => {
    dispatch(removeItemFromCart(index, item));
    dispatch(addToCart());
  };

  // for show order data on console and delelte it form localstorage
  const handleSubmit = (statusPay = "UNPAID") => {
    // e.preventDefault();
    const cart = cartproducts.map((element) => ({
      productId: element.id,
      quantity: element.quantity,
      price: element.price,
    }));
    const orderdata = {
      nameReceiver,
      phoneReceiver,
      addressReceiver:
        selectedProvince.name +
        ";" +
        selectedDistrict.name +
        ";" +
        selectedCommune.name +
        ";" +
        homeNumber,
      note,
      orderDetailRequestDTO: cart,
      userId: userID,
      totalPrice: totalCart,
      orderStatus: "PENDING",
      paymentMethodId: +paymentId,
      paymentStatus: statusPay,
      // deliveryId: +transporterId,
      // voucherId: voucherId1,
      // total: totalWithShippingMethod,
      // discount: reduceVoucher,
      // shippingFee: feeShip1,
      // status: 0,
    };

    console.log("User Order Details", orderdata);

    dispatch(createOrder(orderdata));

    setTimeout(() => {
      dispatch(clearCartContent());
      localStorage.removeItem("cartItem");
      history.push("/thankyou");
      console.log("the data is removed");
    }, 2000);
  };
  //////////////////////////////////

  const PricePapal = Number(totalCart / 23000.0).toFixed(2);
  const paypalRef = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        // style: {
        //   layout: "horizontal",
        //   size: "small",
        //   color: "black",
        //   shape: "pill",
        //   label: "pay",
        //   height: 40,
        //   tagline: "false",
        // },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Cosmetic store checkout",
                amount: {
                  currency_code: "USD",
                  value: PricePapal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("ORDER", order);
          // goi API
          //    const form = {
          //     idBill : bill.billId ,
          //     payer : order.payer.email_address,
          //     incoming: k,
          //   }
          //   dispatch(payByTutor(form));
          handleSubmit("PAID");
        },
        onError: (err) => {
          console.error("ERROR", err);
          alert("thanh toán thất bại, vui lòng thử lại");
        },
      })
      .render(paypalRef.current);
  }, []);

  /////////////// render địa chỉ theo tỉnh thành, quận huyện, xã

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
              Checkout<span>Shop</span>
            </h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Shop</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="checkout">
            <div className="container">
              {/* End .checkout-discount */}
              <form>
                <div className="row">
                  <div className="col-lg-9">
                    <h2 className="checkout-title">Thông tin khách hàng</h2>
                    {/* End .checkout-title */}
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
                          // value={JSON.stringify(selectedProvince)}
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
                          // value={JSON.stringify(selectedDistrict)}
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
                          // value={JSON.stringify(selectedCommune)}
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
                    {/* End .row */}
                    {/* End .custom-checkbox */}
                    {/* End .custom-checkbox */}
                    <label>Ghi chú (tùy chọn)</label>
                    <textarea
                      class="form-control"
                      id="note"
                      rows="4"
                      name="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      // required
                    >
                      {note}
                    </textarea>
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary">
                      <h3 className="summary-title">Your Order</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products !== undefined && products !== null
                            ? products.map((item, index) => (
                                <tr>
                                  <td>
                                    <a href="#">{item.name}</a>
                                  </td>
                                  <td>{item.quantity * item.price} VNĐ</td>
                                </tr>
                              ))
                            : null}
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>{totalCart} VNĐ</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr>
                            <td>Shipping:</td>
                            <td>Free shipping</td>
                          </tr>
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>{totalCart} VNĐ</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <div className="accordion-summary" id="accordion-payment">
                        <div className="card">
                          <div className="card-header" id="heading-3">
                            <h2 className="card-title">
                              <a
                                className="collapsed"
                                role="button"
                                data-toggle="collapse"
                                href="#collapse-3"
                                aria-expanded="false"
                                aria-controls="collapse-3"
                                onClick={(e) => {
                                  setPaymentId(1);
                                }}
                              >
                                Thanh toán khi nhận hàng
                              </a>
                            </h2>
                          </div>
                          {/* End .card-header */}
                          <div
                            id="collapse-3"
                            className="collapse"
                            aria-labelledby="heading-3"
                            data-parent="#accordion-payment"
                          >
                            <div className="card-body">
                              Quisque volutpat mattis eros. Lorem ipsum dolor
                              sit amet, consectetuer adipiscing elit. Donec
                              odio. Quisque volutpat mattis eros.
                            </div>
                            {/* End .card-body */}
                          </div>
                          {/* End .collapse */}
                        </div>
                        {/* End .card */}
                        <div className="card">
                          <div className="card-header" id="heading-4">
                            <h2 className="card-title">
                              <a
                                className="collapsed"
                                role="button"
                                data-toggle="collapse"
                                href="#collapse-4"
                                aria-expanded="false"
                                aria-controls="collapse-4"
                                onClick={(e) => {
                                  setPaymentId(2);
                                }}
                              >
                                PayPal{" "}
                                <small className="float-right paypal-link">
                                  What is PayPal?
                                </small>
                              </a>
                            </h2>
                          </div>
                          {/* End .card-header */}
                          <div
                            id="collapse-4"
                            className="collapse"
                            aria-labelledby="heading-4"
                            data-parent="#accordion-payment"
                          >
                            <div className="card-body">
                              <div>
                                <div ref={paypalRef}></div>
                              </div>
                            </div>
                            {/* End .card-body */}
                          </div>
                          {/* End .collapse */}
                        </div>
                        {/* End .card */}
                      </div>
                      {/* End .accordion */}
                      <button
                        type="button"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                        onClick={() => handleSubmit()}
                      >
                        <span className="btn-text">Đặt hàng</span>
                        <span className="btn-hover-text">
                          Proceed to Checkout
                        </span>
                      </button>
                    </div>
                    {/* End .summary */}
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </form>
            </div>
            {/* End .container */}
          </div>
          {/* End .checkout */}
        </div>
        {/* End .page-content */}
      </main>

      <Main_Footer />
    </Fragment>
  );
};

export default Checkout;
