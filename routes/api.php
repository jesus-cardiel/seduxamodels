<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\VipRegisterController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/studios/register', [App\Http\Controllers\Api\V1\StudioRegisterController::class, 'store']);
    Route::post('/models/register', [App\Http\Controllers\Api\V1\ModelRegisterController::class, 'store']);
});