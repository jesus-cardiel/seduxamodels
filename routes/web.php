<?php

use App\Http\Controllers\Auth\LoginController;

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

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/vip/register', [App\Http\Controllers\Api\V1\VipRegisterController::class, 'store']);

Route::get('/home', function () {
    return redirect('/');
});

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
