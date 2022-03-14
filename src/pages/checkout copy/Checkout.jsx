import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getListPayment, getListVoucherByPage
} from "../../actions";
import {
  addToCart,
  clearCartContent, getCart, removeItemFromCart
} from "../../actions/cart";
import Arrow_BackToTop from "../../components/arrow-backToTop";
import { checkOutTabChanging } from "../../components/utils/LoadScript";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header/";


const Checkout = () => {
  useEffect(() => {
    // load script
    checkOutTabChanging();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    dispatch(getListPayment());
  }, []);
  const listPayment = useSelector((state) => state.payment.listPayment);

 

  const [defaultAdd, setDfaultAdd] = useState(false);
  const orderData = JSON.parse(localStorage.getItem("orderData"));
  const cartproducts = useSelector((state) => state.cart.products);


  const [formData, setFormData] = useState({
    userId: null,
    paymentId: null,
    voucherId: null,
    nameReceiver: "",
    phoneReceiver: "",
    addressReceiver: "",
    total: 0,
    discount: 0,
    shippingFee: 0,
    note: "",
    orderDetailRequests: [],
    error: "",
    //tabChanged: false,
    shippingAddressTabChanged: false,
    billingAddressTabChanged: false,
    shippingMethodTabChanged: false,
    orderViewTabChanged: false,
  });

  const {
    userId,
    paymentId,
    voucherId,
    nameReceiver,
    phoneReceiver,
    addressReceiver,
    total,
    discount,
    shippingFee,
    note,
    orderDetailRequests,

    shippingAddressTabChanged,
    billingAddressTabChanged,
    shippingMethodTabChanged,
    orderViewTabChanged,
    error,
  } = formData;

  // get total from store
  const totalCart = useSelector((state) => state.cart.total);
  // adding total with shipping method charges
  const totalnum = parseInt(totalCart);
  const parse = parseInt(20000);
  const totalWithShippingMethod = totalnum + parse;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addShippingAddress = () => {
    const data = {
      nameReceiver: nameReceiver,
      phoneReceiver: phoneReceiver,
      addressReceiver: addressReceiver,
    };

    localStorage.setItem("orderData", JSON.stringify(data));
  };

  // const addBillingAddress = () => {
  //   // check if use check same billing and shipping address check
  //   if (defaultAdd) {
  //     const data = {
  //       delivery_firstname: delivery_firstname,
  //       delivery_lastname: delivery_lastname,
  //       delivery_companyname: delivery_companyname,
  //       delivery_street_address: delivery_street_address,
  //       delivery_country: delivery_country,
  //       delivery_state: delivery_state,
  //       delivery_city: delivery_city,
  //       delivery_postcode: delivery_postcode,
  //       delivery_phone: delivery_phone,
  //       billing_firstname: delivery_firstname,
  //       billing_lastname: delivery_lastname,
  //       billing_companyname: delivery_companyname,
  //       billing_street_address: delivery_street_address,
  //       billing_country: delivery_country,
  //       billing_state: delivery_state,
  //       billing_city: delivery_city,
  //       billing_postcode: delivery_postcode,
  //       billing_phone: delivery_phone,
  //     };
  //     localStorage.setItem("orderData", JSON.stringify(data));
  //   } else {
  //     const data = {
  //       delivery_firstname: delivery_firstname,
  //       delivery_lastname: delivery_lastname,
  //       delivery_companyname: delivery_companyname,
  //       delivery_street_address: delivery_street_address,
  //       delivery_country: delivery_country,
  //       delivery_state: delivery_state,
  //       delivery_city: delivery_city,
  //       delivery_postcode: delivery_postcode,
  //       delivery_phone: delivery_phone,
  //       billing_firstname: billing_firstname,
  //       billing_lastname: billing_lastname,
  //       billing_companyname: billing_companyname,
  //       billing_street_address: billing_street_address,
  //       billing_country: billing_country,
  //       billing_state: billing_state,
  //       billing_city: billing_city,
  //       billing_postcode: billing_postcode,
  //       billing_phone: billing_phone,
  //     };
  //     localStorage.setItem("orderData", JSON.stringify(data));
  //   }
  // };

  // const addShippingMethod = () => {
  //   const data = JSON.parse(localStorage.getItem("orderData"));

  //   const orderdata = {
  //     delivery_firstname: data.delivery_firstname,
  //     delivery_lastname: data.delivery_lastname,
  //     delivery_companyname: data.delivery_companyname,
  //     delivery_street_address: data.delivery_street_address,
  //     delivery_country: data.delivery_country,
  //     delivery_state: data.delivery_state,
  //     delivery_city: data.delivery_city,
  //     delivery_postcode: data.delivery_postcode,
  //     delivery_phone: data.delivery_phone,
  //     billing_firstname: data.delivery_firstname,
  //     billing_lastname: data.delivery_lastname,
  //     billing_companyname: data.delivery_companyname,
  //     billing_street_address: data.delivery_street_address,
  //     billing_country: data.delivery_country,
  //     billing_state: data.delivery_state,
  //     billing_city: data.delivery_city,
  //     billing_postcode: data.delivery_postcode,
  //     billing_phone: data.delivery_phone,
  //     shipping_method: shipping_method,
  //   };
  //   localStorage.setItem("orderData", JSON.stringify(orderdata));
  // };

  // for delete item from cart
  const confirmDelete = (index, item) => {
    dispatch(removeItemFromCart(index, item));
    dispatch(addToCart());
  };

  // for show order data on console and delelte it form localstorage
  const showOrderData = () => {
    const data = JSON.parse(localStorage.getItem("orderData"));

    const orderdata = {
      nameReceiver: data.nameReceiver,
      phoneReceiver: data.phoneReceiver,
      addressReceiver: data.addressReceiver,
      orderDetailRequests: cartproducts,
      // shipping_method: shipping_method,
      // payment_method: payment_method,
      orderDetailRequests : cartproducts,
      userId: 5,
    };

    console.log("User Order Details", orderdata);

    setTimeout(() => {
      dispatch(clearCartContent());
      localStorage.removeItem("cartItem");
      localStorage.removeItem("orderData");

      console.log("the data is removed");
    }, 3000);
  };

  const [voucher, setVoucher] = useState('');
  const [reduceVoucher, setReduceVoucher] = useState(0);

  
  useEffect(() => {
    dispatch(getListVoucherByPage(100,0));
  }, []);
  const listVoucher = useSelector(state => state.voucher.listVoucher);
  
  const handleApplyVoucher= () =>{
    console.log("voucher")
    const findVoucher = listVoucher.find((q)=>q.code == voucher);
    if(findVoucher != undefined) {
      if(findVoucher.type === "1") setReduceVoucher(findVoucher.value) ;
      else setReduceVoucher( total * findVoucher.value);
    }
  }

  return (
    <Fragment>
      {/* //Header Style One */}
      <Main_Header />
      {/* //Sticky Header */}
      {/* <StickyHeader
        onCurrencyChanged={onChangeCurrencies}
        currencyDetails={currencyDetail}
      /> */}
      {/* //Mobile Header */}
      {/* <MobileHeader
        onCurrencyChanged={onChangeCurrencies}
        currencyDetails={currencyDetail}
      /> */}
      {/* checkout Content */}
      <div className="container-fuild">
        <nav aria-label="breadcrumb">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/#">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <section className="pro-content checkout-content">
        <div className="container">
          <div className="row">
            <div className="pro-heading-title">
              <h1>Trang thanh toán</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-9">
              <div className="row">
                <div className="checkout-module">
                  <ul
                    className="nav nav-pills checkoutd-nav mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link  active"
                        id="pills-shipping-tab"
                        data-toggle="pill"
                        href="#pills-shipping"
                        role="tab"
                        aria-controls="pills-shipping"
                        aria-selected="true"
                      >
                        <span className="d-flex d-lg-none">1</span>
                        <span className="d-none d-lg-flex">
                          Shipping Address
                        </span>
                      </a>
                    </li>
                    
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        id="pills-order-tab"
                        data-toggle="pill"
                        href="#pills-order"
                        role="tab"
                        aria-controls="pills-order"
                        aria-selected="false"
                      >
                        <span className="d-flex d-lg-none">4</span>
                        <span className="d-none d-lg-flex">
                          Order Details.1
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="pills-shipping"
                      role="tabpanel"
                      aria-labelledby="pills-shipping-tab"
                    >
                      <form>
                        <div className="form-row">
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup0"
                                placeholder="Name receiver"
                                name="nameReceiver"
                                value={nameReceiver}
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup1"
                                placeholder="phone Receiver"
                                name="phoneReceiver"
                                value={phoneReceiver}
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>


                          {/*  */}
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup1"
                                placeholder="addressReceiver"
                                name="addressReceiver"
                                value={addressReceiver}
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <span style={{ color: "red", margin: "5px" }}>
                          {error}
                        </span>
                        <div className="col-12 col-sm-12">
                          <div className="row">
                            <a
                              data-toggle="pill"
                              href="#pills-order"
                              // href={
                              //   shippingAddressTabChanged
                              //     ? '#pills-billing'
                              //     : '#pills-shipping'
                              // }
                              className="btn btn-secondary swipe-to-top cta"
                              onClick={() => addShippingAddress()}
                            >
                              Continue.1
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
{/* 
                    <div
                      className="tab-pane fade"
                      id="pills-billing"
                      role="tabpanel"
                      aria-labelledby="pills-billing-tab"
                    >
                      <form>
                        <div className="form-row">
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup01"
                                placeholder="First Name"
                                name="billing_firstname"
                                value={
                                  defaultAdd
                                    ? orderData.delivery_firstname
                                    : billing_firstname
                                }
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup12"
                                placeholder="Last Name"
                                name="billing_lastname"
                                //value={billing_lastname}

                                value={
                                  defaultAdd
                                    ? orderData.delivery_lastname
                                    : billing_lastname
                                }
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup23"
                                placeholder="Company Name"
                                name="billing_companyname"
                                value={
                                  defaultAdd
                                    ? orderData.delivery_companyname
                                    : billing_companyname
                                }
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group ">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup34"
                                placeholder="Address"
                                name="billing_street_address"
                                // value={billing_street_address}
                                onChange={(e) => onChange(e)}
                                value={
                                  defaultAdd
                                    ? orderData.delivery_street_address
                                    : billing_street_address
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group select-control">
                              <select
                                className="form-control"
                                id="inlineFormInputGroup45"
                                name="billing_country"
                                //value={billing_country}
                                onChange={(e) => onChange(e)}
                                value={
                                  defaultAdd
                                    ? orderData.delivery_country
                                    : billing_country
                                }
                              >
                                <option selected>Select Country</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                              </select>
                            </div>
                          </div>
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group select-control">
                              <select
                                className="form-control"
                                id="inlineFormInputGroup56"
                                name="billing_state"
                                //value={billing_state}

                                value={
                                  defaultAdd
                                    ? orderData.delivery_state
                                    : billing_state
                                }
                                onChange={(e) => onChange(e)}
                              >
                                <option selected>Select State</option>
                                <option value="New York">New York</option>
                                <option value="Taxes">Taxes</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup7"
                                placeholder="City"
                                name="billing_city"
                                //value={billing_city}

                                value={
                                  defaultAdd
                                    ? orderData.delivery_city
                                    : billing_city
                                }
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup78"
                                placeholder="Postal Code"
                                name="billing_postcode"
                                //value={billing_postcode}

                                value={
                                  defaultAdd
                                    ? orderData.delivery_postcode
                                    : billing_postcode
                                }
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="from-group col-md-6 mb-3">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup89"
                                placeholder="Phone"
                                name="billing_phone"
                                // value={billing_phone}
                                value={
                                  defaultAdd
                                    ? orderData.delivery_phone
                                    : billing_phone
                                }
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="defaultCheck0"
                              onChange={() => setDfaultAdd(!defaultAdd)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck0"
                            >
                              Same shipping and billing address.1.
                            </label>
                            <small
                              id="checkboxHelp"
                              className="form-text text-muted"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12">
                          <div className="row">
                            <a
                              data-toggle="pill"
                              href="#pills-shipping"
                              className="btn btn-light swipe-to-top cta"
                            >
                              Back.1
                            </a>
                            <a
                              data-toggle="pill"
                              href="#pills-method"
                              // href={
                              //   tabChanged ? '#pills-method' : '#pills-billing'
                              // }
                              className="btn btn-secondary swipe-to-top cta"
                              onClick={() => addBillingAddress()}
                            >
                              Continue.1
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                     */}
                     {/* tab shipping */}
{/*                      
                    <div
                      className="tab-pane fade"
                      id="pills-method"
                      role="tabpanel"
                      aria-labelledby="pills-method-tab"
                    >
                      <div className="col-12 col-sm-12 ">
                        <div className="row">
                          <p>
                            {t(
                              "Please select a prefered shipping method to use on this order.1"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 ">
                        <div className="row">
                          <div className="col-12 col-sm-6 mb-4">
                            <h4>Flate Rate.1</h4>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                id="defaultCheck1"
                                value="11"
                                name="shipping_method"
                                onChange={(e) => onChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                Flat Rate.1 --- $11
                              </label>
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <h4>UPS Shipping.1</h4>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                id="defaultCheck2"
                                value="15"
                                name="shipping_method"
                                onChange={(e) => onChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck2"
                              >
                                24 hours.1 --- $15
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                id="defaultCheck3"
                                value="10"
                                name="shipping_method"
                                onChange={(e) => onChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck3"
                              >
                                48 hours.1 --- $10
                              </label>
                            </div>
                            <div className="form-check mb-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                id="defaultCheck4"
                                value="5"
                                name="shipping_method"
                                onChange={(e) => onChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck4"
                              >
                                48 hours.1 --- $5
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="row">
                          <a
                            data-toggle="pill"
                            href="#pills-billing"
                            className="btn btn-light swipe-to-top cta"
                          >
                            Back.1
                          </a>
                          <a
                            data-toggle="pill"
                            href="#pills-order"
                            // href={tabChanged ? '#pills-order' : '#pills-method'}
                            className="btn btn-secondary swipe-to-top cta"
                            onClick={() => addShippingMethod()}
                          >
                            Continue.1
                          </a>
                        </div>
                      </div>
                    </div> */}

                    <div
                      className="tab-pane fade"
                      id="pills-order"
                      role="tabpanel"
                      aria-labelledby="pills-order-tab"
                    >
                      <table className="table top-table">
                        <thead>
                          <tr className="d-flex">
                            <th className="col-12 col-md-2">ITEM(S).1</th>
                            <th className="col-12 col-md-4" />
                            <th className="col-12 col-md-2">PRICE.1</th>
                            <th className="col-12 col-md-2">QTY.1</th>
                            <th className="col-12 col-md-2">SUBTOTAL.1</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartproducts !== undefined
                            ? cartproducts.map((item, i) => (
                                <tr className="d-flex" key={i}>
                                  <td className="col-12 col-md-2">
                                    <img
                                      className="img-fluid"
                                      src={item.image}
                                      alt="Product"
                                    />
                                  </td>
                                  <td className="col-12 col-md-4">
                                    <div className="item-detail">
                                      <span className="pro-info">
                                        {item.name}
                                      </span>
                                      {/* <h2 className="pro-title">
                                        <Link to="/#">
                                          {t(
                                            `${item.categories[0].categories_name}.1`
                                          )}
                                        </Link>
                                      </h2> */}
                                      <div className="item-attributes" />
                                      <div className="item-controls">
                                        <button type="button" className="btn">
                                          <span className="fas fa-pencil-alt" />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn"
                                          onClick={() => confirmDelete(i, item)}
                                        >
                                          <span className="fas fa-times" />
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="item-price col-12 col-md-2">
                                    {item.promotionPrice}
                                  </td>
                                  <td className="col-12 col-md-2">
                                    <div className="input-group">
                                      {item.quantity}
                                    </div>
                                  </td>
                                  <td className="align-middle item-total col-12 col-md-2">
                              
                                    {(
                                      item.quantity *
                                      item.promotionPrice 
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
                      <div className="col-12 col-sm-12">
                        <div className="row">
                          <div className="heading">
                            <h4>Order Notes & Summary.1</h4>
                          </div>
                          <div
                            className="form-group"
                            style={{ width: "100%", padding: 0 }}
                          >
                            <label htmlFor="exampleFormControlTextarea1">
                              Please write notes of your order.1
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              defaultValue={""}

                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 ">
                        <div className="row">
                          <div className="heading">
                            <h4>Payment Methods.1</h4>
                          </div>
                          <div
                            className="form-group"
                            style={{ width: "100%", padding: 0 }}
                          >
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              style={{ width: "100%", marginBottom: 30 }}
                            >
                              
                                "Please select a prefered payment method to use on this order.1"
                             
                            </label>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="inlineCheckbox1"
                                defaultValue="option1"
                                value="paypal"
                                name="payment_method"
                                onChange={(e) => onChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox1"
                              >
                                <img
                                  src="/assets/images/miscellaneous/paypal.png"
                                  alt="paypal"
                                />
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="inlineCheckbox4"
                                defaultValue="option4"
                                value="cod"
                                name="payment_method"
                                onChange={(e) => onChange(e)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox4"
                              >
                                <img
                                  src="/assets/images/miscellaneous/cod.png"
                                  alt="cod"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="row">
                          <a
                            data-toggle="pill"
                            href="#pills-method"
                            className="btn btn-light swipe-to-top cta"
                          >
                            Back.1
                          </a>
                          <Link
                            to="/thankyou"
                            className="btn btn-secondary swipe-to-top"
                            onClick={() => showOrderData()}
                          >
                            Continue.1
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-3">
              <table className="table right-table">
                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>
                      Order Summary.1
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Subtotal.1</th>
                    <td>
                     
                      {totalCart}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Coupon Code.1</th>
                    <td>$00.00</td>
                  </tr>
                  <tr>
                    <th scope="row">TAX.1</th>
                    <td>$00.00</td>
                  </tr>
                  {/* {shipping_method === "0" ||
                  shipping_method === null ||
                  shipping_method === 0 ? null : (
                    <tr>
                     
                      <th scope="row">
                        {shipping_method == 11
                          ? `FLat Rate Shipping.1`
                          : `UPS Shipping Shipping.1`}
                      </th>
                      <td>
                        {currencyDetail.symbolLeft}
                        {(shipping_method * currencyDetail.value).toFixed(2)}
                      </td>
                      
                    </tr>
                  )} */}

                  <tr className="item-price">
                    <th scope="row">Total.1</th>
                    <td>
                      {totalWithShippingMethod} VNĐ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Mobile */}
      {/* <Mobile_Footer /> */}
      {/* //footer style three */}
      <Main_Footer />
      {/* arrow back to top */}
      <Arrow_BackToTop />
      {/* change color switcher */}
      {/* <Switcher /> */}
      {/* Newsletter Modal */}
      {/* <NewsLetter_Modal /> */}
      {/* cookies section */}
      {/* <Cookies /> */}
    </Fragment>
  );
};

export default Checkout;
