import * as React from "react";
import ReactDOM from "react-dom";

interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      tabIndex={1}
      className="bg-slate-300 opacity-50 absolute w-full h-full top-0 left-0 -z-10"
    />
  );
};

interface ModalContainerProps {
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-50 ">
      {children}
    </div>
  );
};

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen = false, onClose }) => {
  const modalRoot = document.getElementById("modal-root");

  if (!isOpen) return null;

  if (!modalRoot) {
    throw new Error('Missing modal root element with ID "modal-root"');
  }

  return ReactDOM.createPortal(
    <ModalContainer>
      <Overlay onClick={onClose} />
      <div className="bg-[#353535] rounded-lg shadow-2xl w-max min-h-max ">
        {children}
      </div>
    </ModalContainer>,
    modalRoot,
  );
};

export default Modal;
