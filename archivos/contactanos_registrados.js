
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const reason = document.getElementById('reason');
const chk1 = document.getElementById('chk1');
const btnSend = document.getElementById('btnSend');

email.addEventListener('input', () => {
    phone.disabled = !/.+@.+\..+/.test(email.value);
});

phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '');
    reason.disabled = phone.value.length < 6;
});

reason.addEventListener('input', () => {
    chk1.disabled = reason.value.length < 10;
});

chk1.addEventListener('change', () => {
    btnSend.disabled = !chk1.checked;
});

btnSend.addEventListener('click', () => {
    if (btnSend.disabled) return;
    location.href = 'solicitud-en-revision.html';
});

