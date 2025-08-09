import React, { useState } from "react";
import generatePDF from "../utils/generatePDF";


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

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black-10 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Please complete the following before downloading:
            </h2>
            <ul className="text-left mb-4 list-disc list-inside text-gray-700">
              {missingFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFExportButton;
