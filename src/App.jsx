// src/App.js


import { useEffect, useRef, useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import LineItemsTable from "./components/LineItemsTable";
import InvoiceSummary from "./components/InvoiceSummary";
import PDFExportButton from "./components/PDFExportButton";

function App() {
  const [client, setClient] = useState({
    name: "",
    address: "",
    invoiceNumber: "",
    date: ""
  });

  const [items, setItems] = useState([]);
  const [taxRate, setTaxRate] = useState(0.1); // 10%
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const invoiceRef = useRef();

  useEffect(() => {
    const sub = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const taxAmount = sub * taxRate;
    setSubtotal(sub);
    setTax(taxAmount);
    setTotal(sub + taxAmount);
  }, [items, taxRate]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div ref={invoiceRef} className=" p-6 shadow-md"  style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <InvoiceForm client={client} setClient={setClient} />
        <LineItemsTable items={items} setItems={setItems} />
        <InvoiceSummary subtotal={subtotal} tax={tax} total={total} />
      </div>
      <PDFExportButton invoiceRef={invoiceRef} />
    </div>
  );
}

export default App;
