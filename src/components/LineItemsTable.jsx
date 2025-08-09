import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const LineItemsTable = ({ items, setItems }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "description" ? value : parseFloat(value) || 0;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const confirmDelete = (index) => {
    setItemToDelete(index);
    setShowConfirm(true);
  };
 const removeItem = () => {
    const updatedItems = [...items];
    updatedItems.splice(itemToDelete, 1);
    setItems(updatedItems);
    setShowConfirm(false);
    setItemToDelete(null);
  };

  return (
  <div className="my-6 relative">
      <h2 className="text-xl font-bold mb-4">Item Table</h2>

      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-5 gap-4 divide-x divide-gray-300 rounded-t-lg shadow-glow pb-2 mb-2">
        <div className="flex items-center justify-center px-2 py-1 bg-gray-100">Description</div>
        <div className="flex items-center justify-center px-2 py-1 bg-gray-50">Quantity</div>
        <div className="flex items-center justify-center px-2 py-1 bg-gray-100">Unit Price</div>
        <div className="flex items-center justify-center px-2 py-1 bg-gray-50">Amount</div>
        <div className="flex items-center justify-center px-2 py-1 bg-gray-100">Delete</div>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col sm:grid sm:grid-cols-5 gap-4 border p-4 rounded-lg">
            <input
              type="text"
              value={item.description}
              onChange={e => handleItemChange(i, "description", e.target.value)}
              placeholder="Description"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 sm:hidden">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={e => handleItemChange(i, "quantity", e.target.value)}
                placeholder="Qty"
                className="border p-2 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 sm:hidden">Unit Price</label>
              <input
                type="number"
                value={item.unitPrice}
                onChange={e => handleItemChange(i, "unitPrice", e.target.value)}
                placeholder="Unit Price"
                className="border p-2 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4 sm:mt-0 font-semibold flex items-center justify-center">
              ₹{(item.quantity * item.unitPrice).toFixed(2)}
            </div>
            <button
              data-html2canvas-ignore="true"
              onClick={() => confirmDelete(i)}
              className="mt-4 sm:mt-0 text-red-500 hover:text-red-700 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <button
        data-html2canvas-ignore="true"
        onClick={addItem}
        className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        + Add Item
      </button>

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black-10 p-4">
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={removeItem}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineItemsTable;
