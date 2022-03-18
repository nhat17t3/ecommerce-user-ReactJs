import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterOrderByUser, logout, updateOrder } from '../../actions';
import Main_Footer from '../../layouts/footer';
import Main_Header from '../../layouts/header';
import Moment from "react-moment";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    dispatch(filterOrderByUser(+user.id));
  }, [user]);
  const listOrder = useSelector((state) => state.order1.listOrder);

  const handleCancel = async (orderId) => {
    const form = {
      isCancle : true,
      status : 4,
      isPay : false,
      isConfirm : false,
      isDone : false
    };
    await dispatch(updateOrder(+orderId,form));
    dispatch(filterOrderByUser(+user.id));
  
    // history.goBack();
  };

  const handleSucess = async (orderId) => {
    const form = {
      isDone : true,
      status : 3,
      isPay : true,
      isCancle : false,
      isConfirm : false
    };
    await dispatch(updateOrder(+orderId,form));
    dispatch(filterOrderByUser(+user.id));
    // history.goBack();
  };


  return (
    <Fragment>
      <Main_Header  />
 


      <div className="container py-5">
        <div className="row">
          <aside className="col-lg-3">
            {/* COMPONENT MENU LIST */}
            <div className="card p-3 h-100">
              <nav className="nav flex-column nav-pills">
                <Link to="/profile" className="nav-link " href="#">
                  Cá nhân
                </Link>
                <Link className="nav-link active" href="#" to="/orders">
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
              <h3 className="card-title">Đơn hàng của bạn</h3>
              <div className="card-body">
              {listOrder?.map((element)=>
              <article className="card border-primary mb-4">
              <div className="card-body">
                <header className="d-lg-flex">
                  <div className="flex-grow-1">
                    <h6 className="mb-0">Order ID: {element.id} {"  "}
                    {element.status == 0 ? <span class="badge bg-warning">Chờ xác nhận</span> :
        element.status == 1 ? <span class="badge bg-primary">Đã xác nhận</span> :
        element.status == 2 ? <span class="badge bg-dark">Đang giao hàng</span> :
        element.status == 3 ? <span class="badge bg-success">Thành công</span> :
        <span class="badge bg-danger">Đã hủy</span>}
                    </h6>
                    <span className="text-muted">ngày đặt: <Moment format="YYYY/MM/DD HH:mm">
                                    {element.createdAt}
                                  </Moment></span>
                  </div>
                  <div>
                    {element.status== 0 ?
                    <button onClick={()=>handleCancel(element.id)}  className="btn btn-sm btn-outline-danger">Hủy</button>
                    
                    : null}
                    {element.status== 2 ?
                    <button onClick={()=>handleSucess(element.id)}  className="btn btn-sm btn-outline-primary">Đã nhận hàng</button>
                    
                    : null}
                  </div>
                    {/* <a href="#" className="btn btn-sm btn-primary">Track order</a>  */}
                </header>
                <hr />
                <div className="row">
                  <div className="col-lg-4">
                    <p className="mb-0 text-muted">Thông tin nhận hàng</p>
                    <p className="m-0"> 
                      Tên người nhận :{element.nameReceiver} <br />
                      Điện thoại: {element.phoneReceiver} <br />
                      Email: {element.emailReceiver} </p>
                  </div> {/* col.// */}
                  <div className="col-lg-4 border-start">
                    <p className="mb-0 text-muted">Địa chỉ</p>
                    <p className="m-0"> {element.addressReceiver} </p>
                  </div> {/* col.// */}
                  <div className="col-lg-4 border-start">
                    <p className="mb-0 text-muted">Hình thức thanh toán</p>
                    <p className="m-0">
                      <span className="text-success"> {element.payment?.name} </span> <br /> 
                      Tổng tiền : {element.total} VNĐ
                    </p>
                  </div> {/* col.// */}
                </div> {/* row.// */}
                <hr />
                <ul className="row">
                  {element.orderDetails?.map((detail)=>
                  
                  <li className="col-xl-4  col-lg-6">
                    <figure className="itemside mb-3">
                      <div className="aside">
                        <img width={72} height={72} src={"http://localhost:8080/files/" + detail.product?.image} className="img-sm rounded border" />
                      </div>
                      <figcaption className="info">
                        <p className="title">{detail.product?.name}</p>
                        <strong> {detail.quantity} x = {detail.promotionPrice} VNĐ </strong>
                      </figcaption>
                    </figure> 
                  </li>
                  )}
                </ul>
              </div> {/* card-body .// */}
            </article>
            
              )}

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

export default Orders;
