"use client";

import { useState } from "react";
import { X } from "lucide-react";

export type ErrorPopupProps = {
  message: string;
  onClose?: () => void;
};

export default function ErrorPopup({ message, onClose }: ErrorPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed left-1/2 top-4 z-9999 flex w-[calc(100%-2rem)]
       max-w-md -translate-x-1/2 items-center justify-between gap-3
       rounded-md border border-red-300 bg-red-50 px-4 py-3
       text-sm font-medium text-red-800 shadow-lg"
    >
      <span>{message}</span>

      <button
        type="button"
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        aria-label="Close error message"
        className="shrink-0 rounded p-1 text-red-700 transition-colors
          hover:bg-red-100 hover:text-red-900"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
}