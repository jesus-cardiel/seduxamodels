<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            max-width: 600px;
        }

        .header {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            border-bottom: 2px solid #ff2aa6;
            padding-bottom: 10px;
        }

        .field {
            margin-bottom: 10px;
        }

        .label {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">Nuevo Mensaje de Contacto (Modelos/Studios)</div>

        <div class="field">
            <span class="label">Correo:</span> {{ $data['email'] }}
        </div>

        <div class="field">
            <span class="label">WhatsApp:</span> {{ $data['phone'] }}
        </div>

        <div class="field">
            <span class="label">Mensaje:</span><br>
            {{ $data['reason'] }}
        </div>

        <hr>
        <p style="font-size: 12px; color: #777;">
            Este mensaje fue enviado desde el formulario de contacto exclusivo de SeduxaModels.
        </p>
    </div>
</body>

</html>