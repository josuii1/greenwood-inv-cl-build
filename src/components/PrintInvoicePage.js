import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import logo from "./logo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "react-bootstrap";

function PrintInvoicePage({ invoiceId }) {
  const token = localStorage.getItem("token");
  const params = useParams();
  const invoiceNumber = params.invoiceNumber;

  const [detailInvoice, setDetailInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(`/invoices/details/${invoiceNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch invoice: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data[0]);
        setDetailInvoice(data[0]);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    if (token) {
      fetchInvoiceDetails();
    }
  }, [invoiceNumber, token]);

  function printDivAsPDF() {
    const divElement = document.getElementById("printInvoiceContainer");

    html2canvas(divElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Convert px to mm
      const imgWidth = 794 * 0.264583; // 1 px = 0.264583 mm
      const imgHeight = 1123 * 0.264583;

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      const posX = (pageWidth - width) / 2;
      const posY = (pageHeight - height) / 2;

      pdf.addImage(imgData, "PNG", posX, posY, width, height);

      pdf.save(`invoice${detailInvoice.invoiceNumber}.pdf`);
    });
  }

  function printDivAsPDFToHtml() {
    const divElement = document.getElementById("printInvoiceContainer");

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.html(divElement, {
      callback: function (doc) {
        doc.addFont("Helvetica", "bold");
        doc.save(`invoice${detailInvoice.invoiceNumber}.pdf`);
      },
      x: 0,
      y: 0,
      width: 210, // A4 page width in mm
      windowWidth: 794, // Window width in pixels (to match your div's width)
      height: 297, // A4 page height in mm
      windowHeight: 1123, // Keep as is or adjust if needed
    });
  }

  function PrintElem() {
    var mywindow = window.open("", "PRINT", "height=1123,width=794");

    mywindow.document.write("<html><head><title>" + document.title);
    mywindow.document.write("</title>");
    mywindow.document.write("<style>");
    mywindow.document.write(
      ".invoice {width: 794px; height: 1000px;background-color: rgb(255, 255, 255);border: 2px solid black;display: flex;flex-direction: column;padding: 2em;}.invoice-header {display: flex;flex-direction: row;width: -webkit-fill-available;}.invoice-logo {width: 150px;height: 150px;margin-right: auto;}.invoice-header-header {display: flex;flex-direction: column;background-color: #5a8c42;color: white;padding: 1em;border-radius: 4px;height: min-content;align-items: flex-end;}.invoice-header-title {font-size: 26px;font-weight: 600;text-transform: uppercase;line-height: 2;}.invoice-header-text {font-size: 22px;font-weight: 600;}.invoice-info {display: flex;flex-direction: column;padding: 1em;font-size: 20px;font-weight: 500;color: white;margin: 1em;background: #5a8c42;}.invoice-body {display: flex;flex-direction: column;padding: 1em;font-size: 20px;margin: 1em;border: 2px solid black;height: -webkit-fill-available;}"
    );

    mywindow.document.write("</style>");
    mywindow.document.write("</head><body >");
    mywindow.document.write(
      document.getElementById("printInvoiceContainer").innerHTML
    );
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    return true;
  }

  return (
    <>
      <div className="invoice-container">
        <div className="invoice" id="printInvoiceContainer">
          <div className="invoice-header">
            <img src={logo} alt="Logo" className="invoice-logo" />
            <div className="invoice-header-header">
              <span
                className="invoice-header-title"
                style={{ fontWeight: 600 }}
              >
                Greenwood Landscape Maintenacne
              </span>
              <span className="invoice-header-text">
                Hugo Ramirez (503)-508-4845
              </span>
              <span className="invoice-header-text">Woodburn, OR</span>
            </div>
          </div>
          <div className="invoice-info">
            {detailInvoice ? (
              <>
                <span>Invoice #{detailInvoice.invoiceNumber}</span>
                <span>Invoice Date: {detailInvoice.invoiceDate}</span>
                <span>Bill To: {detailInvoice.customerName}</span>
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="invoice-body">
            {detailInvoice ? (
              <>
                <span>{detailInvoice.invoiceNotes}</span>
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="invoice-footer">
            {detailInvoice ? (
              <>
                <span>Total Amount: ${detailInvoice.amount}</span>
              </>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
      <div className="print-button-holder">
        <Button onClick={printDivAsPDF} variant="success" size="lg">
          PRINT
        </Button>
      </div>
    </>
  );
}

export default PrintInvoicePage;
