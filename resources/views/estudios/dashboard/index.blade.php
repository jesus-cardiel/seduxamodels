@extends('layouts.studio_dashboard')

@section('content')
    <div class="header">
        <h1>Dashboard</h1>
        <div>Bienvenido, {{ Auth::guard('studio')->user()->name }}</div>
    </div>

    <div class="stats-grid">
        <div class="card stat-card">
            <div class="stat-label">Modelos Totales</div>
            <div class="stat-value">{{ Auth::guard('studio')->user()->models()->count() }}</div>
        </div>
        <div class="card stat-card">
            <div class="stat-label">Online Ahora</div>
            <div class="stat-value">0</div> {{-- Implementar lógica real --}}
        </div>
        <div class="card stat-card">
            <div class="stat-label">Ingresos Mes</div>
            <div class="stat-value">$0.00</div>
        </div>
    </div>

    <div class="card" style="margin-top: 30px;">
        <h3>Estadísticas Rápidas</h3>
        <p>Próximamente: Gráficos de conexión y desempeño.</p>
    </div>
@endsection