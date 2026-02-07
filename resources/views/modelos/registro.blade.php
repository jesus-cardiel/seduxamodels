<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SeduxaModels | Registro Modelos</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/registro_modelos.css', 'resources/js/registro_modelos.js'])
</head>

<body>
    <button type="button" class="btn-back" onclick="location.href='/'">← Volver</button>
    <div class="wrap">

        <h1>REGISTRO MODELOS</h1>
        <div class="sub">(Datos reales para verificación)</div>

        <form id="form" autocomplete="off" autocapitalize="words" spellcheck="false" enctype="multipart/form-data">
            <!-- ✅ TRAMPA anti Google Password Manager (para que NO joda el primer campo) -->
            <input type="text" name="username" autocomplete="username"
                style="position:absolute;left:-9999px;top:-9999px;height:1px;width:1px;opacity:0;pointer-events:none"
                tabindex="-1" aria-hidden="true">
            <input type="password" name="password" autocomplete="current-password"
                style="position:absolute;left:-9999px;top:-9999px;height:1px;width:1px;opacity:0;pointer-events:none"
                tabindex="-1" aria-hidden="true">

            <label>Nombre y Apellidos *</label>
            <!-- ✅ NO debe parecer login: autocomplete off + name propio -->
            <input id="realName" name="realName" type="text" inputmode="text" autocomplete="off" autocapitalize="words"
                placeholder="Nombre y Apellidos">

            <label>Nombre que usarás *</label>
            <input id="nick" name="nick" type="text" inputmode="text" autocomplete="off"
                placeholder="Sujeto a disponibilidad" disabled>

            <label>Edad (18 a 50) *</label>
            <select id="age" name="age" disabled>
                <option value="">Selecciona</option>
            </select>

            <label>WhatsApp *</label>
            <div class="phone-row">
                <div class="phone-code">
                    <div id="phoneTrigger" class="phone-trigger disabled">
                        <span id="phoneText">Código país</span><span>▼</span>
                    </div>
                    <input type="hidden" id="phoneCode" name="phoneCode" value="">
                </div>
                <div class="phone-num">
                    <!-- ✅ TECLADO NUMÉRICO -->
                    <input id="phoneNumber" name="phoneNumber" type="tel" inputmode="numeric" autocomplete="off"
                        pattern="[0-9]*" placeholder="Número telefónico" disabled>
                </div>
            </div>

            <label>Correo electrónico *</label>
            <input id="email" name="email" type="email" inputmode="email" autocomplete="off"
                placeholder="correo@ejemplo.com" disabled>

            <label>Contraseña *</label>
            <input id="pass" name="newPassword" type="password" autocomplete="new-password" placeholder="••••••••"
                disabled>

            <label>Foto selfie *</label>
            <div class="selfie-box" style="position:relative">
                <div class="selfie-title">Selfie (cámara frontal)</div>

                <button id="btnSelfie" class="file-btn" type="button" disabled>Tomar selfie</button>
                <input id="selfie" name="selfie" class="file-input" type="file" accept="image/*" capture="user"
                    disabled>

                <div id="selfieHint" class="file-hint">Se solicitará permiso de cámara.</div>
            </div>

            <div class="checks">
                <label><input type="checkbox" class="rule" disabled> Soy Consciente que está Prohibido Mostrar o
                    Escuchar a Menores dentro de los Shows.</label>
                <label><input type="checkbox" class="rule" disabled> Soy Consciente que está Prohibido Mostrar o
                    Manipular Cualquier Tipo de Armas.</label>
                <label><input type="checkbox" class="rule" disabled> Soy Consciente que está Totalmente Prohibido
                    Mostrar o Consumir drogas en el Show.</label>
                <label><input type="checkbox" class="rule" disabled> Soy Consciente que está Totalmente Prohibido
                    Compartir cualquier forma de dato de contacto/Redes/Cuentas/etc.</label>
                <label><input type="checkbox" id="accept" disabled> Acepto las Normas y Sanciones de la Página desde
                    este momento.</label>
            </div>

            <button id="submit" class="btn-main" disabled type="submit">ENVIAR REGISTRO</button>

            <div id="msg" class="msg"></div>

            <footer>SEDUXAMODELS ® — 2026</footer>

        </form>
    </div>

    <!-- MODAL PAÍS -->
    <div id="modal" class="modal">
        <div class="modal-box">
            <div class="modal-head">
                <strong>CÓDIGO DE PAÍS</strong>
                <button type="button" id="close" class="modal-close">Cerrar</button>
            </div>
            <div class="modal-body">
                <input id="search" class="search" placeholder="Buscar país o +código" autocomplete="off">
                <div id="list" class="country-list"></div>
            </div>
        </div>
    </div>

    <script type="module">
        import { notifySuccess, notifyError } from "{{ Vite::asset('resources/js/helpers/swal.js') }}";

        @if(session('success'))
            notifySuccess('Éxito', "{{ session('success') }}");
        @endif

        @if(session('error'))
            notifyError('Error', "{{ session('error') }}");
        @endif

        @if($errors->any())
            notifyError('Error', "{{ $errors->first() }}");
        @endif
    </script>
</body>

</html>