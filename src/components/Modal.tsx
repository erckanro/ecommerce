"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-4">{footer}</div>}
      </div>
    </div>,
    modalRoot
  );
}
