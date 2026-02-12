import { notifyError } from './helpers/swal.js';

const $ = (s, r = document) => r.querySelector(s);

// =========================
// INIT & HELPERS
// =========================
const SESSION_KEY = "seduxa_logged_user";

function isLogged() {
  try {
    return !!localStorage.getItem(SESSION_KEY);
  } catch { return false; }
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch { return null; }
}

// =========================
// DATA DUMMY
// =========================
const MODELS = [
  { name: "Valentina", country: "Colombia", idioma: "Español", online: true },
  { name: "Sofía", country: "Perú", idioma: "Español", online: true },
  { name: "Camila", country: "Venezuela", idioma: "Español", online: true },
  { name: "Nadia", country: "Ecuador", idioma: "Inglés", online: true },
  { name: "Renata", country: "Colombia", idioma: "Portugués", online: true },
  { name: "Alex", country: "Perú", idioma: "Español", online: true },
];

const GUEST_ATTRS = [
  ["Tetas Pequeñas", 40], ["Tetas Medianas", 80], ["Tetas Grandes", 150], ["Tetas Extra Grandes", 60],
  ["Culos Pequeños", 35], ["Culos Medianos", 60], ["Culos Grandes", 120], ["Culos Extra Grandes", 45],
  ["Penes Pequeños", 25], ["Penes Medianos", 45], ["Penes Grandes", 55], ["Penes Extra Grandes", 15],
  ["Sexo en vivo", 210], ["Tríos", 35],
];

// =========================
// RENDERERS
// =========================
function renderCountries() {
  const list = $("#countriesList");
  if (!list) return;
  const map = {};
  MODELS.forEach((m) => (map[m.country] = (map[m.country] || 0) + 1));
  list.innerHTML = Object.entries(map).map(([c, n]) => `
    <div class="countryRow">
      <div class="countryName">${c}</div>
      <div class="countryCount">${n}</div>
    </div>
  `).join("");
}

function renderGuestAttrs() {
  const box = $("#guestAttrList");
  if (!box) return;
  box.innerHTML = GUEST_ATTRS.map(([name, count]) => `
    <div class="attrRow">
      <div class="attrName">${name}</div>
      <div class="attrCount">${count}</div>
    </div>
  `).join("");
}

function renderGrid(models) {
  const grid = $("#grid");
  const info = $("#resultsInfo");
  if (!grid) return;
  if (info) info.textContent = `${models.length} modelos conectados`;
  grid.innerHTML = models.map((m) => `
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
  `).join("");
}

// =========================
// MODALS & NAVIGATION
// =========================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("active");
    el.setAttribute("aria-hidden", "false");
    console.log("Modal opened:", id);
  } else {
    console.error("Modal not found:", id);
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("active");
    el.setAttribute("aria-hidden", "true");
  }
}

// Event Delegation for Opening Access Modal
document.addEventListener("click", (e) => {
  const openEl = e.target.closest("[data-open-access]");
  if (openEl) {
    e.preventDefault();
    const kind = openEl.dataset.openAccess;
    console.log("Opening access modal for:", kind);

    const title = $("#accessTitle");
    if (title) title.textContent = kind === "studios" ? "Acceso Studios" : "Acceso Models";

    const kindInput = $("#accessKind");
    if (kindInput) kindInput.value = kind;

    const forgotLink = $("#forgotPasswordLink");
    if (forgotLink) {
      forgotLink.href = kind === "studios" ? "/olvide-password-studios" : "/olvide-password-models";
    }

    openModal("accessModal");
  }

  // Close Access Modal
  const closeEl = e.target.closest("[data-close-access]");
  if (closeEl) {
    e.preventDefault();
    closeModal("accessModal");
  }
});

// =========================
// DRAWER
// =========================
const drawer = $("#drawer");
const drawerContent = $("#drawerContent");
const sidebar = $("#sidebarDesktop");

function openDrawer() {
  if (!drawer || !drawerContent || !sidebar) return;
  drawerContent.innerHTML = sidebar.innerHTML;
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  if (drawer) drawer.setAttribute("aria-hidden", "true");
}

$("#openMenu")?.addEventListener("click", openDrawer);
$("#drawerClose")?.addEventListener("click", closeDrawer);
$("#drawerX")?.addEventListener("click", closeDrawer);

// =========================
// UI LOGGED STATE
// =========================
function applyLoginUI() {
  const isUser = isLogged();
  document.querySelectorAll("[data-guest-only]").forEach(el => el.style.display = isUser ? "none" : "");
  document.querySelectorAll("[data-user-only]").forEach(el => el.style.display = isUser ? "" : "none");

  if (isUser) {
    const user = getUser();
    const hello = $("#userHello");
    const uid = $("#userId");
    if (hello) hello.textContent = `Hola, ${user?.name || ""}`.trim();
    if (uid) {
      const rawId = user?.id || "";
      uid.textContent = rawId ? `ID: VIP-${String(rawId).padStart(3, '0')}` : "ID: ---";
    }
  }
}

