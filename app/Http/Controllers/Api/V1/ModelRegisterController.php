<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\WebcamModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ModelRegisterController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validación
            $validated = $request->validate([
                'realName' => 'required|string|max:255',
                'nick' => 'required|string|max:255',
                'age' => 'required|integer|between:18,50',
                'phoneCode' => 'required|string',
                'phoneNumber' => 'required|string|min:6',
                'email' => 'required|email|unique:models,email',
                'newPassword' => 'required|string|min:6',
                'selfie' => 'required|image|max:10240', // Máx 10MB para selfies
            ], [
                'email.unique' => 'Ya existe una modelo registrada con este correo.',
                'age.between' => 'La edad debe estar entre 18 y 50 años.',
            ]);

            return DB::transaction(function () use ($request, $validated) {
                // Subir selfie
                $selfiePath = $request->file('selfie')->store('documents/models', 'public');

                // Crear registro de modelo
                $model = WebcamModel::create([
                    'real_name' => $validated['realName'],
                    'nick' => $validated['nick'],
                    'age' => $validated['age'],
                    'country_code' => $validated['phoneCode'],
                    'whatsapp' => $validated['phoneNumber'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['newPassword']),
                    'selfie' => $selfiePath,
                    'status' => 'revision',
                ]);

                return response()->json([
                    'message' => 'Registro enviado para revisión correctamente.',
                    'model_id' => $model->id
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
