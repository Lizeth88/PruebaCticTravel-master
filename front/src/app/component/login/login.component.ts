import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../service/auth.service";
import {SweetAlertService} from "../../util/sweet-alert.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;

  constructor(private sweetAlertService: SweetAlertService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }


  onLogin(): void {
    if (this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      this.authService.login(email, password).subscribe({
        next: response => {
          console.log('respuesta de inicio de sesión:', response);
          this.sweetAlertService.showSuccessMessage('¡Ingreso Correcto!');
          this.router.navigate(['/dashboard']);
        }, error: error => {
          console.error('Error de inicio de sesión:', error);
          this.sweetAlertService.showErrorMessage('¡Ingreso Incorrecto!')

        },
      });
    }
  }

}
