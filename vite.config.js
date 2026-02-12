import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/home.css',
                'resources/js/home.js',
                'resources/css/registro_usuario.css',
                'resources/js/registro_usuario.js',
                'resources/css/registro_studios.css',
                'resources/js/registro_studios.js',
                'resources/css/registro_modelos.css',
                'resources/js/registro_modelos.js',
                'resources/css/usuarios/olvide_password.css',
                'resources/js/usuarios/olvide_password.js',
                'resources/js/helpers/swal.js',
                'resources/css/contactanos_registrados.css',
                'resources/js/contactanos_registrados.js',
                'resources/css/estudios/olvide_password.css',
                'resources/js/estudios/olvide_password.js'
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
