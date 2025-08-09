// src/App.js
import { useEffect, useRef, useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import LineItemsTable from "./components/LineItemsTable";
import InvoiceSummary from "./components/InvoiceSummary";
import PDFExportButton from "./components/PDFExportButton";
import './App.css';
import useStateWithLocalStorage from "./store/useStateWithLocalStorage";
function App() {
  const [client, setClient] = useStateWithLocalStorage('invoice-client', {
  name: '',
  address: '',
  invoiceNumber: '',
  date: ''
});

  const [items, setItems] = useStateWithLocalStorage('invoice-items', []);
  const [taxRate, setTaxRate] =useStateWithLocalStorage('invoice-taxRate', 0.1); // 10%
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
       <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 drop-shadow-md">
      Invoice Builder
    </h1>
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
