"use client";

type ConfirmModalProps = {
  description: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
};

export function ConfirmModal({
  description,
  isOpen,
  onCancel,
  onConfirm,
  title
}: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="admin-modal">
      <div className="admin-modal__backdrop" onClick={onCancel} />
      <div
        aria-modal="true"
        className="admin-modal__panel"
        role="dialog"
        aria-labelledby="confirm-modal-title"
      >
        <h3 className="admin-modal__title" id="confirm-modal-title">
          {title}
        </h3>
        <p className="admin-modal__description">{description}</p>
        <div className="admin-modal__actions">
          <button
            className="admin-button admin-button--ghost"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="admin-button admin-button--danger"
            onClick={onConfirm}
            type="button"
          >
            Delete blog
          </button>
        </div>
      </div>
    </div>
  );
}
