"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`admin-toast admin-toast--${type}`} role="status">
      <span>{message}</span>
      <button
        aria-label="Close message"
        className="admin-toast__close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
    </div>
  );
}
