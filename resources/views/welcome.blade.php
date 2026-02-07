<!doctype html>
<html lang="es">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <title>SeduxaModels – Portada</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  @vite(['resources/css/home.css', 'resources/js/home.js'])
  <script>
    @if(Auth::check())
      // Sincronizar sesión de Laravel con el frontend
      localStorage.setItem('seduxa_logged_user', JSON.stringify({
        id: "{{ Auth::user()->id }}",
        name: "{{ Auth::user()->name }}",
        email: "{{ Auth::user()->email }}",
        role: "{{ Auth::user()->role }}"
      }));
    @endif
  </script>
</head>

<body>
  <div class="page">
    <header class="topbar">
      <button class="iconBtn" id="openMenu" aria-label="Abrir menú">☰</button>

      <div class="brand">
        <div class="logo" aria-hidden="true"></div>
        <div class="brandText">
          <div class="brandName">SeduxaModels</div>
          <div class="brandSub">Modelos en vivo</div>
        </div>
      </div>

      <div class="topActions">
        <a class="topLink" href="/registro-studios">Registro de agencias</a>
        <a class="topLink" href="/registro">Registro de modelos</a>
      </div>
    </header>

    <div class="layout">
      <!-- SIDEBAR (desktop) -->
      <aside class="sidebar" id="sidebarDesktop" aria-label="Filtros">

        <!-- ACCESO (SOLO NO LOGUEADO) -->
        <div class="sideSection" data-guest-only>
          <div class="sideTitle">Acceso</div>

          <div class="auth">
            <label class="miniLabel">Correo</label>
            <input class="miniInput" id="loginEmail" type="email" placeholder="correo@dominio.com"
              autocomplete="email" />
            <label class="miniLabel">Contraseña</label>
            <div class="pass-wrap">
              <input class="miniInput" id="loginPass" type="password" placeholder="••••••••"
                autocomplete="current-password" />
              <button type="button" class="toggle-pass" aria-label="Mostrar contraseña">👁</button>
            </div>
            <button class="btnPrimarySm" id="btnLogin" type="button">Ingresar</button>

            <div class="authLinks">
              <a href="registro">Registrarse como usuario</a>
              <a href="{{ url('/olvide-password') }}">Me olvidé de mi password</a>
            </div>
          </div>
        </div>

        <!-- HEADER LOGUEADO (SOLO LOGUEADO) -->
        <div class="sideSection" data-user-only style="display:none">
          <div class="sideTitle">Cuenta</div>
          <div class="userBox">
            <div class="userHello" id="userHello">Hola</div>
            <div class="userId" id="userId">ID:</div>

            <button type="button" class="btnGhostSm" onclick="logoutSeduxa()">Cerrar sesión</button>
          </div>
        </div>

        <!-- PAÍSES ACTIVOS (SIEMPRE / SOLO CONTADOR, NO CLICK) -->
        <div class="sideSection">
          <div class="sideTitle">Países activos</div>
          <div class="countries" id="countriesList"></div>
        </div>

        <!-- ATRIBUTOS (NO LOGUEADO: CONTADOR SIMULATIVO, NO CLICK) -->
        <div class="sideSection" data-guest-only>
          <div class="sideTitle">Conectados ahora</div>
          <div class="attrList" id="guestAttrList"></div>
        </div>

        <!-- REGISTROS / ACCESOS (NO LOGUEADO) -->
        <div class="sideSection" data-guest-only>
          <div class="sideTitle">Accesos</div>

          <div class="miniStack">
            <a class="miniLink" href="/registro-studios">Registro Studios</a>
            <a class="miniLink miniLinkAction" href="#" data-open-access="studios">Acceso Studios</a>
          </div>

          <div class="miniStack">
            <a class="miniLink" href="/registro-modelos">Registro Models</a>
            <a class="miniLink miniLinkAction" href="#" data-open-access="models">Acceso Models</a>
          </div>
        </div>

        <!-- CONTÁCTANOS (NO LOGUEADO) -->
        <div class="sideSection" data-guest-only>
          <div class="sideTitle">Contáctanos</div>
          <div class="miniStack">
            <a class="miniLink" href="mailto:soporte@seduxamodels.com">Público</a>
          </div>
          <div class="miniStack">
            <a class="miniLink" href="/contacto-formulario">Usuarios, Modelos, Studios</a>
          </div>
        </div>

        <!-- FILTROS (SOLO LOGUEADO) -->
        <div class="sideSection" data-user-only style="display:none">
          <div class="sideTitle">Filtros</div>

          <button type="button" class="select" data-select="opcion_sexual" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Opción Sexual…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="opcion_sexual"></div>

          <button type="button" class="select" data-select="idiomas" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Idiomas…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="idiomas"></div>

          <button type="button" class="select" data-select="tipo_cuerpo" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Tipo de cuerpo…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="tipo_cuerpo"></div>

          <button type="button" class="select" data-select="rasgos" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Rasgos…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="rasgos"></div>

          <button type="button" class="select" data-select="cabello" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Color de cabello…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="cabello"></div>

          <button type="button" class="select" data-select="ojos" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Color de ojos…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="ojos"></div>

          <button type="button" class="select" data-select="atributos" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Atributos…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="atributos"></div>

          <button type="button" class="select" data-select="Piercing" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Piercing…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="piercing"></div>

          <button type="button" class="select" data-select="Tatuajes" aria-haspopup="dialog" aria-expanded="false">
            <span class="placeholder">Tatuajes…</span>
            <span class="chev" aria-hidden="true">▾</span>
          </button>
          <div class="chips" data-chips="Tatuajes"></div>

          <div class="sideBtns">
            <button type="button" class="btnGhostSm" id="clearFilters">Limpiar filtros</button>
          </div>

          <div class="favWrap">
            <button type="button" class="btnGhostSm" id="btnFavs">Favoritos</button>
            <div class="hintSmall">Muestra solo favoritas conectadas.</div>
          </div>
        </div>

        <!-- SOPORTE (SOLO LOGUEADO) -->
        <div class="sideSection" data-user-only style="display:none">
          <div class="sideTitle">Soporte</div>
          <div class="miniStack">
            <a class="miniLink" href="/soporte-formulario">Formulario (con tu ID)</a>
          </div>
        </div>

        <!-- LEGALES (SIEMPRE) -->
        <div class="sideSection sideFooter">
          <div class="sideTitle">Legal</div>

          <div class="legal">
            <a href="./aviso_legal.html">Aviso legal</a>
            <a href="./terminos.html">Términos y condiciones</a>
            <a href="./privacidad.html">Política de privacidad</a>
          </div>

          <div class="copyright">
            ® SeduxaModels. Todos los derechos reservados.
          </div>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="main">
        <div class="mainHeader">
          <div>
            <h1 class="h1">Modelos</h1>
            <div class="sub" id="resultsInfo">Cargando…</div>
          </div>

          <div class="searchWrap">
            <input id="search" class="search" type="search" placeholder="Buscar por nombre…" />
          </div>
        </div>

        <section class="grid" id="grid"></section>
      </main>
    </div>

    <!-- DRAWER (mobile) -->
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawerBackdrop" id="drawerClose" aria-hidden="true"></div>
      <div class="drawerPanel" role="dialog" aria-modal="true">
        <div class="drawerHead">
          <div class="drawerTitle">Filtros</div>
          <button class="iconBtn" id="drawerX" aria-label="Cerrar">✕</button>
        </div>

        <div class="drawerBody">
          <div id="drawerContent"></div>
        </div>
      </div>
    </div>

    <!-- MODAL SELECTOR -->
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modalBackdrop" data-close="1"></div>
      <div class="modalSheet" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modalHeader">
          <div class="modalTitle" id="modalTitle">Selecciona</div>
          <button type="button" class="modalClose" data-close="1" aria-label="Cerrar">✕</button>
        </div>

        <div class="modalBody" id="modalBody"></div>

        <div class="modalFooter">
          <button type="button" class="modalBtn ghost" data-close="1">Cancelar</button>
          <button type="button" class="modalBtn" id="modalAccept">Aceptar</button>
        </div>
      </div>
    </div>

    <!-- MODAL ACCESO (STUDIOS / MODELS) -->
    <div id="accessModal" class="modal" aria-hidden="true">
      <div class="modalBackdrop" data-close-access="1"></div>
      <div class="modalSheet" role="dialog" aria-modal="true" aria-labelledby="accessTitle">
        <div class="modalHeader">
          <div class="modalTitle" id="accessTitle">Acceso</div>
          <button type="button" class="modalClose" data-close-access="1" aria-label="Cerrar">✕</button>
        </div>
        <div class="modalBody" id="accessBody">
          <div class="accessBox">
            <div class="accessText" id="accessText">Acceso</div>
            <div class="accessHint">Placeholder (ruta server). Luego se conecta al login real.</div>
          </div>
        </div>
        <div class="modalFooter">
          <button type="button" class="modalBtn" data-close-access="1">Cerrar</button>
        </div>
      </div>
    </div>

  </div>
  <form id="logoutForm" action="{{ route('logout') }}" method="POST" style="display:none">
    @csrf
  </form>
</body>

</html>