// import axios from 'axios';
// import uuid from 'uuid';
// import {
//   ADDSHIPPINGADDRESS_SUCCESS,
//   ADDSHIPPINGADDRESS_FAIL,
//   REMOVE_MESSAGE,
//   UPDATESHIPPINGADDRESS_SUCCESS,
//   UPDATESHIPPINGADDRESS_FAIL,
//   ADDORDER_SUCCESS,
//   ADDORDER_FAIL
// } from './types';

// export const addOrder = ({
//   billing_city,
//   billing_country,
//   billing_firstname,
//   billing_lastname,
//   billing_phone,
//   billing_postcode,
//   billing_state,
//   billing_street_address,
//   billing_suburb,
//   billing_zone,
//   billing_zone_id,
//   comments,
//   coupon_amount,
//   coupons,
//   email,
//   customers_id,
//   customers_name,
//   customers_telephone,
//   delivery_city,
//   delivery_country,
//   delivery_country_id,
//   delivery_firstname,
//   delivery_lastname,
//   delivery_phone,
//   delivery_postcode,
//   delivery_state,
//   delivery_street_address,
//   delivery_suburb,
//   delivery_zone,
//   delivery_zone_id,
//   delivery_cost,
//   delivery_time,
//   is_coupon_applied,
//   language_id,
//   latitude,
//   longitude,
//   nonce,
//   packing_charge_tax,
//   payment_method,
//   currency_code,
//   products,
//   productsTotal,
//   shipping_cost,
//   shipping_method,
//   tax_zone_id,
//   totalPrice,
//   total_tax
// }) => async dispatch => {
//   const body = JSON.stringify({
//     billing_city,
//     billing_country,
//     billing_firstname,
//     billing_lastname,
//     billing_phone,
//     billing_postcode,
//     billing_state,
//     billing_street_address,
//     billing_suburb,
//     billing_zone,
//     billing_zone_id,
//     comments,
//     coupon_amount,
//     coupons,
//     email,
//     customers_id,
//     customers_name,
//     customers_telephone,
//     delivery_city,
//     delivery_country,
//     delivery_country_id,
//     delivery_firstname,
//     delivery_lastname,
//     delivery_phone,
//     delivery_postcode,
//     delivery_state,
//     delivery_street_address,
//     delivery_suburb,
//     delivery_zone,
//     delivery_zone_id,
//     delivery_cost,
//     delivery_time,
//     is_coupon_applied,
//     language_id,
//     latitude,
//     longitude,
//     nonce,
//     packing_charge_tax,
//     payment_method,
//     currency_code,
//     products,
//     productsTotal,
//     shipping_cost,
//     shipping_method,
//     tax_zone_id,
//     totalPrice,
//     total_tax
//   });
//   try {
//     if (body === null) {
//       dispatch({
//         type: ADDORDER_FAIL,
//         payload: 'error occur in order data'
//       });

//       setTimeout(() => dispatch({ type: REMOVE_MESSAGE }), 3000);
//     } else {
//       dispatch({
//         type: ADDORDER_SUCCESS,
//         payload: body
//       });

//       setTimeout(() => dispatch({ type: REMOVE_MESSAGE }), 3000);
//     }
//   } catch (err) {
//     console.error(err);

//     dispatch({
//       type: ADDORDER_FAIL,
//       payload: 'server error'
//     });
//   }
// };
