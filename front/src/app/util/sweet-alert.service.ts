import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  showSuccessMessage(message: string): void {
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

  showErrorMessage(message: string): void {
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
}
