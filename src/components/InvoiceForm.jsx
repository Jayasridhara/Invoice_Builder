import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const defaultClient = {
  name: '',
  invoiceNumber: '',
  address: '',
  date: '',
};
const InvoiceForm = ({ client, setClient,setInvoiceError }) => {

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
    const err = 'Invoice number must start with "INV-" followed by at least 5 digits.';
    setError(err);
    setInvoiceError(err);
  } else {
    setError('');
  setInvoiceError('');
  }
};
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Client Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 whitespace-nowrap">
        
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium mb-1">Client Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={client.name}
            onChange={handleChange}
            maxLength={30}
            placeholder="Client Name"
            className="border p-2 rounded print:print-flat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="invoiceNumber" className="font-medium mb-1">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            id="invoiceNumber"
            value={client.invoiceNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="INV-00001"
            maxLength={10}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <ConfirmModal
          isOpen={!!error}
          title="Validation Error"
          message={
            <div className="w-full max-w-sm [white-space:pre-wrap] [overflow-wrap:break-word]">
              {error}
            </div>
          }
          onConfirm={() => setError('')}
          confirmText="OK"
          cancelText=""
        />

        <div className="flex flex-col">
          <label htmlFor="address" className="font-medium mb-1">Client Address</label>
          <input
            type="text"
            name="address"
            id="address"
            maxLength={30}
            value={client.address}
            onChange={handleChange}
            placeholder="Client Address"
            className="border p-2 rounded print:print-flat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="font-medium mb-1">Invoice Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={client.date}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
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