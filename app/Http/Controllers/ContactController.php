<?php

namespace App\Http\Controllers;

use App\Mail\ContactRegistradosMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'phone' => 'required|string|min:6',
            'reason' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Por favor, completa todos los campos correctamente.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Aquí puedes cambiar el correo de destino al que desees
            Mail::to('jesus.cardielg@gmail.com')->send(new ContactRegistradosMail($request->all()));

            return response()->json([
                'success' => true,
                'message' => 'Tu mensaje ha sido enviado con éxito.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hubo un problema al enviar el correo. Por favor, inténtalo más tarde.'
                // 'debug' => $e->getMessage() // Opcional para desarrollo
            ], 500);
        }
    }
}
