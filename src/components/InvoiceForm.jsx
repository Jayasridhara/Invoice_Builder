import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const defaultClient = {
  name: '',
  invoiceNumber: '',
  address: '',
  date: '',
};
const InvoiceForm = ({ client, setClient }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleReset = () => {
    setClient(defaultClient);
  };

  const invoiceRegex = /^INV-\d{5,}$/;
  const [error, setError] = useState('');
  const handleBlur = (e) => {
  const value = e.target.value;
  if (!invoiceRegex.test(value)) {
    setError('Invoice number must start with "INV-" followed by at least 5 digits.');
  } else {
    setError('');
  
  }
};
  return (
    <div >
      <h2 className="text-xl font-bold mb-4">Client Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 whitespace-nowrap">
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleChange}
          placeholder="Client Name"
          className="border p-2  rounded print:print-flat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
       <input
        type="text"
        name="invoiceNumber"
        value={client.invoiceNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="INV-000001"
        maxLength={10}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <ConfirmModal
        isOpen={!!error}
        title="Validation Error"
        message={<div className="w-full max-w-sm [white-space:pre-wrap] [overflow-wrap:break-word]">{error}</div>}
        onConfirm={() => setError('')}
        confirmText="OK"
        cancelText=""
      />
        <input
          type="text"
          name="address"
          value={client.address}
          onChange={handleChange}
          placeholder="Client Address"
          className="border p-2 rounded print:print-flat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="date"
          name="date"
          value={client.date}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
       <button
        type="button"
        data-html2canvas-ignore="true"
        onClick={handleReset}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
};

export default InvoiceForm;