// =========================
// LOGIN LOGIC
// =========================
async function doLogin(params, btn) {
  btn.disabled = true;
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]')?.getAttribute('content'),
        'Accept': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    if (!response.ok) {
      notifyError('Error de acceso', data.message || 'Credenciales incorrectas');
      btn.disabled = false;
      return;
    }

    if (data.redirect) {
      location.href = data.redirect;
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    location.href = '/';
  } catch (error) {
    notifyError('Error de conexión', 'No se pudo conectar con el servidor');
    btn.disabled = false;
  }
}

// Side Login
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#btnLogin");
  if (!btn) return;
  e.preventDefault();
  const container = btn.closest(".auth");
  const email = container?.querySelector("#loginEmail")?.value;
  const password = container?.querySelector("#loginPass")?.value;
  if (!email || !password) return notifyError('Error', 'Ingresa correo y contraseña');
  doLogin({ email, password }, btn);
});

// Modal Access Login
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#btnAccessLogin");
  if (!btn) return;
  e.preventDefault();
  const container = btn.closest(".auth");
  const email = container?.querySelector("#accessEmail")?.value;
  const password = container?.querySelector("#accessPass")?.value;
  const kind = container?.querySelector("#accessKind")?.value; // de hidden input
  if (!email || !password) return notifyError('Error', 'Ingresa correo y contraseña');
  doLogin({ email, password, kind }, btn);
});

// Pass Toggle Delegation
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-pass");
  if (!btn) return;
  const input = btn.closest(".pass-wrap")?.querySelector("input");
  if (input) input.type = input.type === "password" ? "text" : "password";
});

// Logout
window.logoutSeduxa = function () {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('logoutForm')?.submit();
};

// =========================
// FILTERS
// =========================
const FILTERS_KEY = "seduxa_filters_v2";
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

let filterState = {};
let activeFilterKey = null;

function loadFilters() {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const out = {};
    Object.keys(FILTER_OPTIONS).forEach(k => {
      const arr = Array.isArray(parsed[k]) ? parsed[k] : [];
      out[k] = new Set(arr.filter(v => FILTER_OPTIONS[k].includes(v)));
    });
    return out;
  } catch {
    const out = {};
    Object.keys(FILTER_OPTIONS).forEach(k => out[k] = new Set());
    return out;
  }
}

function saveFilters() {
  const obj = {};
  Object.keys(filterState).forEach(k => obj[k] = Array.from(filterState[k]));
  localStorage.setItem(FILTERS_KEY, JSON.stringify(obj));
}

function renderChips(key) {
  document.querySelectorAll(`[data-chips="${key}"]`).forEach(wrap => {
    const arr = Array.from(filterState[key] || []);
    wrap.innerHTML = arr.map(v => `
      <span class="chip" data-chip="${key}" data-value="${v}">
        ${v}
        <button type="button" class="chipX">✕</button>
      </span>
    `).join("");
  });
}

document.addEventListener("click", (e) => {
  const selectBtn = e.target.closest("button.select[data-select]");
  if (selectBtn && isLogged()) {
    e.preventDefault();
    const key = selectBtn.dataset.select;
    activeFilterKey = key;

    const titleModal = $("#modalTitle");
    if (titleModal) titleModal.textContent = key.replace("_", " ").toUpperCase();

    const body = $("#modalBody");
    if (body) {
      const selected = filterState[key] || new Set();
      body.innerHTML = (FILTER_OPTIONS[key] || []).map(opt => `
        <label class="opt">
          <span class="optLabel">${opt}</span>
          <input type="checkbox" value="${opt}" ${selected.has(opt) ? "checked" : ""} />
        </label>
      `).join("");
    }
    openModal("modal");
  }

  // Chips remove
  const chipX = e.target.closest(".chipX");
  if (chipX) {
    const chip = chipX.closest("[data-chip]");
    const k = chip?.dataset.chip;
    const v = chip?.dataset.value;
    if (k && v) {
      filterState[k].delete(v);
      saveFilters();
      renderChips(k);
    }
  }

  // Global close
  const closeBtn = e.target.closest("[data-close]");
  if (closeBtn) {
    e.preventDefault();
    closeModal("modal");
  }
});

$("#modalAccept")?.addEventListener("click", () => {
  if (!activeFilterKey) return;
  const checks = Array.from($("#modalBody")?.querySelectorAll('input:checked') || []);
  filterState[activeFilterKey] = new Set(checks.map(c => c.value));
  saveFilters();
  renderChips(activeFilterKey);
  closeModal("modal");
});

$("#clearFilters")?.addEventListener("click", () => {
  Object.keys(FILTER_OPTIONS).forEach(k => filterState[k] = new Set());
  saveFilters();
  Object.keys(FILTER_OPTIONS).forEach(renderChips);
});

// =========================
// BOOT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Seduxa home.js loaded");
  filterState = loadFilters();
  renderCountries();
  renderGuestAttrs();
  renderGrid(MODELS);
  applyLoginUI();
  Object.keys(FILTER_OPTIONS).forEach(renderChips);
});