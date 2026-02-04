
import Swal from 'sweetalert2';

// Opciones por defecto para consistencia
const defaultOptions = {
    confirmButtonColor: '#ff2d7a',
    cancelButtonColor: '#1a1f36',
    customClass: {
        popup: 'swal2-dark-popup',
        title: 'swal2-dark-title',
        content: 'swal2-dark-content',
    },
    background: '#0f1118',
    color: '#f2f4ff'
};

export const notifySuccess = (title = 'Éxito', text = '') => {
    return Swal.fire({
        ...defaultOptions,
        icon: 'success',
        title,
        text,
        timer: 2000,
        showConfirmButton: false
    });
};

export const notifyError = (title = 'Error', text = '') => {
    return Swal.fire({
        ...defaultOptions,
        icon: 'error',
        title,
        text,
        confirmButtonText: 'Entendido'
    });
};

export const confirmAction = (title, text, confirmBtnText = 'Sí, continuar') => {
    return Swal.fire({
        ...defaultOptions,
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmBtnText,
        cancelButtonText: 'Cancelar'
    });
};

export default Swal;
