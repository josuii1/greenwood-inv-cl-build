import React from "react";
import { Button } from "react-bootstrap";

function PaymentStatusButton({ paymentStatus }) {
  if (paymentStatus === 1) {
    return <Button variant="success">PAID</Button>;
  } else {
    return <Button variant="danger">UNPAID</Button>;
  }
}

export default PaymentStatusButton;
