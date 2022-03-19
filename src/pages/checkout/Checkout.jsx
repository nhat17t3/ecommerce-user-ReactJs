import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import {
  createOrder,
  getListPayment, getListTransporter, getListVoucherByPage
} from "../../actions";
import {
  addToCart,
  clearCartContent, getCart, getCartByServer, removeItemFromCart
} from "../../actions/cart";
import PayPal from "../../components/paypal";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header/";


const Checkout = () => {

  
  //////////////////////////

  let user = useSelector(state => state.auth.user);
  let userID = useSelector(state => state.auth.user.id);
  if(userID == null || userID == undefined) userID = 0;
  const history = useHistory();

  
  
  const [voucher, setVoucher] = useState('');
  const [voucherId1, setVoucherId1] = useState(0);
  const [reduceVoucher, setReduceVoucher] = useState(0);
  
  const [nameReceiver, setNameReceiver] = useState(`${user.firstName} ${user.lastName}`);
  const [phoneReceiver, setPhoneReceiver] = useState(user.phone);
  const [addressReceiver, setAddressReceiver] = useState(user.address);
  const [emailReceiver, setEmailReceiver] = useState(user.email);
  const [note, setNote] = useState('')
  const [paymentId,setPaymentId] = useState(0);
  const [transporterId,setTransporterId] = useState(0);
  
  let checkForm = false;
  if(nameReceiver =="" || phoneReceiver == "" || addressReceiver == "" || paymentId == 0 || transporterId ==0 )
  checkForm=false ;
  else checkForm = true;
  
  useEffect(() => {
    dispatch(getListVoucherByPage(100,0));
  }, []);
  const listVoucher = useSelector(state => state.voucher.listVoucher);

  
  const handleApplyVoucher= () =>{
    console.log("voucher")
    const findVoucher = listVoucher.find((q)=>q.code == voucher);
    if(findVoucher != undefined) {
      const now = new Date();
      const start = new Date(findVoucher.startAt);
      const end = new Date(findVoucher.endAt);

      if(start.getTime() <= now.getTime() && end.getTime() >= now.getTime() 
      && findVoucher.quantity > 0 
      && findVoucher.minOrderValue <= totalCart && findVoucher.isActive!=false )
      {
        if(findVoucher.type === "1") {
          //  if (findVoucher.value > findVoucher.maxPrice) reduce = findVoucher.maxPrice;
          //    else reduce= findVoucher.value;
          setReduceVoucher(findVoucher.value) ;
        }
        else{
          let k = totalCart * findVoucher.value / 100;
        //  if (k > findVoucher.maxPrice) reduce = findVoucher.maxPrice ;
        //  else reduce = k;
          setReduceVoucher(k) ;
        } 
        setVoucherId1(findVoucher.id)
        console.log(findVoucher);


      }
      else toast.warning("Mã giảm giá không khả dụng")

      

    }
    else toast.warning("Sai mã giảm giá")
  }
  
  useEffect(() => {
    dispatch(getListPayment());
  }, []);
  const listPayment = useSelector(state => state.payment.listPayment);

  useEffect(() => {
    dispatch(getListTransporter());
  }, []);
  const listTransporter = useSelector(state => state.transporter.listTransporter);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartByServer())
  }, []);

  const [defaultAdd, setDfaultAdd] = useState(false);
  // const orderData = JSON.parse(localStorage.getItem("orderData"));
  const cartproducts = useSelector((state) => state.cart.products);

  // get total from store
  const totalCart = useSelector((state) => state.cart.total);
  // adding total with shipping method charges
  const totalnum = parseInt(totalCart);
  // let feeShip = 0;
  const [feeShip1, setFeeShip] = useState(0);
  //  if(totalCart <300000)  feeShip =parseInt(20000);
  const totalWithShippingMethod = totalnum + feeShip1 -reduceVoucher;


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
      deliveryId : +transporterId,
      voucherId :voucherId1,
      total : totalWithShippingMethod,
      discount : reduceVoucher,
      shippingFee : feeShip1,
      status : 0,
    };
    
    console.log("User Order Details", orderdata);

    dispatch(createOrder(orderdata));


    setTimeout(() => {
      dispatch(clearCartContent());
      localStorage.removeItem("cartItem");
      history.push("/thankyou")
      console.log("the data is removed");
    }, 2000);
  };
