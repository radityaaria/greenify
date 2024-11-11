import React from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';

interface ModalDeleteProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
  itemType: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onCancel, onDelete, itemType }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this {itemType}?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
          >
            <MdOutlineDeleteForever className="mr-1 text-xl" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
