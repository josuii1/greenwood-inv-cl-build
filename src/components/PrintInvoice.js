import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PrintInvoice({ invoiceId }) {
  const navigate = useNavigate();

  function goToPrint() {
    navigate(`/printinvoice/${invoiceId}`)
  }
  return <Button variant="success" onClick={goToPrint}>Print</Button>;
}

export default PrintInvoice;
