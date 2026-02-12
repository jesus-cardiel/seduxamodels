@extends('layouts.studio_dashboard')

@section('content')
    <div class="header">
        <h1>Mis Modelos</h1>
        <button class="card" style="background: var(--m1); color: #000; font-weight: bold; cursor: pointer;">+ Agregar
            Modelo</button>
    </div>

    <div class="card">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="border-bottom: 1px solid var(--stroke);">
                    <th style="padding: 12px;">Nombre</th>
                    <th style="padding: 12px;">Estatus</th>
                    <th style="padding: 12px;">Horas Hoy</th>
                    <th style="padding: 12px;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse(Auth::guard('studio')->user()->models as $model)
                    <tr style="border-bottom: 1px solid var(--stroke);">
                        <td style="padding: 12px;">{{ $model->nick }}</td>
                        <td style="padding: 12px;">
                            <span style="color: {{ $model->status === 'aprobado' ? '#00ff00' : '#ffcc00' }}">
                                {{ strtoupper($model->status) }}
                            </span>
                        </td>
                        <td style="padding: 12px;">0h</td> {{-- Implementar con logs --}}
                        <td style="padding: 12px;">
                            <button
                                style="background:none; border:1px solid var(--stroke); color:var(--text); border-radius:4px; padding:4px 8px; cursor:pointer;">Ver</button>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" style="padding: 20px; text-align: center;">No tienes modelos registradas aún.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection