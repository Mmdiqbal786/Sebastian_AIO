import React from "react";

interface ModalProps {
  modalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  modalOpen,
  children,
}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""} p-2`}>{children}</div>
  );
};

export default Modal;
