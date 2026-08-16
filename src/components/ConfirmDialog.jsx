// src/components/ConfirmDialog.jsx
//
// A single, reusable in-app confirmation modal — replaces the browser's
// native window.confirm() everywhere it was used (Tasks.jsx's self-delete
// and admin-delete, Dashboard.jsx's newsletter-cleanup delete). Added
// 2026-08-16 per explicit feedback on seeing the native browser dialog
// ("Make this a built in website notification inside of using
// javascript... make this overall website change/implementation, modular
// so its scalable") — one shared component/hook, not a copy-pasted modal
// per feature, so any future delete-style action (or any other yes/no
// confirmation) can reuse it instead of reaching for window.confirm again.
//
// Usage — via the useConfirm() hook below, not by rendering <ConfirmDialog>
// directly:
//
//   import { useConfirm } from '../components/ConfirmDialog';
//   ...
//   const confirm = useConfirm();
//   ...
//   async function handleDelete(task) {
//     const confirmed = await confirm({
//       title: 'Delete this task?',
//       message: `Delete "${task.title}"? This can't be undone.`,
//       confirmLabel: 'Delete',
//       danger: true,
//     });
//     if (!confirmed) return;
//     ...
//   }
//
// confirm(...) returns a Promise<boolean> — same call shape as
// window.confirm() had (so swapping call sites was a small, mechanical
// change), but resolves asynchronously once the user actually clicks a
// button in the rendered modal, instead of blocking the whole page like
// the native dialog did.

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import './ConfirmDialog.css';

const ConfirmContext = createContext(null);

// Wrap the app (or any subtree) in this once — see App.jsx. Renders the
// actual modal itself; every useConfirm() call anywhere inside just
// triggers this single shared instance rather than mounting its own.
export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null); // null = hidden, otherwise the options object
  const resolveRef = useRef(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({
        title: options?.title || 'Are you sure?',
        message: options?.message || '',
        confirmLabel: options?.confirmLabel || 'Confirm',
        cancelLabel: options?.cancelLabel || 'Cancel',
        danger: Boolean(options?.danger),
      });
    });
  }, []);

  function handleClose(result) {
    setState(null);
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = null;
    }
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <ConfirmDialog
          title={state.title}
          message={state.message}
          confirmLabel={state.confirmLabel}
          cancelLabel={state.cancelLabel}
          danger={state.danger}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}

// The hook every call site actually uses. Throws a clear error if
// someone calls it outside <ConfirmProvider> (e.g. forgets to wrap
// App.jsx) rather than silently doing nothing.
export function useConfirm() {
  const confirm = useContext(ConfirmContext);
  if (!confirm) {
    throw new Error('useConfirm() must be used inside <ConfirmProvider> (see App.jsx).');
  }
  return confirm;
}

// The actual modal UI — a dark card centered over a dimmed overlay,
// matching the site's existing card/pill visual language (same design
// tokens as Login.jsx/Dashboard.jsx) rather than looking like a generic
// browser alert. Not exported — only ConfirmProvider renders this.
function ConfirmDialog({ title, message, confirmLabel, cancelLabel, danger, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div
        className="confirm-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="confirm-title">{title}</h2>
        {message && <p id="confirm-dialog-message" className="confirm-message">{message}</p>}
        <div className="confirm-actions">
          <button type="button" className="confirm-btn confirm-btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`confirm-btn ${danger ? 'confirm-btn-danger' : 'confirm-btn-primary'}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
