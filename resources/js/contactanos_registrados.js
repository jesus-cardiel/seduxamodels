import { notifyError } from './helpers/swal.js';
import Swal from 'sweetalert2';

const email = document.getElementById('email');
const phone = document.getElementById('phone');
const reason = document.getElementById('reason');
const chk1 = document.getElementById('chk1');
const btnSend = document.getElementById('btnSend');

if (email) {
    email.addEventListener('input', () => {
        phone.disabled = !/.+@.+\..+/.test(email.value);
    });
}

if (phone) {
    phone.addEventListener('input', () => {
        phone.value = phone.value.replace(/\D/g, '');
        reason.disabled = phone.value.length < 6;
    });
}

if (reason) {
    reason.addEventListener('input', () => {
        chk1.disabled = reason.value.length < 10;
    });
}

if (chk1) {
    chk1.addEventListener('change', () => {
        btnSend.disabled = !chk1.checked;
    });
}

if (btnSend) {
    btnSend.addEventListener('click', async (e) => {
        if (btnSend.disabled) return;
        e.preventDefault();

        btnSend.disabled = true;
        btnSend.innerText = 'ENVIANDO...';

        const formData = {
            email: email.value,
            phone: phone.value,
            reason: reason.value
        };

        try {
            const response = await fetch('/contacto-enviar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: '¡Enviado!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#b92cff'
                }).then(() => {
                    window.location.href = '/';
                });
            } else {
                notifyError('Error', data.message || 'Hubo un error al enviar el mensaje');
                btnSend.disabled = false;
                btnSend.innerText = 'ENVIAR MENSAJE';
            }
        } catch (error) {
            notifyError('Error de conexión', 'No se pudo conectar con el servidor');
            btnSend.disabled = false;
            btnSend.innerText = 'ENVIAR MENSAJE';
        }
    });
}
