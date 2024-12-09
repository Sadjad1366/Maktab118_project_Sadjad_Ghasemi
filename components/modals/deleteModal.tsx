import React from "react";

interface IDeleteModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

const DeleteModal: React.FC<IDeleteModal> = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "بلی",
  cancelText = "خیر",
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
        <div className="flex justify-center">{children}</div>
        <div className="flex justify-center gap-x-10 mt-4">
        {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded mr-2"
          >
            {cancelText}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
