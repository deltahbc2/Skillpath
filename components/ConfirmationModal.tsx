import React from "react";

type Props = {
    open: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
    open,
    title = "Confirmar acción",
    message = "¿Estás seguro? Esta acción no se puede deshacer.",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    loading = false,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

            <div className="relative bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">{message}</p>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="bg-neutral-200 dark:bg-neutral-700 px-4 py-2 rounded-md font-semibold cursor-pointer"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className="bg-neutral-800 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-70 cursor-pointer"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Eliminando..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
