const InvoiceSummary = ({ subtotal, tax, total }) => {
  return (
    <div className="text-right mt-2 space-y-2">
      <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
      <div>Tax: ₹{tax.toFixed(2)}</div>
      <div className="font-bold text-lg">Total: ₹{total.toFixed(2)}</div>
    </div>
  );
};

export default InvoiceSummary;
