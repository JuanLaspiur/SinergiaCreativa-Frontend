import React from "react";

interface ModalProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="modal fade show animate__animated animate__fadeIn mt-4"
      style={{ display: "block" }}
      tabIndex={-1}
      onClick={handleCloseModal}
    >
      <div className="modal-dialog modal-dialog-centered d-flex justify-content-center animate__animated animate__zoomIn">
        <div className="modal-content" style={{ backgroundColor: "#f8f9fa", borderRadius: "0.5rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <div className="modal-header animate__animated animate__bounceIn">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body animate__animated animate__fadeIn">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
