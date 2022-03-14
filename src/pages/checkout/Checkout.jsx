import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  createOrder,
  getListPayment, getListVoucherByPage
} from "../../actions";
import {
  addToCart,
  clearCartContent, getCart, removeItemFromCart
} from "../../actions/cart";
import PayPal from "../../components/paypal";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header/";


const Checkout = () => {

  let userID = useSelector(state => state.auth.user.id);
  if(userID == null || userID == undefined) userID = 0;
  const history = useHistory();


  const [voucher, setVoucher] = useState('');
  const [voucherId1, setVoucherId1] = useState(0);
  const [reduceVoucher, setReduceVoucher] = useState(0);

  const [nameReceiver, setNameReceiver] = useState('');
  const [phoneReceiver, setPhoneReceiver] = useState('');
  const [addressReceiver, setAddressReceiver] = useState('');
  const [emailReceiver, setEmailReceiver] = useState('');
  const [note, setNote] = useState('')
  const [paymentId,setPaymentId] = useState(0)

  
  useEffect(() => {
    dispatch(getListVoucherByPage(100,0));
  }, []);
  const listVoucher = useSelector(state => state.voucher.listVoucher);

  useEffect(() => {
    dispatch(getListPayment());
  }, []);
  const listPayment = useSelector(state => state.payment.listPayment);
  
  const handleApplyVoucher= () =>{
    console.log("voucher")
    const findVoucher = listVoucher.find((q)=>q.code == voucher);
    if(findVoucher != undefined) {
      if(findVoucher.type === "1") setReduceVoucher(findVoucher.value) ;
      else setReduceVoucher( totalCart * findVoucher.value);
      setVoucherId1(findVoucher.id)
    }
  }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const [defaultAdd, setDfaultAdd] = useState(false);
  // const orderData = JSON.parse(localStorage.getItem("orderData"));
  const cartproducts = useSelector((state) => state.cart.products);

  // get total from store
  const totalCart = useSelector((state) => state.cart.total);
  // adding total with shipping method charges
  const totalnum = parseInt(totalCart);
  let feeShip = 0;
   if(totalCart <300000)  feeShip =parseInt(20000);
  const totalWithShippingMethod = totalnum + feeShip -reduceVoucher;


  // for delete item from cart
  const confirmDelete = (index, item) => {
    dispatch(removeItemFromCart(index, item));
    dispatch(addToCart());
  };

  // for show order data on console and delelte it form localstorage
  const handleSubmit = (e) => {
    // e.preventDefault();

    const cart =  cartproducts.map((element)=> ({
      productId : element.id,
      quantity : element.quantity,
      unitPrice : element.unitPrice,
      promotionPrice : element.promotionPrice

    }))
    
    const orderdata = {
      nameReceiver,
      phoneReceiver,
      addressReceiver,
      emailReceiver,
      note,
      orderDetailRequests: cart,
      userId: userID,
      paymentId : +paymentId,
      // voucherId :voucherId1,
      total : totalWithShippingMethod,
      discount : reduceVoucher,
      shippingFee : feeShip,
    };
    
    console.log("User Order Details", orderdata);

    // dispatch(createOrder(orderdata));


    // setTimeout(() => {
    //   dispatch(clearCartContent());
    //   localStorage.removeItem("cartItem");
    //   localStorage.removeItem("orderData");
    //   history.push("/thankyou")
    //   console.log("the data is removed");
    // }, 3000);
  };

  

  return (
    <Fragment>
      <Main_Header />
      <section className="padding-y bg-light">
  <div className="container">
    <div className="row">
      <main className="col-xl-8 col-lg-8">
        { userID == 0 ? 
         <article className="card mb-4">
         <div className="content-body">
           <div className="float-end">
             <Link to="/signup" className="btn btn-outline-primary me-2">Đăng kí</Link>
             <Link to="/signin" className="btn btn-primary">Đăng nhập</Link>
           </div>
           <h5>Bạn đã có tài khoản?</h5>
           <p className="mb-0">Đăng kí để nhận thông tin về đơn hàng</p>
         </div>
       </article>
        : null}
       
        {/* ============== COMPONENT CHECKOUT =============== */}			
        <article className="card">
          <div className="content-body">
            <h5 className="card-title">Thông tin nhận hàng </h5>
            <div className="row">
              {/* <div className="col-6 mb-3">
                <label className="form-label">First name</label>
                <input type="text" className="form-control" placeholder="Type here" />
              </div>  */}
              <div className="col-6">
                <label className="form-label">Tên người nhận</label>
                <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup0"
                                placeholder="Name receiver"
                                name="nameReceiver"
                                value={nameReceiver}
                                onChange={(e) => setNameReceiver(e.target.value)}
                                required
                              />
              </div> {/* col end.// */}
              <div className="col-6 mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup1"
                                placeholder="phone Receiver"
                                name="phoneReceiver"
                                value={phoneReceiver}
                                onChange={(e) => setPhoneReceiver(e.target.value)}
                                required
                              />
              </div> {/* col end.// */}
              <div className="col-6 mb-3">
                <label className="form-label">Email</label>
                <input
                                type="email"
                                className="form-control"
                                id="inlineFormInputGroup1"
                                placeholder="Email Receiver"
                                name="emailReceiver"
                                value={emailReceiver}
                                onChange={(e) => setEmailReceiver(e.target.value)}
                              />
              </div> {/* col end.// */}
              <div className="col-sm-12 mb-3">
                <label htmlFor className="form-label">Address</label>
                <input
                                type="text"
                                className="form-control"
                                id="inlineFormInputGroup1"
                                placeholder="addressReceiver"
                                name="addressReceiver"
                                value={addressReceiver}
                                onChange={(e) => setAddressReceiver(e.target.value)}
                                required
                              />
              </div>
              <div className="mb-4">
              <label htmlFor className="form-label">Note</label>
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
            </div> {/* col end.// */}
            </div> {/* row.// */}

            <hr className="my-4" />
            <h5 className="card-title"> Phương thức thanh toán </h5> 
            <div className="row mb-3">


              {listPayment.map((element)=>{
                 return(
                  <div className="col-lg-4 mb-3">
                  <div className="box box-check">
                    <label className="form-check">
                      <input required className="form-check-input" type="radio" name="paymentId" value={element.id} onChange={(e)=>setPaymentId(e.target.value)}/>
                      <b className="border-oncheck" />
                      <span className="form-check-label">
                        {element.name} <br />
                        <small className="text-muted"><div dangerouslySetInnerHTML={{ __html: element.description }} /></small>
                      </span>
                    </label>
                  </div>
                </div>
                )
              
              })}
            
            </div> {/* row end.// */}
              {paymentId ==1 ? (<div>
                <div className="btn btn-warning">
                <PayPal  total = {totalWithShippingMethod} />
                  Paypal
                  </div>
              </div>) : null}
          
            <div className="float-end">
              <button className="btn btn-light me-3"> Hủy</button>
              <button className="btn btn-success" onClick={() => handleSubmit()}>Đặt hàng</button>
            </div>
          </div> {/* card-body end.// */}
        </article> {/* card end.// */}
        {/* ============== COMPONENT CHECKOUT .// =============== */}
      </main> {/* col.// */}
      <aside className="col-xl-4 col-lg-4">
        {/* ============== COMPONENT SUMMARY =============== */}
        <article className="ms-lg-4 mt-4 mt-lg-0" style={{maxWidth: '320px'}}>
          <h6 className="card-title">Summary</h6>
          <dl className="dlist-align">
            <dt>Giá sản phẩm:</dt>
            <dd className="text-end"> {totalCart } VNĐ</dd>
          </dl>
          <dl className="dlist-align">
            <dt>Giảm giá:</dt>
            <dd className="text-end text-danger"> - {reduceVoucher} VNĐ</dd>
          </dl>
          <dl className="dlist-align">
            <dt>Shipping cost:</dt>
            {totalCart < 300000 ? 
            <dd className="text-end"> + 20000 VNĐ</dd> :
            <dd className="text-end"> Free ship</dd>
          }
          </dl>
          <hr />
          <dl className="dlist-align">
            <dt> Tổng: </dt>
            <dd className="text-end"> <strong className="text-dark">{totalWithShippingMethod} VNĐ</strong> </dd>
          </dl>
          <div className="input-group my-4">
          <input
                            type='text'
                            className='form-control'
                            style={{ height: 43 }}
                            placeholder='Coupon Code'
                            aria-label='Coupon Code'
                            aria-describedby='coupon-code'
                            name='voucher'
                            value={voucher}
                            onChange= { (e)=> setVoucher(e.target.value)}
                          />
            <button className="btn btn-light text-primary" onClick={handleApplyVoucher}>Áp dụng</button>
          </div>
          <hr />
          <h6 className="mb-4">Sản phẩm trong giỏ hàng</h6>
          {cartproducts !== undefined
                            ? cartproducts.map((item, i) => (
          <figure className="itemside align-items-center mb-4">
            <div className="aside">
              <b className="badge bg-secondary rounded-pill">{item.quantity}</b>
              <img src={item.image} className="img-sm rounded border" />
            </div>
            <figcaption className="info">
              <a href="#" className="title">{item.name} </a>
              <div className="price text-muted">Tổng: {item.quantity*item.promotionPrice} VNĐ</div> {/* price .// */}
            </figcaption>
          </figure>
           ))
           : null}
        </article> 
        {/* ============== COMPONENT SUMMARY .// =============== */}
      </aside> {/* col.// */}
    </div> {/* row.// */}
    <br /><br />
  </div> {/* container .//  */}
</section>

      <Main_Footer />
     
    </Fragment>
  );
};

export default Checkout;
