/* ===== CONFIG BACKEND ===== */
const API_REGISTER = '/api/v1/studios/register';
const REDIRECT_AFTER_OK = '/studios/';

const form = document.getElementById('formstudio');

const studioName = document.getElementById('studioName');
const leaderName = document.getElementById('leaderName');

const btnFront = document.getElementById('btnFront');
const btnBack = document.getElementById('btnBack');
const docFront = document.getElementById('docFront');
const docBack = document.getElementById('docBack');

const modelsBox = document.getElementById('modelsBox');
const modelsHead = document.getElementById('modelsHead');
const modelsList = modelsBox.querySelector('.select-list');
const modelsVal = document.getElementById('modelsVal');

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

const norm = s => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
function showMsg(text, kind) {
    msgBox.textContent = text || '';
    msgBox.className = 'msg show ' + (kind || '');
}
function hideMsg() {
    msgBox.textContent = '';
    msgBox.className = 'msg';
}
function closeModelsList() { modelsList.style.display = 'none'; }

/* Reset fuerte */
function hardReset() {
    leaderName.value = '';
    leaderName.disabled = true;

    docFront.value = ''; docBack.value = '';
    docFront.disabled = true; docBack.disabled = true;

    btnFront.textContent = 'Subir anverso';
    btnBack.textContent = 'Subir reverso';
    btnFront.classList.remove('ok');
    btnBack.classList.remove('ok');
    btnFront.disabled = true;
    btnBack.disabled = true;

    phoneText.textContent = 'Código';
    phoneCode.value = '';
    phoneTrigger.classList.add('disabled');
    phoneNumber.value = '';
    phoneNumber.disabled = true;

    modelsHead.textContent = 'Selecciona';
    modelsVal.value = '';
    modelsBox.classList.add('disabled');
    closeModelsList();

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

/* Studio -> líder */
studioName.addEventListener('input', () => {
    const ok = studioName.value.trim().length >= 2;
    if (!ok) { hardReset(); return; }
    leaderName.disabled = false;
});

/* líder -> habilita ANVERSO */
leaderName.addEventListener('input', () => {
    const ok = leaderName.value.trim().length >= 5;

    docFront.disabled = !ok;
    btnFront.disabled = !ok;

    if (!ok) {
        docFront.value = ''; docBack.value = '';
        docFront.disabled = true; docBack.disabled = true;
        btnFront.textContent = 'Subir anverso'; btnFront.classList.remove('ok');
        btnBack.textContent = 'Subir reverso'; btnBack.classList.remove('ok');
        btnBack.disabled = true;

        phoneTrigger.classList.add('disabled');
        phoneText.textContent = 'Código';
        phoneCode.value = '';
        phoneNumber.value = '';
        phoneNumber.disabled = true;
    }
});

/* Botones custom -> abren input real */
btnFront.addEventListener('click', () => { if (!btnFront.disabled) docFront.click(); });
btnBack.addEventListener('click', () => { if (!btnBack.disabled) docBack.click(); });

/* Carga ANVERSO */
docFront.addEventListener('change', () => {
    if (docFront.files && docFront.files.length === 1) {
        btnFront.textContent = 'Cargado ✅';
        btnFront.classList.add('ok');

        docBack.disabled = false;
        btnBack.disabled = false;
    } else {
        btnFront.textContent = 'Subir anverso';
        btnFront.classList.remove('ok');

        docBack.value = '';
        docBack.disabled = true;
        btnBack.textContent = 'Subir reverso';
        btnBack.classList.remove('ok');
        btnBack.disabled = true;

        phoneTrigger.classList.add('disabled');
        phoneText.textContent = 'Código';
        phoneCode.value = '';
        phoneNumber.value = '';
        phoneNumber.disabled = true;
    }
});

/* Carga REVERSO */
docBack.addEventListener('change', () => {
    if (docBack.files && docBack.files.length === 1) {
        btnBack.textContent = 'Cargado ✅';
        btnBack.classList.add('ok');

        phoneTrigger.classList.remove('disabled');
    } else {
        btnBack.textContent = 'Subir reverso';
        btnBack.classList.remove('ok');

        phoneTrigger.classList.add('disabled');
        phoneText.textContent = 'Código';
        phoneCode.value = '';
        phoneNumber.value = '';
        phoneNumber.disabled = true;
    }
});

/* Phone codes */
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

/* Modal */
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

/* WhatsApp -> modelos */
phoneNumber.addEventListener('input', () => {
    phoneNumber.value = phoneNumber.value.replace(/\D/g, '').slice(0, 15);
    const ok = phoneCode.value && phoneNumber.value.length >= 6;
    if (ok) {
        modelsBox.classList.remove('disabled');
    } else {
        modelsBox.classList.add('disabled');
        modelsHead.textContent = 'Selecciona';
        modelsVal.value = '';
        closeModelsList();
    }
});

/* Selector modelos */
modelsHead.onclick = () => {
    if (!modelsBox.classList.contains('disabled')) {
        modelsList.style.display = (modelsList.style.display === 'block') ? 'none' : 'block';
    }
};
modelsList.querySelectorAll('div').forEach(opt => {
    opt.onclick = () => {
        modelsHead.textContent = opt.textContent;
        modelsVal.value = opt.textContent;
        closeModelsList();
        email.disabled = false;
        email.readOnly = false;
    };
});
document.addEventListener('click', (e) => {
    if (!modelsBox.contains(e.target)) closeModelsList();
});

/* Email -> Pass */
email.addEventListener('focus', () => { if (!email.disabled) email.readOnly = false; });
email.addEventListener('input', () => {
    const ok = /.+@.+\..+/.test(email.value);
    pass.disabled = !ok;
    pass.readOnly = !ok;
});

/* Pass -> Checks */
pass.addEventListener('focus', () => { if (!pass.disabled) pass.readOnly = false; });
pass.addEventListener('input', () => {
    const ok = pass.value.length >= 6;
    chk1.disabled = !ok;
    rules.forEach(r => r.disabled = !ok);
    chkAccept.disabled = !ok;
});

/* Checks -> botón */
document.querySelectorAll('.checks input').forEach(c => {
    c.onchange = () => {
        const allChecked = [chk1, chkAccept, ...rules].every(i => i.checked);
        btnCreate.disabled = !allChecked;
    };
});

/* OJO */
togglePass.onclick = () => pass.type = pass.type === 'password' ? 'text' : 'password';

/* SUBMIT -> BACKEND */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (btnCreate.disabled) return;

    hideMsg();

    const hasFront = docFront.files && docFront.files.length === 1;
    const hasBack = docBack.files && docBack.files.length === 1;
    if (!hasFront || !hasBack) {
        showMsg('Sube el ANVERSO y el REVERSO del documento.', 'err');
        return;
    }

    const fd = new FormData();
    fd.append('studio_name', studioName.value.trim());
    fd.append('leader_name', leaderName.value.trim());
    fd.append('country_code', (phoneCode.value || '').trim());
    fd.append('whatsapp', (phoneNumber.value || '').trim());
    fd.append('models_active', (modelsVal.value || '').trim());
    fd.append('email', (email.value || '').trim());
    fd.append('password', (pass.value || '').toString());
    fd.append('accept', 'true');

    fd.append('doc_front', docFront.files[0], docFront.files[0].name || 'doc_front');
    fd.append('doc_back', docBack.files[0], docBack.files[0].name || 'doc_back');

    btnCreate.disabled = true;

    try {
        const r = await fetch(API_REGISTER, { method: 'POST', body: fd });

        if (!r.ok) {
            let t = 'Error al registrar.';
            try {
                const j = await r.json();
                if (j && (j.detail || j.message)) t = (j.detail || j.message);
            } catch (_) { }
            showMsg(t, 'err');
            btnCreate.disabled = false;
            return;
        }

        showMsg('Cuenta creada. Redirigiendo...', 'ok');
        setTimeout(() => location.href = REDIRECT_AFTER_OK, 400);

    } catch (_) {
        showMsg('No se pudo conectar al servidor. Intenta de nuevo.', 'err');
        btnCreate.disabled = false;
    }
});
