import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Main_Footer from '../../layouts/footer';
import Main_Header from '../../layouts/header';

const Shipping_Address = () => {
  
  return (
    <Fragment>
      {/* //Header Style One */}
      <Main_Header
       
      />
      {/* //Sticky Header */}
     
      {/*Shipping Content */}
      <div className='container-fuild'>
        <nav aria-label='breadcrumb'>
          <div className='container'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to='#'>Home.</Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Shipping Address.
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <section className='pro-content shipping-content'>
        <div className='container'>
          <div className='row'>
            <div className='pro-heading-title'>
              <h1>Shipping Address.</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-3'>
              <ul className='list-group'>
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
              <table className='table'>
                <thead>
                  <tr className='d-flex'>
                    <th className='col-12 col-md-8'>
                      DEFAULT ADDRESS.
                    </th>
                    <th className='col-12 col-md-4'>ACTION.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='d-flex'>
                    <td className='col-12 col-md-8'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='exampleRadios'
                          id='exampleRadios1'
                          defaultValue='option1'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='exampleRadios1'
                        >
                         
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.1'
                          
                        </label>
                      </div>
                    </td>
                    <td className=' col-12 col-md-4'>
                      <ul className='controls'>
                        <li>
                          <Link to='#'>
                            <i className='fas fa-pen' /> Edit.
                          </Link>
                        </li>
                        <li>
                          <Link to='#'>
                            <i className='fas fa-trash-alt' /> Remove.
                          </Link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='add-address'>
                <form action='/' name='general-form'>
                  <h4>Personal Information.</h4>
                  <div className='form-row'>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group '>
                        <input
                          type='text'
                          name='firstname'
                          className='form-control'
                          id='inlineFormInputGroup0'
                          placeholder='First Name'
                        />
                      </div>
                    </div>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group '>
                        <input
                          type='text'
                          name='lastname'
                          className='form-control'
                          id='inlineFormInputGroup1'
                          placeholder='Last Name'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group '>
                        <input
                          type='text'
                          className='form-control'
                          id='inlineFormInputGroup2'
                          placeholder='Company Name'
                        />
                      </div>
                    </div>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group '>
                        <input
                          type='text'
                          name='address'
                          className='form-control'
                          id='inlineFormInputGroup3'
                          placeholder='Address'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group select-control'>
                        <select
                          className='form-control'
                          name='SelectName'
                          id='inlineFormInputGroup4'
                        >
                          <option selected>Select Country</option>
                          <option value={1}>Canada</option>
                          <option value={2}>United Kingdom</option>
                          <option value={3}>United States</option>
                        </select>
                      </div>
                    </div>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group select-control'>
                        <select
                          className='form-control'
                          name='SelectStateName'
                          id='inlineFormInputGroup5'
                        >
                          <option selected>Select State</option>
                          <option value={1}>Alaska</option>
                          <option value={2}>New York</option>
                          <option value={3}>Taxes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group'>
                        <input
                          type='text'
                          name='postcode'
                          className='form-control'
                          id='inlineFormInputGroup7'
                          placeholder='City'
                        />
                      </div>
                    </div>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group'>
                        <input
                          type='text'
                          name='postcode'
                          className='form-control'
                          id='inlineFormInputGroup7'
                          placeholder='Postal Code'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='from-group col-md-6 mb-4'>
                      <div className='input-group'>
                        <input
                          type='text'
                          name='phone'
                          className='form-control'
                          id='inlineFormInputGroup8'
                          placeholder='Phone'
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='btn btn-secondary swipe-to-top'
                  >
                    Add Address.
                  </button>
                </form>
              </div>
              {/* ............the end..... */}
            </div>
          </div>
        </div>
      </section>
    
      <Main_Footer />
     
     
    </Fragment>
  );
};

export default Shipping_Address;
