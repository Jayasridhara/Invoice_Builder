const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Yes', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-50/70 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className="flex flex-col items-start mb-6">
        {message}
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            {confirmText}
          </button>
          {cancelText && (<button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            {cancelText}
          </button>)}
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;