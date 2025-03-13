interface ModalProps {
    title: string;
    onClose?: () => void ;
    children: React.ReactNode;
  }
  
  const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
    return (
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  