const InvoiceForm = ({ client, setClient }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  return (
    <div className="">
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
          placeholder="Invoice Number"
          className="border p-2  rounded print:print-flat focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
    </div>
  );
};

export default InvoiceForm;
