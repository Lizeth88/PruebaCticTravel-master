import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
let RegisterComponent = class RegisterComponent {
    constructor(sweetAlertService, formBuilder, authService, router) {
        this.sweetAlertService = sweetAlertService;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.formRegister = this.formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    onRegister() {
        if (this.formRegister.valid) {
            const { nombre, email, password } = this.formRegister.value;
            this.authService.register(nombre, email, password).subscribe({
                next: response => {
                    console.log('Respuesta de registro:', response);
                    this.sweetAlertService.showSuccessMessage('¡Registro Correcto!');
                    this.router.navigate(['/dashboard']);
                },
                error: error => {
                    console.error('Error de registro:', error.error);
                    this.sweetAlertService.showErrorMessage(error.error.mensaje);
                },
            });
        }
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule,
            MatInputModule,
            MatButtonModule,
            MatFormFieldModule, MatCardModule],
        templateUrl: './register.component.html',
        styleUrl: './register.component.css'
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map