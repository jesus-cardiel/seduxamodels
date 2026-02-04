<?php

use App\Http\Controllers\Auth\LoginController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/vip/register', [App\Http\Controllers\Api\V1\VipRegisterController::class, 'store']);

Route::get('/home', function () {
    return redirect('/');
});

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
