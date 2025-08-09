import React, { useState } from "react";
import generatePDF from "../utils/generatePDF";
import ConfirmModal from "./ConfirmModal";


const PDFExportButton = ({ invoiceRef }) => {
    
 const [showPopup, setShowPopup] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const handleDownload = () => {
    const client = JSON.parse(localStorage.getItem("invoice-client"));
    const items = JSON.parse(localStorage.getItem("invoice-items"));

    const missing = [];
    if (!client?.name) missing.push("Client Name");
    if (!client?.address) missing.push("Client Address");
    if (!client?.invoiceNumber) missing.push("Invoice Number");
    if (!client?.date) missing.push("Invoice Date");
    
    if (!items || items.length === 0) {
      missing.push("At least one item in the table");
    }
    
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowPopup(true);
      return;
    }

    generatePDF(invoiceRef);
  };

  return (
    <div className="mt-6 text-right relative">
      <button
        onClick={handleDownload}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#16a34a",
          color: "#ffffff",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
      >
        Download as PDF
      </button>

       <ConfirmModal
        isOpen={showPopup}
        title="Please complete the following before downloading:"
        message={<ul className="text-left list-disc list-inside w-full">
      {missingFields.map((f, index) => (
        <li key={index}>{f}</li>
      ))}
    </ul>}
        onConfirm={() => setShowPopup(false)}
        confirmText="Close"
        cancelText=""
      />
    </div>
  );
};

export default PDFExportButton;
