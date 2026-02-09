
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const reason = document.getElementById('reason');
const chk1 = document.getElementById('chk1');
const btnSend = document.getElementById('btnSend');

const sentModal = document.getElementById('sentModal');

function openSentModal() {
    sentModal.setAttribute('aria-hidden', 'false');
}

function closeSentModal() {
    sentModal.setAttribute('aria-hidden', 'true');
}

/* EMAIL */
email.addEventListener('input', () => {
    phone.disabled = !/.+@.+\..+/.test(email.value);
    if (phone.disabled) {
        phone.value = "";
        reason.value = "";
        chk1.checked = false;
        reason.disabled = true;
        chk1.disabled = true;
        btnSend.disabled = true;
    }
});

/* TEL */
phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '');
    reason.disabled = phone.value.length < 6;
    if (reason.disabled) {
        reason.value = "";
        chk1.checked = false;
        chk1.disabled = true;
        btnSend.disabled = true;
    }
});

/* MOTIVO */
reason.addEventListener('input', () => {
    chk1.disabled = reason.value.length < 10;
    if (chk1.disabled) {
        chk1.checked = false;
        btnSend.disabled = true;
    }
});

/* CHECK */
chk1.addEventListener('change', () => {
    btnSend.disabled = !chk1.checked;
});

/* ENVÍO */
btnSend.addEventListener('click', () => {
    if (btnSend.disabled) return;

    // Bloquea campos
    email.disabled = true;
    phone.disabled = true;
    reason.disabled = true;
    chk1.disabled = true;
    btnSend.disabled = true;

    // En un futuro el envío se haría aquí vía fetch
    openSentModal();
});

// Cerrar modal
document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close-modal]');
    if (!closeBtn) return;

    e.preventDefault();
    closeSentModal();

    // Si es el botón de ENTENDIDO o el cierre del modal, redirigir al inicio o atrás
    if (e.target.id === 'btnOk' || closeBtn.classList.contains('modalX')) {
        location.href = '/';
    }
});
