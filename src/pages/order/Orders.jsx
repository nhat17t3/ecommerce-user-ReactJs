import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterOrderByUser, logout } from '../../actions';
import Main_Footer from '../../layouts/footer';
import Main_Header from '../../layouts/header';

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    dispatch(filterOrderByUser(+user.id));
  }, [user]);
  const listOrder = useSelector((state) => state.order1.listOrder);


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
                    <h6 className="mb-0">Order ID: {element.id} 
                      <span className="text-success"> Shipped</span>
                    </h6>
                    <span className="text-muted">ngày đặt: {element.createdAt}</span>
                  </div>
                  <div>
                    <a href="#" className="btn btn-sm btn-outline-danger">Hủy</a>
                    {/* <a href="#" className="btn btn-sm btn-primary">Track order</a>  */}
                  </div>
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
