/**
 * Modais usados pela aplicação com Bootstrap 5.
 * Substitui os dialogs nativos alert() e confirm().
 */

let modalSequence = 0;

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value ?? '');
  return element.innerHTML;
}

function createModal({ title, message, type = 'info', confirmLabel = 'OK', cancelLabel = null, danger = false }) {
  const element = document.createElement('div');
  element.className = 'modal fade';
  element.id = `sf-modal-${++modalSequence}`;
  element.tabIndex = -1;
  element.setAttribute('aria-hidden', 'true');

  const icon = {
    error: 'fa-solid fa-circle-xmark text-danger',
    warning: 'fa-solid fa-triangle-exclamation text-warning',
    info: 'fa-solid fa-circle-info text-primary',
    success: 'fa-solid fa-circle-check text-success',
  }[type] || 'fa-solid fa-circle-info text-primary';

  element.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-white border-secondary shadow">
        <div class="modal-header border-secondary">
          <h5 class="modal-title d-flex align-items-center gap-2">
            <i class="${icon}" aria-hidden="true"></i>
            ${escapeHtml(title)}
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body text-white-50">${escapeHtml(message)}</div>
        <div class="modal-footer border-secondary">
          ${cancelLabel ? `<button type="button" class="btn btn-outline-light" data-sf-cancel>${escapeHtml(cancelLabel)}</button>` : ''}
          <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-sf-confirm>${escapeHtml(confirmLabel)}</button>
        </div>
      </div>
    </div>`;

  document.body.appendChild(element);
  return element;
}

function showModal(options, confirmedValue, dismissedValue = false) {
  return new Promise((resolve) => {
    const element = createModal(options);
    const instance = window.bootstrap.Modal.getOrCreateInstance(element);
    let settled = false;

    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    element.querySelector('[data-sf-confirm]')?.addEventListener('click', () => {
      finish(confirmedValue);
      instance.hide();
    });
    element.querySelector('[data-sf-cancel]')?.addEventListener('click', () => {
      finish(dismissedValue);
      instance.hide();
    });
    element.addEventListener('hidden.bs.modal', () => {
      finish(dismissedValue);
      instance.dispose();
      element.remove();
    }, { once: true });

    instance.show();
  });
}

export function sfAlert(message, opts = {}) {
  return showModal({
    title: opts.title || 'Atenção',
    message,
    type: opts.type || 'info',
    confirmLabel: 'OK',
  }, undefined);
}

export function sfConfirm(message, opts = {}) {
  return showModal({
    title: opts.title || 'Confirmar',
    message,
    type: opts.type || 'warning',
    confirmLabel: opts.confirmLabel || 'Confirmar',
    cancelLabel: opts.cancelLabel || 'Cancelar',
    danger: opts.danger || false,
  }, true, false);
}
