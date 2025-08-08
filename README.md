<!-- Develop a responsive invoice generation application using React JS that allows users to create and manage invoices dynamically. Users should be able to enter client information, add multiple line items, calculate totals and taxes automatically, and export the invoice as a PDF. The app should maintain invoice data in the local state and provide a printable layout.
What to do?
Invoice Creation:
Provide input fields for client details such as name, address, invoice number, and date.
Allow users to add multiple items with fields like description, quantity, unit rate, and amount.
Automatically calculate sub total, tax, and grand total as items are added or updated.
Editing and Deletion:
Users should be able to edit or remove any added item before generating the final invoice.
Allow the invoice date and number to be editable as needed.
PDF Export:
Implement functionality to export the invoice as a downloadable and printable PDF.
Ensure the PDF maintains layout integrity and includes all invoice details clearly.
User Features:
Enter and manage client and billing information.
Add/edit/delete line items in the invoice.
Auto-calculate subtotal, tax, and total in real-time.
Export or print the invoice as a PDF.
Techstacks needs to be used:
React JS
TailwindCSS for styling
React Hooks for state management
jsPDF or html2pdf.js for PDF export
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
const InvoiceForm = ({ client, setClient }) => {
const handleChange = (e) => {
const { name, value } = e.target;
setClient({ ...client, [name]: value });
};
return (
<div className="mb-6">
<h2 className="text-xl font-bold mb-4">Client Information</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<input
type="text"
name="name"
value={client.name}
onChange={handleChange}
placeholder="Client Name"
className="border p-2 rounded"
/>
<input
type="text"
name="invoiceNumber"
value={client.invoiceNumber}
onChange={handleChange}
placeholder="Invoice Number"
className="border p-2 rounded"
/>
<input
type="text"
name="address"
value={client.address}
onChange={handleChange}
placeholder="Client Address"
className="border p-2 rounded"
/>
<input
type="date"
name="date"
value={client.date}
onChange={handleChange}
className="border p-2 rounded"
/>
</div>
</div>
);
};
export default InvoiceForm;
const InvoiceSummary = ({ subtotal, tax, total }) => {
return (
<div className="text-right mt-6 space-y-2">
<div>Subtotal: ₹{subtotal.toFixed(2)}</div>
<div>Tax: ₹{tax.toFixed(2)}</div>
<div className="font-bold text-lg">Total: ₹{total.toFixed(2)}</div>
</div>
);
};
export default InvoiceSummary;
const LineItemsTable = ({ items, setItems }) => {
const handleItemChange = (index, field, value) => {
const updatedItems = [...items];
updatedItems[index][field] = field === "description" ? value : parseFloat(value) || 0;
setItems(updatedItems);
};
const addItem = () => {
setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
};
const removeItem = (index) => {
const updatedItems = [...items];
updatedItems.splice(index, 1);
setItems(updatedItems);
};
return (
<div className="mb-6">
<h2 className="text-xl font-bold mb-4">Line Items</h2>
<table className="w-full table-auto border border-gray-300">
<thead>
<tr className="bg-gray-100">
<th className="border p-2">Description</th>
<th className="border p-2">Quantity</th>
<th className="border p-2">Unit Price</th>
<th className="border p-2">Amount</th>
<th className="border p-2">Action</th>
</tr>
</thead>
<tbody>
{items.map((item, index) => (
<tr key={index}>
<td className="border p-2">
<input
type="text"
value={item.description}
onChange={(e) => handleItemChange(index, "description", e.target.value)}
className="w-full border p-1"
/>
</td>
<td className="border p-2">
<input
type="number"
value={item.quantity}
onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
className="w-full border p-1"
/>
</td>
<td className="border p-2">
<input
type="number"
value={item.unitPrice}
onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
className="w-full border p-1"
/>
</td>
<td className="border p-2">
₹{(item.quantity * item.unitPrice).toFixed(2)}
</td>
<td className="border p-2 text-center">
<button
onClick={() => removeItem(index)}
className="text-red-500 hover:underline"
>
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
<button
onClick={addItem}
className="mt-4 px-4 py-2 rounded" style={{ backgroundColor: '#3b82f6',  color: '#ffffff',}}
>
+ Add Item
</button>
</div>
);
};
export default LineItemsTable;
import React from "react";
import generatePDF from "../utils/generatePDF";
const PDFExportButton = ({ invoiceRef }) => {
return (
<div className="mt-6 text-right">
<button
onClick={() => generatePDF(invoiceRef)}
style={{
padding: "0.5rem 1rem",
backgroundColor: '#16a34a', // Tailwind's green-600
color: '#ffffff',
borderRadius: '0.25rem',
cursor: 'pointer',
}}
onMouseOver={(e) => (e.target.style.backgroundColor = '#15803d')} // green-700
onMouseOut={(e) => (e.target.style.backgroundColor = '#16a34a')}
>
Download as PDF
</button>
</div>
);
};
export default PDFExportButton;
// src/utils/generatePDF.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
const generatePDF = async (ref) => {
const element = ref.current;
if (!element) return;
const canvas = await html2canvas(element, {
scale: 2,
useCORS: true
});
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF('p', 'mm', 'a4');
const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
pdf.save(invoice_${Date.now()}.pdf);
};
export default generatePDF;
anything i need to update see the requirement and my code analyse and give code -->