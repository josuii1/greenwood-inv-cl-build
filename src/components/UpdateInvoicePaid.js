import React from "react";
import { Form, FormGroup, Row } from "react-bootstrap";

function UpdateInvoicePaid({ invoiceId, paymentStatus }) {
  return (
    <Form>
          <Form.Check // prettier-ignore
            type="checkbox"
            id={invoiceId}
            label="Paid"
            checked={paymentStatus}
          />
    </Form>
  );
}

export default UpdateInvoicePaid;
