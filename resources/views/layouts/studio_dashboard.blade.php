<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estudio Panel | SeduxaModels</title>
    @vite(['resources/css/home.css']) {{-- Reusar estilos base si aplica --}}
    <style>
        :root {
            --bg: #0a0b10;
            --panel: #10121a;
            --glass: rgba(18, 20, 30, .62);
            --stroke: rgba(255, 255, 255, .08);
            --text: #f2f4ff;
            --m1: #ff2aa6;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: sans-serif;
            margin: 0;
            display: flex;
            height: 100vh;
        }

        .sidebar {
            width: 260px;
            background: var(--panel);
            border-right: 1px solid var(--stroke);
            display: flex;
            flex-direction: column;
            padding: 20px;
        }

        .sidebar h2 {
            color: var(--m1);
            font-size: 1.2rem;
        }

        .nav {
            flex: 1;
            margin-top: 30px;
        }

        .nav a {
            display: block;
            color: var(--text);
            text-decoration: none;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 8px;
            transition: 0.3s;
        }

        .nav a:hover,
        .nav a.active {
            background: var(--glass);
            border: 1px solid var(--stroke);
        }

        .content {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .card {
            background: var(--panel);
            border: 1px solid var(--stroke);
            padding: 20px;
            border-radius: 12px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .stat-card {
            text-align: center;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--m1);
        }
    </style>
</head>

<body>
    <div class="sidebar">
        <h2>Seduxa Studios</h2>
        <div class="nav">
            <a href="{{ route('studio.dashboard') }}"
                class="{{ request()->routeIs('studio.dashboard') ? 'active' : '' }}">Dashboard</a>
            <a href="{{ route('studio.models') }}" class="{{ request()->routeIs('studio.models') ? 'active' : '' }}">Mis
                Modelos</a>
            <a href="{{ route('studio.wallet') }}"
                class="{{ request()->routeIs('studio.wallet') ? 'active' : '' }}">Billetera</a>
        </div>
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit"
                style="background:none; border:none; color:var(--text); cursor:pointer; padding:12px; text-align:left; width:100%;">Cerrar
                Sesión</button>
        </form>
    </div>
    <div class="content">
        @yield('content')
    </div>
</body>

</html>