<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class VipRegisterController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validación
            $validated = $request->validate([
                'nick' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'edad' => 'required|integer|min:18|max:85',
                'sexo' => 'required|string',
                'country_code' => 'required|string',
                'whatsapp' => 'required|string|min:6',
                'accept' => 'accepted',
            ], [
                'email.unique' => 'Ya existe el usuario que intentas crear con este correo.',
            ]);

            // Crear usuario
            $user = User::create([
                'name' => $validated['nick'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'edad' => $validated['edad'],
                'sexo' => $validated['sexo'],
                'country_code' => $validated['country_code'],
                'whatsapp' => $validated['whatsapp'],
                'role' => 'vip',
            ]);

            // Iniciar sesión automáticamente
            Auth::login($user);

            return response()->json([
                'message' => 'Usuario registrado correctamente',
                'user_id' => $user->id
            ], 201);

        } catch (ValidationException $e) {
            // Obtener el primer error específico
            $errors = $e->validator->errors()->all();
            $msg = count($errors) > 0 ? $errors[0] : 'Error de validación';

            return response()->json([
                'message' => $msg,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error interno del servidor',
                'detail' => $e->getMessage()
            ], 500);
        }
    }
}
