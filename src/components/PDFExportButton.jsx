import React from "react";
import generatePDF from "../utils/generatePDF";


const PDFExportButton = ({ invoiceRef }) => {
    
  return (
    <div className="mt-6 text-right">
      <button
        onClick={() => generatePDF(invoiceRef)}
        style={{
             padding: "0.5rem 1rem",
    backgroundColor: '#16a34a', 
    color: '#ffffff',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = '#15803d')} 
  onMouseOut={(e) => (e.target.style.backgroundColor = '#16a34a')}
      >
        Download as PDF
      </button>
    </div>
  );
};

export default PDFExportButton;
