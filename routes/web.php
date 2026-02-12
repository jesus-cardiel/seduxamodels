<?php

use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/registro', function () {
    return view('usuarios.registro');
});
Route::get('/registro-studios', function () {
    return view('estudios.registro');
});
Route::get('/registro-modelos', function () {
    return view('modelos.registro');
});

Route::get('/olvide-password', function () {
    return view('usuarios.olvide_password');
});

Route::get('/olvide-password-studios', function () {
    return view('estudios.olvide_password');
});

Route::get('/olvide-password-models', function () {
    return view('modelos.olvide_password');
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/vip/register', [App\Http\Controllers\Api\V1\VipRegisterController::class, 'store']);

Route::get('/home', function () {
    return redirect('/');
});


Route::get('/aviso-legal', function () {
    return view('legal.aviso_legal');
});

Route::get('/politica-privacidad', function () {
    return view('legal.politica_privacidad');
});

Route::get('/terminos-condiciones', function () {
    return view('legal.terminos_condiciones');
});

Route::get('/reglamentos', function () {
    return view('legal.reglamentos');
});

Route::get('/contacto-formulario', function () {
    return view('contactanos.contactanos_registrados');
});

Route::post('/contacto-enviar', [ContactController::class, 'send'])->name('contacto.send');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware(['auth:studio'])->group(function () {
    Route::get('/studio/dashboard', function () {
        return view('estudios.dashboard.index');
    })->name('studio.dashboard');

    Route::get('/studio/models', function () {
        return view('estudios.dashboard.models');
    })->name('studio.models');

    Route::get('/studio/wallet', function () {
        return view('estudios.dashboard.wallet');
    })->name('studio.wallet');
});
