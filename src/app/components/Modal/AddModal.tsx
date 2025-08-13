import React from "react";
import Modal from "@/app/components/Modal";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, title, children, loading }) => {
  if (!isOpen) return null;

  return (
    <Modal modalOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-slate-950 bg-opacity-50 flex justify-center items-center z-50">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-black text-white relative px-6 py-4 rounded-lg">
          <div className="text-center relative px-1 py-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <button 
              onClick={onClose} 
              className="absolute top-4 right-2 text-white text-2xl hover:opacity-80 transition-opacity"
            >
              ✕
            </button>
          </div>
          <div className="card-body text-white px-2 py-2">{children}</div>
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white text-lg">
              Loading...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
