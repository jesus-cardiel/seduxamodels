<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Recuperar Cuenta | SeduxaModels</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
    @vite(['resources/css/usuarios/olvide_password.css', 'resources/js/usuarios/olvide_password.js'])
</head>

<body>
    <button type="button" class="btn-back" onclick="location.href='/'">← Volver</button>
    <div class="wrap">

        <div class="topbar">
            <h1>Recuperar Cuenta</h1>
        </div>

        <div class="card">
            <p>
                Si olvidaste tu contraseña, completa los datos reales.
                Nuestro equipo se contactará por WhatsApp o correo para validar tu identidad.
            </p>

            <label>Correo registrado *</label>
            <input id="email" type="email" placeholder="correo@ejemplo.com">

            <label>WhatsApp *</label>
            <input id="phone" type="tel" placeholder="Número de WhatsApp con código país" inputmode="numeric" disabled>

            <label>Motivo *</label>
            <textarea id="reason" rows="3" placeholder="Ej: Olvidé mi contraseña y no puedo ingresar"
                disabled></textarea>

            <div class="checks">
                <label>
                    <input id="chk1" type="checkbox" disabled>
                    Declaro que los datos proporcionados son reales
                </label>
            </div>

            <button id="btnSend" class="btn-main" disabled>
                ENVIAR SOLICITUD
            </button>

            <footer>
                Propiedad Exclusiva de SEDUXAMODELS ®<br>
                Todos los Derechos Reservados 2026
            </footer>
        </div>

    </div>

    <!-- ✅ MODAL CONFIRMACIÓN -->
    <div class="modal" id="sentModal" aria-hidden="true">
        <div class="modalBackdrop" data-close-modal="1"></div>
        <div class="modalSheet" role="dialog" aria-modal="true" aria-labelledby="sentTitle">
            <div class="modalHead">
                <div class="modalTitle" id="sentTitle">Solicitud enviada</div>
                <button class="modalX" type="button" aria-label="Cerrar" data-close-modal="1">✕</button>
            </div>
            <div class="modalBody">
                <div class="modalMsg">
                    En breves minutos revisa tu correo para poder volver a ingresar.
                </div>
            </div>
            <div class="modalFoot">
                <button class="btn-main btn-ok" id="btnOk" type="button" data-close-modal="1">ENTENDIDO</button>
            </div>
        </div>
    </div>

</body>

</html>