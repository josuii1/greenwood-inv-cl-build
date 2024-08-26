import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const DeleteInvoiceButton = ({ invoiceId }) => {
  function reloadPage() {
    window.location.reload();
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/invoices/delete/${invoiceId}`);
      reloadPage()
      // Optionally, you might want to refresh the list of invoices or navigate away
    } catch (error) {
      console.error("There was an error deleting the invoice:", error);
      alert("Failed to delete invoice");
    }
  };

  return (
    <Button onClick={handleDelete} variant="danger">
      Delete
    </Button>
  );
};

export default DeleteInvoiceButton;
