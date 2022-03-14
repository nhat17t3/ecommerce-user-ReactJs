import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Main_Footer from '../../layouts/footer';
import Main_Header from '../../layouts/header';

const Order_Detail = () => {
  
  return (
    <Fragment>
      {/* //Header Style One */}
      <Main_Header
      
      />
      
      {/*My Order Content */}
      <section className='pro-content order-detail-content'>
        <div className='container'>
          <div className='row'>
            <div className='pro-heading-title'>
              <h1>Order Information.</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-3 '>
              <ul className='list-group mb-4'>
                <li className='list-group-item'>
                  <Link className='nav-link' to='/profile'>
                    <i className='fas fa-user' />
                    Profile.
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link className='nav-link' to='/wishlist'>
                    <i className='fas fa-heart' />
                    Wishlist.
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link className='nav-link' to='/orders'>
                    <i className='fas fa-shopping-cart' />
                    Orders.
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link className='nav-link' to='/shipping-address'>
                    <i className='fas fa-map-marker-alt' />
                    Shipping Address.
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link className='nav-link' to='#'>
                    <i className='fas fa-power-off' />
                    Logout.
                  </Link>
                </li>
                <li className='list-group-item'>
                  <Link className='nav-link' to='/change-password'>
                    <i className='fas fa-unlock-alt' />
                    Change Password.
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-12 col-lg-9 '>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <h4>Order ID 35468430.</h4>
                  <table className='table order-id'>
                    <tbody>
                      <tr className='d-flex'>
                        <td className='col-6 col-md-6 pb-0'>
                          <strong>Order Status.</strong>
                        </td>
                        <td className='pending col-6 col-md-6 pb-0'>
                          <p>Pending.</p>
                        </td>
                      </tr>
                      <tr className='d-flex'>
                        <td className='col-6 col-md-6 '>
                          <strong>Order Date.</strong>
                        </td>
                        <td className='col-6 col-md-6'>28/04/2019</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='col-12 col-md-6'>
                  <h4>Payment Methods.</h4>
                  <table className='table order-id'>
                    <tbody>
                      <tr className='d-flex'>
                        <td className='col-6 pb-0'>
                          <strong>Shipping Method.</strong>
                        </td>
                        <td className='col-6 pb-0'>Flat Rate.</td>
                      </tr>
                      <tr className='d-flex'>
                        <td className='col-6'>
                          <strong>Payment Method.</strong>
                        </td>
                        <td className='underline col-6'>
                          Cash on Delivery.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <h4>Shipping Details.</h4>
                  <table className='table order-id'>
                    <tbody>
                      <tr className='d-flex'>
                        <td className='address col-12 col-md-6 pb-0'>
                          <strong>Shipping Address.</strong>
                        </td>
                      </tr>
                      <tr className='d-flex'>
                        <td className='address col-12 col-md-12'>
                         
                            'Address Details, Near, City Name, Country Name.1'
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='col-12 col-md-6'>
                  <h4>Billing Details.</h4>
                  <table className='table order-id'>
                    <tbody>
                      <tr className='d-flex'>
                        <td className='address col-12 pb-0'>
                          <strong>Shipping Address.</strong>
                        </td>
                      </tr>
                      <tr className='d-flex'>
                        <td className='address col-12'>
                          
                            'Address Details, Near, City Name, Country Name.1'
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <table className='table top-table'>
                <thead>
                  <tr className='d-flex'>
                    <th className='col-12 col-md-2'>ITEM(S).</th>
                    <th className='col-12 col-md-4' />
                    <th className='col-12 col-md-2'>PRICE.</th>
                    <th className='col-12 col-md-2'>QTY.</th>
                    <th className='col-12 col-md-2'>SUBTOTAL.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='d-flex'>
                    <td className='col-12 col-md-2'>
                      <img
                        className='img-fluid'
                        src='assets/images/product_images/product_image_02.jpg'
                        alt='Product'
                      />
                    </td>
                    <td className='col-12 col-md-4'>
                      <div className='item-detail'>
                        <span className='pro-info'>Earrings.</span>
                        <h2 className='pro-title'>
                          <Link to='#'>
                            Crytal Wedding Engagement Rings.
                          </Link>
                        </h2>
                        <div className='item-attributes' />
                      </div>
                    </td>
                    <td className='col-12 col-md-2'>
                      <span className='item-price'>$285</span>
                    </td>
                    <td className='col-12 col-md-2'>
                      <div className='input-group '> 2</div>
                    </td>
                    <td className='col-12 col-md-2'>
                      <span className='item-price'>$540</span>
                    </td>
                  </tr>
                  <tr className='d-flex'>
                    <td className='col-12 col-md-2'>
                      <img
                        className='img-fluid'
                        src='assets/images/product_images/product_image_02.jpg'
                        alt='Product'
                      />
                    </td>
                    <td className='col-12 col-md-4'>
                      <div className='item-detail'>
                        <span className='pro-info'>Earrings.</span>
                        <h2 className='pro-title'>
                          <Link to='#'>
                            Crytal Wedding Engagement Rings.
                          </Link>
                        </h2>
                        <div className='item-attributes' />
                      </div>
                    </td>
                    <td className='col-12 col-md-2'>
                      <span className='item-price'>$85</span>
                    </td>
                    <td className='col-12 col-md-2'>
                      <div className='input-group'>4</div>
                    </td>
                    <td className='col-12 col-md-2'>
                      <span className='item-price'>$370</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='row'>
                <div className='col-12 col-sm-12'>
                  <div className='comments-area'>
                    <h4>Order Comments.</h4>
                    <p>
                    
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.1'
                    
                    </p>
                  </div>
                </div>
              </div>
              {/* ............the end..... */}
            </div>
          </div>
        </div>
      </section>
      
      {/* //footer style three */}
      <Main_Footer />
     

    
    </Fragment>
  );
};

export default Order_Detail;
