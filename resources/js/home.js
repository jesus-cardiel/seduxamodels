import { notifyError } from './helpers/swal.js';

(() => {
  const $ = (s, r = document) => r.querySelector(s);

  // =========================
  // MODELOS DUMMY (SIEMPRE HAY CONTENIDO)
  // =========================
  const MODELS = [
    { name: "Valentina", country: "Colombia", idioma: "Español", online: true },
    { name: "Sofía", country: "Perú", idioma: "Español", online: true },
    { name: "Camila", country: "Venezuela", idioma: "Español", online: true },
    { name: "Nadia", country: "Ecuador", idioma: "Inglés", online: true },
    { name: "Renata", country: "Colombia", idioma: "Portugués", online: true },
    { name: "Alex", country: "Perú", idioma: "Español", online: true },
  ];

  // =========================
  // ATRIBUTOS SIMULADOS (NO LOGUEADO – SOLO CONTADOR)
  // =========================
  const GUEST_ATTRS = [
    ["Tetas Pequeñas", 40],
    ["Tetas Medianas", 80],
    ["Tetas Grandes", 150],
    ["Tetas Extra Grandes", 60],
    ["Culos Pequeños", 35],
    ["Culos Medianos", 60],
    ["Culos Grandes", 120],
    ["Culos Extra Grandes", 45],
    ["Penes Pequeños", 25],
    ["Penes Medianos", 45],
    ["Penes Grandes", 55],
    ["Penes Extra Grandes", 15],
    ["Sexo en vivo", 210],
    ["Tríos", 35],
  ];

  // =========================
  // COUNTRIES (SOLO CONTADOR)
  // =========================
  function renderCountries() {
    const list = $("#countriesList");
    if (!list) return;

    const map = {};
    MODELS.forEach((m) => (map[m.country] = (map[m.country] || 0) + 1));

    list.innerHTML = Object.entries(map)
      .map(
        ([c, n]) => `
        <div class="countryRow">
          <div class="countryName">${c}</div>
          <div class="countryCount">${n}</div>
        </div>
      `
      )
      .join("");
  }

  // =========================
  // ATRIBUTOS NO LOGUEADO
  // =========================
  function renderGuestAttrs() {
    const box = $("#guestAttrList");
    if (!box) return;

    box.innerHTML = GUEST_ATTRS
      .map(
        ([name, count]) => `
        <div class="attrRow">
          <div class="attrName">${name}</div>
          <div class="attrCount">${count}</div>
        </div>
      `
      )
      .join("");
  }

  // =========================
  // GRID PRINCIPAL
  // =========================
  function renderGrid(models) {
    const grid = $("#grid");
    const info = $("#resultsInfo");
    if (!grid) return;

    if (info) info.textContent = `${models.length} modelos conectados`;

    grid.innerHTML = models
      .map(
        (m) => `
      <article class="card">
        <div class="thumb"></div>
        <div class="cardBody">
          <div class="nameRow">
            <div class="name">${m.name}</div>
            <div class="badge">EN VIVO</div>
          </div>
          <div class="meta">
            <div class="pill">${m.country}</div>
            <div class="pill">${m.idioma}</div>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  // =========================
  // DRAWER MOBILE (MENÚ)
  // =========================
  const drawer = $("#drawer");
  const drawerContent = $("#drawerContent");
  const sidebar = $("#sidebarDesktop");

  function openDrawer() {
    if (!drawer || !drawerContent || !sidebar) return;
    drawerContent.innerHTML = sidebar.innerHTML; // clona sidebar (duplica IDs)
    drawer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute("aria-hidden", "true");
  }

  $("#openMenu")?.addEventListener("click", openDrawer);
  $("#drawerClose")?.addEventListener("click", closeDrawer);
  $("#drawerX")?.addEventListener("click", closeDrawer);

  // =========================
  // modales acceso
  // =========================
  document.addEventListener("click", (e) => {
    const openEl = e.target.closest("[data-open-access]");
    if (openEl) {
      e.preventDefault();
      const kind = openEl.dataset.openAccess;
      $("#accessTitle").textContent = kind === "studios" ? "Acceso Studios" : "Acceso Models";
      $("#accessBody").innerHTML =
        "<div class=\"accessBox\"><div class=\"accessText\">Login interno (backend)</div><div class=\"accessHint\">Este modal es placeholder. Luego se conecta al login real.</div></div>";
      $("#accessModal").setAttribute("aria-hidden", "false");
      return;
    }

    const closeEl = e.target.closest("[data-close-access]");
    if (closeEl) {
      e.preventDefault();
      $("#accessModal").setAttribute("aria-hidden", "true");
    }
  });

  // =========================
  // SEARCH SIMPLE (NO ROMPE NADA)
  // =========================
  $("#search")?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = MODELS.filter((m) => m.name.toLowerCase().includes(q));
    renderGrid(filtered);
  });

  // =========================
  // INIT
  // =========================
  renderCountries();
  renderGuestAttrs();
  renderGrid(MODELS);
})();

// =========================
// LOGIN STATE (FRONTEND)
// =========================
const SESSION_KEY = "seduxa_logged_user";

// helpers
function isLogged() {
  return !!localStorage.getItem(SESSION_KEY);
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

// UI toggle
function applyLoginUI() {
  const isUser = isLogged();

  document.querySelectorAll("[data-guest-only]").forEach((el) => {
    el.style.display = isUser ? "none" : "";
  });
  document.querySelectorAll("[data-user-only]").forEach((el) => {
    el.style.display = isUser ? "" : "none";
  });

  if (isUser) {
    const user = getUser();
    const hello = document.getElementById("userHello");
    const uid = document.getElementById("userId");
    if (hello) hello.textContent = `Hola, ${user?.name || ""}`.trim();
    if (uid) uid.textContent = `ID: ${user?.id || ""}`.trim();
  }
}

// =========================
// LOGIN FIJO (FUNCIONA EN SIDEBAR + DRAWER)
// =========================
async function doLoginFixed(btn) {
  const container = btn.closest(".auth");
  if (!container) return;

  const email = (container.querySelector("#loginEmail")?.value || "").trim();
  const password = (container.querySelector("#loginPass")?.value || "").trim();

  if (!email || !password) {
    notifyError('Error', 'Por favor ingresa correo y contraseña');
    return;
  }

  btn.disabled = true;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      notifyError('Error de acceso', data.message || 'Credenciales incorrectas');
      btn.disabled = false;
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));

    // Redirigir al home real de Laravel (ahora es el root)
    location.href = '/';
  } catch (error) {
    notifyError('Error de conexión', 'No se pudo conectar con el servidor');
    btn.disabled = false;
  }
}

// Delegación: sirve para sidebar y para el HTML clonado en drawer
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-pass");
  if (!btn) return;
  const wrap = btn.closest(".pass-wrap");
  const input = wrap?.querySelector("input");
  if (input) {
    input.type = input.type === "password" ? "text" : "password";
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("#btnLogin");
  if (!btn) return;
  e.preventDefault();
  doLoginFixed(btn);
});

// logout
window.logoutSeduxa = function () {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('logoutForm')?.submit();
};

// INIT
applyLoginUI();

/* =========================================================
   ✅ FALTANTE: LÓGICA PARA ABRIR TUS DESPLEGABLES (FILTROS)
   - NO cambia HTML ni CSS
   - Usa tus botones .select[data-select]
   - Abre tu modal #modal y carga #modalBody
========================================================= */

const FILTERS_KEY = "seduxa_filters_v1";

// Claves EXACTAS a tu HTML (data-select)
const FILTER_OPTIONS = {
  opcion_sexual: ["Hombre Heterosexual", "Hombre Gay", "Mujer Heterosexual", "Mujer LesBians", "Mujer Transgenero", "Sexo Parejas", "Trios Sexuales"],
  idiomas: ["Español", "Inglés", "Portugués", "Francés", "Italiano", "Arabe", "Mandarin", "Otros"],
  tipo_cuerpo: ["Delgada", "Atletica", "Curvilinea", "Gordita"],
  rasgos: ["Latina", "Blanca", "Negra", "Asiática", "Árabe", "Africana"],
  cabello: ["Negro", "Marron", "Castaño", "Rubio", "Rojo", "Fantasía"],
  ojos: ["Café", "Negro", "Azul", "Verde", "Miel"],
  atributos: ["Tetas Pequeñas", "Tetas Medianas", "Tetas Grandes", "Tetas Extra Grandes", "Culos Pequeños", "Culos Medianos", "Culos Grandes", "Culos Extra Grandes", "Penes Pequeños", "Penes Medianos", "Penes Grandes", "Penes Extra Grandes"],
  Piercing: ["En Zonas Intimas", "Fuera de Zonas Intimas"],
  Tatuajes: ["En Zonas Intimas", "Fuera de Zonas Intimas"],
};

function loadFilters() {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const out = {};
    Object.keys(FILTER_OPTIONS).forEach((k) => {
      const arr = Array.isArray(parsed?.[k]) ? parsed[k] : [];
      out[k] = new Set(arr.filter((v) => FILTER_OPTIONS[k].includes(v)));
    });
    return out;
  } catch {
    const out = {};
    Object.keys(FILTER_OPTIONS).forEach((k) => (out[k] = new Set()));
    return out;
  }
}

function saveFilters(state) {
  const obj = {};
  Object.keys(state).forEach((k) => (obj[k] = Array.from(state[k])));
  localStorage.setItem(FILTERS_KEY, JSON.stringify(obj));
}

const filterState = loadFilters();
let activeFilterKey = null;

function renderChips(key) {
  document.querySelectorAll(`[data-chips="${key}"]`).forEach((wrap) => {
    const arr = Array.from(filterState[key] || []);
    wrap.innerHTML = arr
      .map(
        (v) => `
          <span class="chip" data-chip="${key}" data-value="${v}">
            ${v}
            <button type="button" class="chipX" aria-label="Quitar">✕</button>
          </span>
        `
      )
      .join("");
  });
}

function renderAllChips() {
  Object.keys(FILTER_OPTIONS).forEach(renderChips);
}

function openFilterModal(key, triggerBtn) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modalBody");
  const title = document.getElementById("modalTitle");
  if (!modal || !body || !title) return;

  activeFilterKey = key;

  document.querySelectorAll("[data-select]").forEach((b) => b.setAttribute("aria-expanded", "false"));
  if (triggerBtn) triggerBtn.setAttribute("aria-expanded", "true");

  title.textContent =
    {
      opcion_sexual: "Opción Sexual",
      idiomas: "Idiomas",
      tipo_cuerpo: "Tipo de cuerpo",
      rasgos: "Rasgos",
      cabello: "Color de cabello",
      ojos: "Color de ojos",
      atributos: "Atributos",
      Piercing: "Piercing",
      Tatuajes: "Tatuajes",
    }[key] || "Selecciona";

  const selected = filterState[key] || new Set();
  const opts = FILTER_OPTIONS[key] || [];

  body.innerHTML = opts
    .map((opt) => {
      const checked = selected.has(opt) ? "checked" : "";
      return `
        <label class="opt">
          <span class="optLeft">
            <span class="optLabel">${opt}</span>
          </span>
          <input type="checkbox" value="${opt}" ${checked} />
        </label>
      `;
    })
    .join("");

  modal.setAttribute("aria-hidden", "false");
}

function closeFilterModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.querySelectorAll("[data-select]").forEach((b) => b.setAttribute("aria-expanded", "false"));
  activeFilterKey = null;
}

// ✅ ABRIR TUS DESPLEGABLES (botones existentes)
document.addEventListener("click", (e) => {
  const btn = e.target.closest('button.select[data-select]');
  if (!btn) return;

  // por seguridad: filtros solo logueado (en tu HTML ya están en data-user-only)
  if (!isLogged()) return;

  e.preventDefault();
  openFilterModal(btn.dataset.select, btn);
});

// ✅ CERRAR modal (tu HTML usa data-close="1")
document.addEventListener("click", (e) => {
  const closeEl = e.target.closest("[data-close]");
  if (!closeEl) return;
  e.preventDefault();
  closeFilterModal();
});

// ✅ ACEPTAR selección
document.getElementById("modalAccept")?.addEventListener("click", () => {
  if (!activeFilterKey) return;

  const body = document.getElementById("modalBody");
  const checks = Array.from(body?.querySelectorAll('input[type="checkbox"]') || []);
  filterState[activeFilterKey] = new Set(checks.filter((c) => c.checked).map((c) => c.value));

  saveFilters(filterState);
  renderChips(activeFilterKey);
  closeFilterModal();
});

// ✅ QUITAR chip
document.addEventListener("click", (e) => {
  const x = e.target.closest(".chipX");
  if (!x) return;

  const chip = x.closest("[data-chip]");
  const key = chip?.dataset.chip;
  const value = chip?.dataset.value;
  if (!key || !value) return;

  e.preventDefault();
  filterState[key]?.delete(value);
  saveFilters(filterState);
  renderChips(key);
});

// ✅ LIMPIAR filtros
document.getElementById("clearFilters")?.addEventListener("click", (e) => {
  e.preventDefault();
  Object.keys(FILTER_OPTIONS).forEach((k) => (filterState[k] = new Set()));
  saveFilters(filterState);
  renderAllChips();
});

// INIT chips
renderAllChips();