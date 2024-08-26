import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormGroup } from "react-bootstrap";

const InvoiceModal = ({ invoiceId }) => {
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [detailInvoice, setDetailInvoice] = useState(null);
  const [updatedInvoice, setUpdatedInvoice] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModal = async () => {
    try {
      const response = await fetch(`/invoices/details/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      if (!text) {
        throw new Error("Empty response received");
      }

      const data = JSON.parse(text);
      setDetailInvoice(data);
      setUpdatedInvoice(data[0]);
      console.log("State after setDetails:", data[0].paymentStatus);

      handleShow();
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "on") {
      e.target.value = "off";
      setUpdatedInvoice({
        ...updatedInvoice,
        [e.target.name]: 1,
      });
    } else if (e.target.value === "off") {
      e.target.value = "on";
      setUpdatedInvoice({
        ...updatedInvoice,
        [e.target.name]: 0,
      });
    } else {
      setUpdatedInvoice({
        ...updatedInvoice,
        [e.target.name]: e.target.value,
      });
    }
  };

  function reloadPage() {
    window.location.reload();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert invoiceNumber to an integer
      const dataToSend = {
        ...updatedInvoice,
        invoiceNumber: parseInt(updatedInvoice.invoiceNumber, 10),
        id: parseInt(updatedInvoice.id, 10),
        paymentStatus: parseInt(updatedInvoice.paymentStatus, 10),
        amount: parseFloat(updatedInvoice.amount),
      };

      console.log("Sending data:", dataToSend); // Log the data being sent

      const response = await fetch(`invoices/update/${invoiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Updated Invoice:" + result);
        handleClose();
        reloadPage();
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={openModal} variant="primary">
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {detailInvoice
              ? `Invoice ${detailInvoice[0].invoiceNumber}`
              : "Loading..."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updatedInvoice ? (
            <>
              <Form onSubmit={handleSubmit} className="create-invoice">
                <FormGroup controlId="formBasicEmail">
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="invoiceNumber"
                    value={updatedInvoice.invoiceNumber}
                    onChange={handleChange}
                    disabled
                  />
                  <Form.Label>Invoice Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="invoiceDate"
                    value={updatedInvoice.invoiceDate}
                    onChange={handleChange}
                  />
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={updatedInvoice.customerName}
                    onChange={handleChange}
                  />
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={updatedInvoice.amount}
                    onChange={handleChange}
                  />
                  <Form.Label>Invoice Notes:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="invoiceNotes"
                    value={updatedInvoice.invoiceNotes}
                    onChange={handleChange}
                  />
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    name="paymentStatus"
                    label="Paid"
                    checked={updatedInvoice.paymentStatus === 1}
                    onChange={handleChange}
                    style={{ marginTop: 16, marginBottom: 16 }}
                  />
                  <Form.Control
                    type="hidden"
                    name="id"
                    value={updatedInvoice.id}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button variant="primary" type="submit">
                  UPDATE
                </Button>
              </Form>
            </>
          ) : (
            "Loading..."
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="invoice-modal-button"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InvoiceModal;
