<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Contacto Modelos y Studios | SeduxaModels</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/contactanos_registrados.css', 'resources/js/contactanos_registrados.js'])
</head>

<body>
    <button type="button" class="btn-back" onclick="location.href='/'">← Volver</button>
    <div class="wrap">

        <div class="topbar">
            <h1>Contacto Exclusivo para Models y Studios</h1>
        </div>

        <div class="card">
            <p>
                Si tienes alguna pregunta sobre cómo registrarte o sobre el estado de tu proceso
                de registro como <b>ModelS</b> o <b>Studio</b>, estás en el lugar indicado.
            </p>

            <label>Correo de contacto *</label>
            <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" required>

            <label>WhatsApp *</label>
            <input type="text" id="phone" name="phone" placeholder="Número de WhatsApp con código país"
                inputmode="numeric" disabled required>

            <label>Mensaje *</label>
            <textarea id="reason" name="reason" rows="3" placeholder="Escribe tu consulta o estado de tu registro"
                disabled required></textarea>

            <div class="checks">
                <label>
                    <input id="chk1" type="checkbox" disabled>
                    Confirmo que la información proporcionada es correcta
                </label>
            </div>

            <button type="submit" id="btnSend" class="btn-main" disabled>
                ENVIAR MENSAJE
            </button>

            <footer>
                Propiedad Exclusiva de SEDUXAMODELS ®<br>
                Todos los Derechos Reservados 2026
            </footer>
        </div>

    </div>
</body>

</html>