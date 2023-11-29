import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
let LoginComponent = class LoginComponent {
    constructor(sweetAlertService, formBuilder, authService, router) {
        this.sweetAlertService = sweetAlertService;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.formLogin = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }
    onLogin() {
        if (this.formLogin.valid) {
            const { email, password } = this.formLogin.value;
            this.authService.login(email, password).subscribe({
                next: response => {
                    console.log('respuesta de inicio de sesión:', response);
                    this.sweetAlertService.showSuccessMessage('¡Ingreso Correcto!');
                    this.router.navigate(['/dashboard']);
                }, error: error => {
                    console.error('Error de inicio de sesión:', error);
                    this.sweetAlertService.showErrorMessage('¡Ingreso Incorrecto!');
                },
            });
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        standalone: true,
        imports: [CommonModule, FormsModule, ReactiveFormsModule,
            MatInputModule,
            MatButtonModule,
            MatFormFieldModule, MatCardModule],
        templateUrl: './login.component.html',
        styleUrl: './login.component.css'
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map