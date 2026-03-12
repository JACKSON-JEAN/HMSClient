import { Trash2 } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

interface DeleteProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const Delete: React.FC<DeleteProps> = ({ onClose, onConfirm, title }) => {
  const confirmHandler = () => {
    onConfirm();
    onClose();
  };
  
  return createPortal (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-30 flex justify-center items-start pt-24 bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] bg-white border shadow-md rounded-md p-4"
      >
        <div className="text-center mb-3">
          <div className="inline-flex bg-red-50 p-2 text-red-600 rounded-full">
            <Trash2 size={18} />
          </div>

          <p className="font-semibold text-lg mt-2">Delete</p>
          <p className="text-gray-600">
            Are you sure you want to delete
          </p>
          <p className="font-medium text-gray-800">"{title}"?</p>
        </div>

        <div className="flex justify-center gap-4 mt-3">
          <button
            onClick={confirmHandler}
            className="bg-red-600 hover:bg-red-500 text-white shadow-md rounded-sm py-1 px-4"
          >
            Confirm
          </button>

          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-black/10 text-gray-700 shadow-md rounded-sm py-1 px-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Delete;
