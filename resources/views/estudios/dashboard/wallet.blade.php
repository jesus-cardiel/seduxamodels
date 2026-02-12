@extends('layouts.studio_dashboard')

@section('content')
    <div class="header">
        <h1>Billetera</h1>
        <div class="card" style="font-size: 1.5rem; font-weight: bold; border-color: var(--m1);">
            Saldo Disponible: $0.00
        </div>
    </div>

    <div class="stats-grid">
        <div class="card">
            <h3>Solicitar Retiro</h3>
            <p>Selecciona el método de pago y el monto a retirar.</p>
            <button class="card"
                style="background: var(--m1); color: #000; font-weight: bold; cursor: pointer; width: 100%;">Retirar
                Fondos</button>
        </div>
        <div class="card">
            <h3>Ingresos Totales</h3>
            <p style="font-size: 1.2rem; color: #00ff00;">$0.00</p>
        </div>
    </div>

    <div class="card" style="margin-top: 30px;">
        <h3>Historial de Transacciones</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 15px;">
            <thead>
                <tr style="border-bottom: 1px solid var(--stroke);">
                    <th style="padding: 12px;">Fecha</th>
                    <th style="padding: 12px;">Tipo</th>
                    <th style="padding: 12px;">Descripción</th>
                    <th style="padding: 12px;">Monto</th>
                    <th style="padding: 12px;">Estatus</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5" style="padding: 20px; text-align: center;">No hay transacciones registradas.</td>
                </tr>
            </tbody>
        </table>
    </div>
@endsection