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
      <table className="w-full table-auto border border-gray-300 whitespace-nowrap ">
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
      data-html2canvas-ignore="true"
        onClick={addItem}
        className="mt-4 px-4 py-2 rounded" style={{ backgroundColor: '#3b82f6',  color: '#ffffff',}}
      >
        + Add Item
      </button>
    </div>
  );
};

export default LineItemsTable;
