<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SeduxaModels | Inicio</title>
    <style>
        body {
            background: #000;
            color: #b76cff;
            font-family: 'Playfair Display', serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }

        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }

        .user-info {
            background: rgba(183, 108, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid #b76cff;
        }

        .btn-logout {
            margin-top: 30px;
            color: #fff;
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <h1>Hola, {{ Auth::user()->name }}</h1>
    <div class="user-info">
        <p>Usuario: {{ Auth::user()->email }}</p>
        <p>Rol: {{ Auth::user()->role }}</p>
    </div>

    <form action="/logout" method="POST" style="display: none;" id="logout-form">
        @csrf
    </form>
    <a onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="btn-logout">Cerrar
        Sesión</a>
</body>

</html>