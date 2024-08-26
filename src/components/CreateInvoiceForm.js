import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateInvoiceForm() {
  //get current invoice number
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState(0); // State for response message

  useEffect(() => {
    fetch("/invoices/create/currentnumber", {})
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        if (!text) {
          throw new Error("Empty response received");
        }
        return JSON.parse(text);
      })
      .then((data) => {
        setNextInvoiceNumber(data);
        console.log(nextInvoiceNumber);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "", // Keep it as a string initially for input, will convert to int before sending
    customerName: "",
    invoiceDate: "",
    invoiceNotes: "",
    amount: "",
  });

  const [responseMessage, setResponseMessage] = useState(""); // State for response message

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert invoiceNumber to an integer
      const dataToSend = {
        ...invoiceData,
        invoiceNumber: nextInvoiceNumber + 1,
      };

      console.log("Sending data:", dataToSend); // Log the data being sent

      const response = await fetch("/invoices/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("Response:", response); // Log the response

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setResponseMessage(
          `Invoice created successfully with ID: ${result.result.insertId}`
        );
        // Reset the form
        setInvoiceData({
          invoiceNumber: "",
          customerName: "",
          invoiceDate: "",
          invoiceNotes: "",
          amount: "",
        });
      } else {
        const error = await response.json();
        setResponseMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="create-invoice">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Invoice Number:</Form.Label>
          <Form.Control
            type="number"
            name="invoiceNumber"
            value={nextInvoiceNumber + 1}
            onChange={handleChange}
            required
            disabled
          />

          <Form.Label>Customer Name:</Form.Label>
          <Form.Control
            type="text"
            name="customerName"
            value={invoiceData.customerName}
            onChange={handleChange}
            required
          />

          <Form.Label>Invoice Date:</Form.Label>
          <Form.Control
            type="date"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleChange}
            required
          />

          <Form.Label>Invoice Notes:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="invoiceNotes"
            value={invoiceData.invoiceNotes}
            onChange={handleChange}
          />
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={invoiceData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="invoice-modal-button">
          Submit
        </Button>
      </Form>

      <div>
        {/* Render the response message */}
        {responseMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            {responseMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default CreateInvoiceForm;
