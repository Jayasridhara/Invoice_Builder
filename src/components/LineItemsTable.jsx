import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
const LineItemsTable = ({ items, setItems }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const handleClearAll = () => setShowClearConfirm(true);

  const confirmClearAll = () => {
    setItems([]);
    setShowClearConfirm(false);
  };

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
              
              onClick={() => confirmDelete(i)}
              className="mt-4 sm:mt-0 text-red-500 hover:text-red-700 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <div className='flex align-center justify-center gap-10'>
        <button
        data-html2canvas-ignore="true"
        onClick={addItem}
        className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        + Add Item
      </button>
        <button
        data-html2canvas-ignore="true"
        onClick={handleClearAll}
        className="mt-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Clear All Items
      </button>
      </div>
          <ConfirmModal
        isOpen={showConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onConfirm={removeItem}
        onCancel={() => setShowConfirm(false)}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      <ConfirmModal
        isOpen={showClearConfirm}
        title="Delete all items?"
        message="Are you sure you want to clear all items?"
        onConfirm={confirmClearAll}
        onCancel={() => setShowClearConfirm(false)}
        confirmText="Yes, Clear All"
        cancelText="Cancel"
      />

    </div>
    
  );
};

export default LineItemsTable;
