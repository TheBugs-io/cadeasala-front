import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const Snackbar = ({ open, message, severity = "success", onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`snackbar snackbar-${severity}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>
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
        }
        .snackbar-success {
          background-color: #1CBC71;
          color: #fff;
        }
        .snackbar-error {
          background-color: #D70F49;
          color: #fff;
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
