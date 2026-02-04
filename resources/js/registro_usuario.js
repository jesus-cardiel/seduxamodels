import { notifySuccess, notifyError } from './helpers/swal.js';

/* ===== CONFIG BACKEND =====
   Cambia SOLO estas 2 rutas si tu backend usa otras:
*/
const API_REGISTER = '/vip/register';  // Web route (POST)
const REDIRECT_VIP = '/home';                // Redirigir directamente al dashboard logeado

const formVip = document.getElementById('formVip');

const nick = document.getElementById('nick');
const edad = document.getElementById('edad');

const sexoBox = document.getElementById('sexoBox');
const sexoHead = document.getElementById('sexoHead');
const sexoList = sexoBox.querySelector('.select-list');
const sexoVal = document.getElementById('sexoVal');

const phoneTrigger = document.getElementById('phoneTrigger');
const phoneText = document.getElementById('phoneText');
const phoneCode = document.getElementById('phoneCode');
const phoneNumber = document.getElementById('phoneNumber');

const email = document.getElementById('email');
const pass = document.getElementById('pass');

const btnCreate = document.getElementById('btnCreate');
const togglePass = document.getElementById('togglePass');

const chk1 = document.getElementById('chk1');
const chkAccept = document.getElementById('chkAccept');
const rules = document.querySelectorAll('.rule');

const modal = document.getElementById('phoneModal');
const list = document.getElementById('countryList');
const search = document.getElementById('searchCountry');
const closeModalBtn = document.getElementById('closeModalBtn');

const msgBox = document.getElementById('msg');

let countries = [];
let phoneCodesReady = false;

/* ===== Helpers ===== */
/* ===== Helpers ===== */
const norm = s => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

function showMsg(text, kind) {
    msgBox.textContent = text || '';
    msgBox.className = 'msg show ' + (kind || '');
}

function hideMsg() {
    msgBox.textContent = '';
    msgBox.className = 'msg';
}
function closeSexoList() { sexoList.style.display = 'none'; }

function showError(fieldId, text) {
    const el = document.getElementById('error-' + fieldId);
    if (el) {
        el.textContent = text;
        el.classList.add('show');
    }
}
function clearError(fieldId) {
    const el = document.getElementById('error-' + fieldId);
    if (el) {
        el.textContent = '';
        el.classList.remove('show');
    }
}

function resetAfterEdad() {
    // reset sexo
    sexoHead.textContent = 'Selecciona';
    sexoVal.value = '';
    closeSexoList();

    // reset whatsapp
    phoneText.textContent = 'Código';
    phoneCode.value = '';
    phoneTrigger.classList.add('disabled');
    phoneNumber.value = '';
    phoneNumber.disabled = true;

    // reset email/pass/checks/buttons
    email.value = '';
    email.disabled = true;
    email.readOnly = true;

    pass.value = '';
    pass.disabled = true;
    pass.readOnly = true;

    chk1.checked = false; chk1.disabled = true;
    chkAccept.checked = false; chkAccept.disabled = true;
    rules.forEach(r => { r.checked = false; r.disabled = true; });

    btnCreate.disabled = true;

    hideMsg();
}

/* ===== Nick -> habilita Edad ===== */
edad.disabled = true;
nick.addEventListener('input', () => {
    const ok = nick.value.trim().length >= 2;
    edad.disabled = !ok;
    if (!ok) {
        edad.value = '';
        sexoBox.classList.add('disabled');
        resetAfterEdad();
    }
});

/* ===== Carga phone-codes.json (SIN cache) ===== */
fetch('/js/phone-codes.json', { cache: 'no-store' })
    .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
    })
    .then(d => {
        countries = Array.isArray(d) ? d : [];
        phoneCodesReady = true;
    })
    .catch(() => { phoneCodesReady = false; });

/* ===== EDAD: solo números + rango 18-85 ===== */
edad.addEventListener('input', () => {
    // deja escribir sin “bloqueo”: solo limpia lo no numérico
    edad.value = edad.value.replace(/\D/g, '').slice(0, 2);
});
edad.addEventListener('blur', () => {
    const n = parseInt(edad.value, 10);
    const ok = (n >= 18 && n <= 85);

    resetAfterEdad();

    if (!ok) {
        showError('edad', 'La edad debe estar entre 18 y 85 años.');
        edad.value = '';
        sexoBox.classList.add('disabled');
        return;
    }
    clearError('edad');

    sexoBox.classList.remove('disabled');
});

/* ===== SEXO ===== */
sexoHead.onclick = () => {
    if (!sexoBox.classList.contains('disabled')) {
        sexoList.style.display = (sexoList.style.display === 'block') ? 'none' : 'block';
    }
};
sexoList.querySelectorAll('div').forEach(opt => {
    opt.onclick = () => {
        sexoHead.textContent = opt.textContent;
        sexoVal.value = opt.textContent;
        closeSexoList();
        phoneTrigger.classList.remove('disabled');
    };
});
document.addEventListener('click', (e) => {
    if (!sexoBox.contains(e.target)) closeSexoList();
});

/* ===== MODAL ===== */
function openModal() {
    if (phoneTrigger.classList.contains('disabled')) return;

    modal.classList.add('open');
    search.value = '';
    renderCountries('');
    setTimeout(() => search.focus(), 50);

    if (!history.state || history.state.__vipModal !== true) {
        history.pushState({ __vipModal: true }, '');
    }
}
function closeModal(fromPopstate) {
    modal.classList.remove('open');
    if (!fromPopstate && history.state && history.state.__vipModal === true) {
        history.back();
    }
}
window.addEventListener('popstate', () => {
    if (modal.classList.contains('open')) closeModal(true);
});
phoneTrigger.onclick = openModal;
closeModalBtn.onclick = () => closeModal(false);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(false); });

