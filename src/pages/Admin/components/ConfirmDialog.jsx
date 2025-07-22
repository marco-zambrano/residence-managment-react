import { X, AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "bg-red-600 hover:bg-red-700",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate-fade-in-up">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-600 mt-2">{message}</p>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded-lg text-white transition-colors shadow-sm ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
