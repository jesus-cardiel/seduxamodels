<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Recuperar Cuenta Studios | SeduxaModels</title>

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">

    @vite(['resources/css/estudios/olvide_password.css', 'resources/js/estudios/olvide_password.js'])

</head>

<body>
    <button type="button" class="btn-back" onclick="location.href='/'">← Volver</button>
    <div class="wrap">

        <div class="topbar">
            <h1>Recuperar Cuenta Studios</h1>
        </div>

        <div class="card">
            <p>
                Si eres Studio y olvidaste tu contraseña, completa los datos reales.
                Nuestro equipo se contactará por WhatsApp o correo para validar tu identidad.
            </p>

            <!-- ID OPCIONAL -->
            <label>ID (opcional)</label>
            <input id="studioId" placeholder="Ej: ST-20491">

            <label>Correo registrado *</label>
            <input id="email" placeholder="correo@ejemplo.com">

            <label>WhatsApp *</label>
            <input id="phone" placeholder="Número de WhatsApp con código país" inputmode="numeric" disabled>

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
                Todos los Derechos Reservados {{ date('Y') }}
            </footer>
        </div>

    </div>

</body>

</html>