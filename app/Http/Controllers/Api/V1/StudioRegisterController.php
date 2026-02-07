<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Studio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StudioRegisterController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validación
            $validated = $request->validate([
                'studio_name' => 'required|string|max:255',
                'leader_name' => 'required|string|max:255',
                'country_code' => 'required|string',
                'whatsapp' => 'required|string|min:6',
                'models_active' => 'required|string',
                'email' => 'required|email|unique:studios,email',
                'password' => 'required|string|min:6',
                'accept' => 'required',
                'doc_front' => 'required|image|max:5120', // Máx 5MB
                'doc_back' => 'required|image|max:5120',
            ], [
                'email.unique' => 'Ya existe el estudio que intentas crear con este correo.',
            ]);

            return DB::transaction(function () use ($request, $validated) {
                // Subir documentos
                $frontPath = $request->file('doc_front')->store('documents/studios', 'public');
                $backPath = $request->file('doc_back')->store('documents/studios', 'public');

                // Crear registro de estudio directamente (sin User)
                $studio = Studio::create([
                    'name' => $validated['studio_name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'leader_name' => $validated['leader_name'],
                    'models_active' => $validated['models_active'],
                    'doc_front' => $frontPath,
                    'doc_back' => $backPath,
                    'country_code' => $validated['country_code'],
                    'whatsapp' => $validated['whatsapp'],
                ]);

                return response()->json([
                    'message' => 'Estudio registrado correctamente',
                    'studio_id' => $studio->id
                ], 201);
            });

        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->all();
            $msg = count($errors) > 0 ? $errors[0] : 'Error de validación';
            return response()->json(['message' => $msg, 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error interno del servidor',
                'detail' => $e->getMessage()
            ], 500);
        }
    }
}