//////////////////////////////////

const value = Number(totalWithShippingMethod/23000.0).toFixed(2);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          size: 'small',
          color:  'black',
          shape:  'pill',
          label:  'pay',
          height: 40,
          tagline: 'false'
      },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Cosmetic store checkout",
                amount: {
                  currency_code: "USD",
                  value: value,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log("ORDER", order);
           // goi API
        //    const form = {
        //     idBill : bill.billId ,
        //     payer : order.payer.email_address,
        //     incoming: k,
        //   }
        //   dispatch(payByTutor(form));
          handleSubmit();

        },
        onError: (err) => {
          setError(err);
          console.error("ERROR", err);
          alert("thanh toán thất bại, vui long thử lại")
        },
      })
      .render(paypalRef.current);
  }, [paymentId]);

  

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
            <h5 className="card-title">Thông tin nhận hàng</h5>
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
            <h5 className="card-title"> Phương thức vận chuyển </h5> 
            <div className="row mb-3">


              {listTransporter.map((element)=>{
                if(element.isActive == true) 
                 return(
                  <div className="col-lg-4 mb-3">
                  <div className="box box-check">
                    <label className="form-check">
                      <input required className="form-check-input" type="radio" name="transporterId" value={element.id} 
                      onChange={(e)=>{
                        setTransporterId(e.target.value)
                        setFeeShip(element.fee);
                      }
                      }/>
                      <b className="border-oncheck" />
                      <span className="form-check-label">
                        {element.name} <br />
                        <small className="text-muted">{element.fee } VNĐ</small>
                      </span>
                    </label>
                  </div>
                </div>
                )
                else return null;
              
              })}
            </div> {/* row end.// */}

           



              {/* {paymentId ==1 ? (<div>
               
                <PayPal  total = {totalWithShippingMethod} />
              
                
              </div>) : null} */}

        
          
          
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
            <dt>Phí vận chuyển:</dt>
           
            <dd className="text-end"> + {feeShip1} VNĐ</dd> 
          
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
              <p  className="title">{item.name} </p>
              <div className="price text-muted">Tổng: {item.quantity*item.promotionPrice} VNĐ</div> {/* price .// */}
            </figcaption>
          </figure>
           ))
           : null}
            <hr className="my-4" />
            <h5 className="card-title"> Phương thức thanh toán </h5> 
            <div className="row mb-3">


              {listPayment.map((element)=>{
                 if(element.isActive == true) 
                 return(
                  <div className="col-lg-12 mb-3">
                  <div className="box box-check">
                    <label className="form-check">
                      <input required className="form-check-input" type="radio" name="paymentId" value={element.id} 
                      onChange={(e)=>{
                        setPaymentId(e.target.value)
                      }
                      }/>
                      <b className="border-oncheck" />
                      <span className="form-check-label">
                        {element.name} <br />
                        {/* <small className="text-muted">{element.description } VNĐ</small> */}
                      </span>
                    </label>
                  </div>
                </div>
                )
                else return null;
              
              })}
            </div> {/* row end.// */}
            <div className="float-end">
              {!checkForm ? <button className="btn btn-success" disabled >Đặt hàng và thanh toán</button>
              :
              
              paymentId == 2 ? 
              <div>
                 <div ref={paypalRef} ></div>
              </div>
              : 
              <button className="btn btn-success"  onClick={() => handleSubmit()}>Đặt hàng</button>
            }
            </div>
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
