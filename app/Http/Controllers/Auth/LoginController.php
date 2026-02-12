<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'kind' => ['nullable', 'string'],
        ]);

        $kind = $request->input('kind');
        $guard = 'web';

        if ($kind === 'studios') {
            $guard = 'studio';
        } elseif ($kind === 'models') {
            $guard = 'model';
        }

        if (Auth::guard($guard)->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::guard($guard)->user();

            $redirect = '/';
            if ($guard === 'studio') {
                $redirect = route('studio.dashboard');
            } elseif ($guard === 'model') {
                $redirect = route('model.dashboard');
            }

            return response()->json([
                'message' => 'Login exitoso',
                'redirect' => $redirect,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name ?? $user->real_name,
                    'email' => $user->email,
                    'role' => $kind ?? 'user',
                ]
            ]);
        }

        return response()->json([
            'message' => 'Usuario o contraseña incorrectos',
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
