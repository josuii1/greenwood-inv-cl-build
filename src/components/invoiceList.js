import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DeleteInvoiceButton from "./DeleteInvoiceButton";
import InvoiceModal from "./InvoiceModal";
import PrintInvoice from "./PrintInvoice";
import PaymentStatusButton from "./PaymentStatusButton";
import ShowMoreText from "react-show-more-text";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  useEffect(() => {
    fetch("https://greenwoodlm-inv-server-nrdel.ondigitalocean.app/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
        setInvoices(data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
        setError(error.message);
      });
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Invoice Customer</th>
          <th>Invoice Number</th>
          <th>Invoice Date</th>
          <th>Notes</th>
          <th>Amount</th>
          <th>Paid</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((item, rowIndex) => (
          <tr key={rowIndex}>
            <td>{item.customerName}</td>
            <td>{item.invoiceNumber}</td>
            <td>{item.invoiceDate}</td>
            <td>
              <ShowMoreText
                lines={1}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                onClick={executeOnClick}
                expanded={false}
                width={280}
                truncatedEndingComponent={"... "}
              >
                {item.invoiceNotes || "N/A"}
              </ShowMoreText>
            </td>
            <td>{item.amount || "N/A"}</td>
            <td>
              {" "}
              <PaymentStatusButton paymentStatus={item.paymentStatus} />
            </td>
            <td>
              <InvoiceModal invoiceId={item.id} />
            </td>
            <td>
              <PrintInvoice invoiceId={item.id} />
            </td>
            <td>
              <DeleteInvoiceButton invoiceId={item.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InvoiceList;
