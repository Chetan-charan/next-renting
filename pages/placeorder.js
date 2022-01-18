import { useState } from "react";
import Button from "@mui/material/Button";

import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import orderStyles from "../styles/Placeorder.module.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function PlaceOrder() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const customerDetails = useSelector((state) => state.customerDetailsReducer);

  const items = useSelector((state) => state.itemUpdateReducer);
  const amount = useSelector((state) => state.orderAmountReducer);
  const days = useSelector((state) => state.updateDaysReducer);
  const dateRange = useSelector((state) => state.daterangeReducer);

  async function handleOrder() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    setConfirm(true);

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let data = {
      amount: amount,
    };

    fetch(`https://equipment-renting.herokuapp.com/payment/placeorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data2) => setOrderId(data2.id));

    if (orderId) {
      const options = {
        key: "rzp_test_6jxVwaoOnk2gWt",
        currency: "INR",
        amount: data.amount,
        order_id: orderId,
        handler: function (response) {
          fetch(
            `https://equipment-renting.herokuapp.com/payment/verification`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                amount: amount,
                customer: customerDetails,
                items: items,
                dateRange: dateRange,
              }),
            }
          )
            .then((data) => data.json())
            .then((data2) => {
              setPaymentStatus(data2.message);
            });
        },
      };
      const paymentObject = window.Razorpay(options);
      paymentObject.open();
    }
  }
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const [confirm, setConfirm] = useState(false);

  return (
    <div className={orderStyles.paymentcheckout}>
      {paymentStatus ? (
        <div>
          <p>
            {paymentStatus}, your order ID: {orderId}.{" "}
          </p>
          <p>Thanks for shopping with us!! 😀</p>
        </div>
      ) : (
        <div>
          {items.map((item, index) => (
            <div className={orderStyles.itempay} key={index}>
              <div className={orderStyles.itempayable}>{item.name}</div>
              <div>
                ₹ {item.price} X {days}
              </div>
            </div>
          ))}

          <div>
            <p>
              Total Amount Payable:{" "}
              <span style={{ marginLeft: "67px" }}>₹ {amount}</span>
            </p>
            <ColorButton
              style={{ marginLeft: "210px", marginTop: "15px" }}
              onClick={handleOrder}
              variant="contained"
            >
              {confirm ? "PAY" : "confirm"}
            </ColorButton>
          </div>
        </div>
      )}
    </div>
  );
}
