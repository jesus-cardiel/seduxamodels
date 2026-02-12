
const studioId = document.getElementById('studioId');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const reason = document.getElementById('reason');
const chk1 = document.getElementById('chk1');
const btnSend = document.getElementById('btnSend');

/* EMAIL */
email.addEventListener('input', () => {
    phone.disabled = !/.+@.+\..+/.test(email.value);
});

/* TEL */
phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '');
    reason.disabled = phone.value.length < 6;
});

/* MOTIVO */
reason.addEventListener('input', () => {
    chk1.disabled = reason.value.length < 10;
});

/* CHECK */
chk1.addEventListener('change', () => {
    btnSend.disabled = !chk1.checked;
});

/* ENVÍO */
btnSend.addEventListener('click', () => {
    if (btnSend.disabled) return;

    // Aquí luego se envía:
    // studioId.value (si existe)
    // email.value, phone.value, reason.value

    location.href = 'solicitud-en-revision-studio.html';
});
