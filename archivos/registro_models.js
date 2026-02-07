
const realName = document.getElementById('realName');
const nick = document.getElementById('nick');
const age = document.getElementById('age');

const phoneTrigger = document.getElementById('phoneTrigger');
const phoneText = document.getElementById('phoneText');
const phoneCode = document.getElementById('phoneCode');
const phoneNumber = document.getElementById('phoneNumber');

const email = document.getElementById('email');
const pass = document.getElementById('pass');

const btnSelfie = document.getElementById('btnSelfie');
const selfie = document.getElementById('selfie');
const selfieHint = document.getElementById('selfieHint');

const rules = document.querySelectorAll('.rule');
const accept = document.getElementById('accept');
const submit = document.getElementById('submit');

const modal = document.getElementById('modal');
const list = document.getElementById('list');
const close = document.getElementById('close');
const search = document.getElementById('search');

const msg = document.getElementById('msg');

let countries = [];

const norm = s => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
function showMsg(t, kind) {
    msg.textContent = t || '';
    msg.className = 'msg show ' + (kind || '');
}
function hideMsg() {
    msg.textContent = '';
    msg.className = 'msg';
}

/* ===== EDAD 18..50 ===== */
for (let i = 18; i <= 50; i++) {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = String(i);
    age.appendChild(o);
}

/* ===== FLUJO SECUENCIAL ===== */
realName.addEventListener('input', () => {
    const ok = realName.value.trim().length >= 3;
    nick.disabled = !ok;
    if (!ok) { nick.value = ''; }
});

nick.addEventListener('input', () => {
    const ok = nick.value.trim().length >= 3;
    age.disabled = !ok;
    if (!ok) { age.value = ''; phoneTrigger.classList.add('disabled'); }
});

age.addEventListener('change', () => {
    const ok = age.value !== '';
    if (ok) phoneTrigger.classList.remove('disabled');
    else phoneTrigger.classList.add('disabled');
});

/* ===== JSON robusto (3 rutas) ===== */
async function loadPhoneCodes() {
    const paths = ['/js/phone-codes.json', './js/phone-codes.json', 'js/phone-codes.json'];
    let lastErr = null;

    for (const p of paths) {
        try {
            const r = await fetch(p, { cache: 'no-store' });
            if (!r.ok) throw new Error('HTTP ' + r.status + ' (' + p + ')');
            const d = await r.json();
            if (!Array.isArray(d)) throw new Error('JSON inválido (' + p + ')');
            return d;
        } catch (e) {
            lastErr = e;
        }
    }
    throw lastErr || new Error('No se pudo cargar phone-codes.json');
}

function renderCountries(q) {
    list.innerHTML = '';
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
            phoneNumber.readOnly = false;
            phoneNumber.removeAttribute('readonly');
            phoneNumber.focus();

            modal.classList.remove('open');
        };
        list.appendChild(row);
    });
}

(async () => {
    try {
        countries = await loadPhoneCodes();
    } catch (e) {
        showMsg('No carga phone-codes.json. Revisa ruta /js/phone-codes.json (o ./js/...).', 'err');
    }
})();

/* ===== MODAL ===== */
phoneTrigger.addEventListener('click', () => {
    if (phoneTrigger.classList.contains('disabled')) return;
    if (!countries.length) {
        showMsg('No hay lista de países (phone-codes.json no cargó).', 'err');
        return;
    }
    modal.classList.add('open');
    search.value = '';
    renderCountries('');
    setTimeout(() => search.focus(), 50);
});
close.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
search.addEventListener('input', () => renderCountries(search.value));

/* ===== TEL -> EMAIL ===== */
phoneNumber.addEventListener('input', () => {
    phoneNumber.value = phoneNumber.value.replace(/\D/g, '').slice(0, 15);
    const ok = phoneCode.value && phoneNumber.value.length >= 6;
    email.disabled = !ok;
    if (!ok) { email.value = ''; pass.value = ''; pass.disabled = true; }
});

/* ===== EMAIL -> PASS ===== */
email.addEventListener('input', () => {
    const ok = /.+@.+\..+/.test(email.value);
    pass.disabled = !ok;
    if (!ok) { pass.value = ''; }
});

/* ===== PASS -> SELFIE ===== */
pass.addEventListener('input', () => {
    const ok = pass.value.length >= 6;
    btnSelfie.disabled = !ok;
    selfie.disabled = !ok;
    if (!ok) {
        selfie.value = '';
        btnSelfie.classList.remove('ok');
        btnSelfie.textContent = 'Tomar selfie';
        selfieHint.textContent = 'Se solicitará permiso de cámara.';
        rules.forEach(r => { r.checked = false; r.disabled = true; });
        accept.checked = false; accept.disabled = true;
        submit.disabled = true;
    }
});

/* ===== SELFIE BONITO ===== */
btnSelfie.addEventListener('click', () => {
    if (btnSelfie.disabled) return;
    selfie.click();
});
selfie.addEventListener('change', () => {
    const ok = selfie.files && selfie.files.length === 1;
    if (ok) {
        btnSelfie.textContent = 'Cargado ✅';
        btnSelfie.classList.add('ok');
        selfieHint.textContent = (selfie.files[0].name || 'Selfie cargada');

        rules.forEach(r => r.disabled = false);
        accept.disabled = false;
    } else {
        btnSelfie.textContent = 'Tomar selfie';
        btnSelfie.classList.remove('ok');
    }
});

/* ===== CHECKS -> BOTÓN ===== */
document.querySelectorAll('.checks input').forEach(c => {
    c.addEventListener('change', () => {
        const allChecked = [...rules, accept].every(i => i.checked);
        submit.disabled = !allChecked;
    });
});

/* ===== SUBMIT (demo) ===== */
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (submit.disabled) return;
    hideMsg();
    showMsg('Enviado para revisión.', 'ok');
});