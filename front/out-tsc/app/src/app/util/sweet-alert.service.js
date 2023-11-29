import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
let SweetAlertService = class SweetAlertService {
    showSuccessMessage(message) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito!',
            text: message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
        });
    }
    showErrorMessage(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: message,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
        });
    }
};
SweetAlertService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SweetAlertService);
export { SweetAlertService };
//# sourceMappingURL=sweet-alert.service.js.map