function renderCountries(q) {
    list.innerHTML = '';

    if (!phoneCodesReady) {
        const d = document.createElement('div');
        d.className = 'country-empty';
        d.textContent = 'No se pudo cargar phone-codes.json';
        list.appendChild(d);
        return;
    }

    const raw = (q || '').trim();
    const Q = norm(raw);
    const Qcode = raw.replace(/\s/g, '').replace('+', '');

    const res = countries.filter(c => {
        const cname = norm(c.country || c.name || '');
        const ccodeRaw = (c.code || c.dial_code || '').toString().trim();
        const ccode = ccodeRaw.replace('+', '');
        if (!Q && !Qcode) return true;
        if (Q && cname.startsWith(Q)) return true;
        if (Qcode && ccode.startsWith(Qcode)) return true;
        return false;
    });

    if (res.length === 0) {
        const d = document.createElement('div');
        d.className = 'country-empty';
        d.textContent = 'Sin resultados';
        list.appendChild(d);
        return;
    }

    res.forEach(c => {
        const country = (c.country || c.name || '').toString().trim();
        const code = (c.code || c.dial_code || '').toString().trim();

        const row = document.createElement('div');
        row.className = 'country-item';
        row.innerHTML = `<span class="name">${country}</span><span class="code">${code}</span>`;
        row.onclick = () => {
            phoneText.textContent = `${country} ${code}`;
            phoneCode.value = code;

            phoneNumber.disabled = false;
            phoneNumber.focus();

            closeModal(false);
        };
        list.appendChild(row);
    });
}
search.addEventListener('input', () => renderCountries(search.value));

/* ===== Numero WhatsApp ===== */
phoneNumber.addEventListener('input', () => {
    phoneNumber.value = phoneNumber.value.replace(/\D/g, '').slice(0, 15);
    const ok = phoneCode.value && phoneNumber.value.length >= 6;
    email.disabled = !ok;
    email.readOnly = !ok;
});

/* ===== Email -> Pass ===== */
email.addEventListener('focus', () => { if (!email.disabled) email.readOnly = false; });
email.addEventListener('input', () => {
    const ok = /.+@.+\..+/.test(email.value);
    pass.disabled = !ok;
    pass.readOnly = !ok;
});
email.addEventListener('blur', () => {
    const ok = /.+@.+\..+/.test(email.value);
    if (!ok && email.value.trim().length > 0) {
        showError('email', 'Correo electrónico inválido');
    } else {
        clearError('email');
    }
});

/* ===== Pass -> Checks ===== */
pass.addEventListener('focus', () => { if (!pass.disabled) pass.readOnly = false; });
pass.addEventListener('input', () => {
    const ok = pass.value.length >= 6;
    chk1.disabled = !ok;
    rules.forEach(r => r.disabled = !ok);
    chkAccept.disabled = !ok;
});

/* ===== Checks -> botón ===== */
document.querySelectorAll('.checks input').forEach(c => {
    c.onchange = () => {
        const allChecked = [chk1, chkAccept, ...rules].every(i => i.checked);
        btnCreate.disabled = !allChecked;
    };
});

/* ===== OJO ===== */
togglePass.onclick = () => pass.type = pass.type === 'password' ? 'text' : 'password';

/* ===== SUBMIT -> BACKEND (correo) + redirect VIP ===== */
formVip.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (btnCreate.disabled) return;

    hideMsg();

    const payload = {
        nick: (nick.value || '').trim(),
        edad: parseInt(edad.value, 10),
        sexo: (sexoVal.value || '').trim(),
        country_code: (phoneCode.value || '').trim(),
        whatsapp: (phoneNumber.value || '').trim(),
        email: (email.value || '').trim(),
        password: (pass.value || '').toString(),
        accept: true
    };

    // Validaciones individuales finales
    let hasError = false;

    if (!payload.nick) { showError('nick', 'Requerido'); hasError = true; } else clearError('nick');
    if (!payload.edad) { showError('edad', 'Requerido'); hasError = true; } else clearError('edad');

    // WhatsApp check
    if (!payload.country_code || payload.whatsapp.length < 6) {
        showError('whatsapp', 'Número incompleto');
        hasError = true;
    } else clearError('whatsapp');

    // Email check
    if (!payload.email) { showError('email', 'Requerido'); hasError = true; } else clearError('email');

    // Pass check
    if (payload.password.length < 6) { showError('pass', 'Mínimo 6 caracteres'); hasError = true; } else clearError('pass');

    if (hasError) return;

    btnCreate.disabled = true;

    try {
        const r = await fetch(API_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(payload)
        });

        if (!r.ok) {
            let t = 'Error al registrar.';
            try {
                const j = await r.json();
                if (j && (j.detail || j.message)) t = (j.detail || j.message);
            } catch (_) { }
            notifyError('Error', t);
            btnCreate.disabled = false;
            return;
        }

        notifySuccess('Cuenta creada', 'Redirigiendo...');
        setTimeout(() => location.href = REDIRECT_VIP, 1500);

    } catch (_) {
        notifyError('Error de conexión', 'No se pudo conectar al servidor. Intenta de nuevo.');
        btnCreate.disabled = false;
    }
});
