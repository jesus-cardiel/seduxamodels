<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/registro', function () {
    return view('registro_usuario');
});

Route::post('/vip/register', [App\Http\Controllers\Api\V1\VipRegisterController::class, 'store']);

Route::get('/home', function () {
    return view('home');
})->middleware('auth');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
});
