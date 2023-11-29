import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SweetAlertService} from "../../util/sweet-alert.service";
import {AuthService} from "../../service/auth.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  formRegister!:FormGroup;

  constructor(private sweetAlertService: SweetAlertService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.formRegister.valid) {
      const {nombre, email, password } = this.formRegister.value;
      this.authService.register(nombre, email, password).subscribe({
        next: response => {
          console.log('Respuesta de registro:', response);
          this.sweetAlertService.showSuccessMessage('¡Registro Correcto!')
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('Error de registro:', error.error);
          this.sweetAlertService.showErrorMessage(error.error.mensaje);
        },
      });
    }
  }

}
