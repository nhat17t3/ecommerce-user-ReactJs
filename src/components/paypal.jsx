import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function PayPal(props) {
  const { total } = props
  const value = Number(total/23000.0).toFixed(2);
  const dispatch = useDispatch();

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
        },
        onError: (err) => {
          setError(err);
          console.error("ERROR", err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paidFor) {
    return <div>Thanks for making the purchase.</div>;
  }

  if (error) {
    return <div>Error in processing order. Please Retry again</div>;
  }

  return (
    <>
      <div ref={paypalRef} />
    </>
    
  );
}

export default PayPal;
