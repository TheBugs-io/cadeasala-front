import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const Snackbar = ({ open, message, severity = "success", onClose }) => {
  const snackbarRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (open && snackbarRef.current) {
      snackbarRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={snackbarRef}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      className={`snackbar snackbar-${severity}`}
    >
      <p>{message}</p>
      <button
        ref={closeButtonRef}
        className="close-btn"
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        <FiX size={18} />
      </button>

      <style>{`
        .snackbar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 250px;
          max-width: 90vw;
          padding: 12px 18px;
          color: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          animation: slideIn 0.3s ease forwards;
          z-index: 9999;
          outline: none;
        }
        .snackbar-success {
          background-color: #1CBC71;
        }
        .snackbar-error {
          background-color: #D70F49;
        }
        .close-btn {
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0;
          margin-left: 12px;
          display: flex;
          align-items: center;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Snackbar;