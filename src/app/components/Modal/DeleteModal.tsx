import React from "react";
import Modal from "@/app/components/Modal";
import { DeleteModalProps, deleteItemHandler } from "@/app/lib/deleteHelper";

export const DeleteModal = ({
  modalOpen,
  itemType,
  onClose,
  currentItemId,
  apiEndpoint,
  setState,
  toast,
}: DeleteModalProps) => {
  if (!modalOpen) return null;

  const onConfirmDelete = () => {
    deleteItemHandler(currentItemId, itemType, apiEndpoint, setState, onClose, toast);
  };

  return (
    <Modal modalOpen={modalOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 text-white relative bg-black p-6">
          <div className="text-center">
            <h1 className="text-xl font-bold">Confirm Deletion</h1>
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl hover:opacity-80">✕</button>
          </div>
          <div className="text-center mt-4 text-lg">
            <p>Are you sure you want to delete this <b>{itemType}</b>?</p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirmDelete}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
              disabled={currentItemId == null}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
