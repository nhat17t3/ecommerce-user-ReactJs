import React, { Fragment } from "react";
import Main_Footer from "../../layouts/footer";
import Main_Header from "../../layouts/header";

const Thankyou = () => {
  return (
    <Fragment>
      <Main_Header />

      <article className="card">
        <div className="card-body">
          <div
            className="mt-4 mx-auto text-center"
            style={{ maxWidth: "600px" }}
          >
            <svg
              width="96px"
              height="96px"
              viewBox="0 0 96 96"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g id="round-check">
                  <circle id="Oval" fill="#D3FFD9" cx={48} cy={48} r={48} />
                  <circle
                    id="Oval-Copy"
                    fill="#87FF96"
                    cx={48}
                    cy={48}
                    r={36}
                  />
                  <polyline
                    id="Line"
                    stroke="#04B800"
                    strokeWidth={4}
                    strokeLinecap="round"
                    points="34.188562 49.6867496 44 59.3734993 63.1968462 40.3594229"
                  />
                </g>
              </g>
            </svg>
            <div className="my-3">
              <h4>Cám ơn bạn đã đặt hàng</h4>
              <p>
                Chúng tôi sẽ tiếp nhận thông tin đơn hàng và sớm giao đến bạn
              </p>
            </div>
          </div>
          <ul className="steps-wrap mx-auto" style={{ maxWidth: "600px" }}>
            <li className="step active">
              <span className="icon">1</span>
              <span className="text">Nhận đơn</span>
            </li>
            {/* step.// */}
            <li className="step ">
              <span className="icon">2</span>
              <span className="text">Xác nhận</span>
            </li>
            {/* step.// */}
            <li className="step ">
              <span className="icon">3</span>
              <span className="text">Giao hàng</span>
            </li>
            {/* step.// */}
          </ul>
          {/* tracking-wrap.// */} <br />
        </div>
      </article>

      <Main_Footer />
    </Fragment>
  );
};

export default Thankyou;
