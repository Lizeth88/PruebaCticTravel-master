import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
let DestinosComponent = class DestinosComponent {
    constructor(fb, destinoService, sweetAlertService) {
        this.fb = fb;
        this.destinoService = destinoService;
        this.sweetAlertService = sweetAlertService;
        this.destinos = [];
        this.editandoDestino = false;
        this.FormControl = FormControl;
        this.destinoForm = this.fb.group({
            id: [''],
            pais: ['', Validators.required],
            departamento: ['', Validators.required],
            municipios: ['', Validators.required],
            lugares: this.fb.array([this.fb.control('', Validators.required)]),
        });
    }
    ngOnInit() {
        this.listarDestinos();
    }
    get lugares() {
        return this.destinoForm.get('lugares');
    }
    agregarLugar() {
        this.lugares.push(this.fb.control('', Validators.required));
    }
    eliminarLugar(index) {
        this.lugares.removeAt(index);
    }
    listarDestinos() {
        this.destinoService.getAllDestinos().subscribe({
            next: response => {
                this.destinos = response;
                console.log(response);
                this.sweetAlertService.showSuccessMessage('¡Destinos Cargados!');
            }, error: error => {
                console.log(error);
                this.sweetAlertService.showErrorMessage('Error al cargar los destinos');
            }
        });
    }
    editarDestino(destinos) {
        // Obtén el FormArray
        const lugaresArray = destinos.lugares.split(',');
        this.destinoForm.patchValue({
            id: destinos.id,
            pais: destinos.pais,
            departamento: destinos.departamento,
            municipios: destinos.municipios,
            lugares: lugaresArray
        });
        this.editandoDestino = true;
    }
    eliminarDestino(id) {
        this.destinoService.eliminarDestino(id).subscribe({
            next: response => {
                console.log('Destino actualizado exitosamente', response);
                this.sweetAlertService.showSuccessMessage('¡Destino actualizado exitosamente!');
                // Puedes realizar acciones adicionales después de la actualización si es necesario
            },
            error: error => {
                console.error('Error al actualizar destino', error);
            }
        });
        this.listarDestinos();
    }
    guardarDestino() {
        if (this.destinoForm.valid) {
            const lugaresCadena = this.destinoForm.value.lugares.join(',');
            const destinoData = {
                id: this.destinoForm.value.id,
                pais: this.destinoForm.value.pais,
                departamento: this.destinoForm.value.departamento,
                municipios: this.destinoForm.value.municipios,
                lugares: lugaresCadena
            };
            if (this.editandoDestino) {
                // Estás editando, entonces actualiza el destino
                this.destinoService.actualizarDestino(destinoData).subscribe({
                    next: response => {
                        console.log('Destino actualizado exitosamente', response);
                        this.sweetAlertService.showSuccessMessage('¡Destino actualizado exitosamente!');
                        // Puedes realizar acciones adicionales después de la actualización si es necesario
                    },
                    error: error => {
                        console.error('Error al actualizar destino', error);
                    }
                });
            }
            else {
                // Estás agregando, entonces guarda un nuevo destino
                this.destinoService.agregarDestino(destinoData).subscribe({
                    next: response => {
                        console.log('Destino agregado exitosamente', response);
                        this.sweetAlertService.showSuccessMessage('¡Destino agregado exitosamente!');
                        // Puedes realizar acciones adicionales después de la adición si es necesario
                    },
                    error: error => {
                        console.error('Error al agregar destino', error);
                    }
                });
            }
            // Limpiar el formulario después de agregar o editar el destino
            this.destinoForm.reset();
            this.editandoDestino = false; // Vuelve a modo de agregar
            this.listarDestinos();
        }
    }
};
DestinosComponent = __decorate([
    Component({
        selector: 'app-destinos',
        standalone: true,
        imports: [CommonModule, MatListModule,
            MatInputModule,
            MatButtonModule,
            MatListModule,
            FormsModule,
            ReactiveFormsModule, MatIconModule,],
        templateUrl: './destinos.component.html',
        styleUrl: './destinos.component.css'
    })
], DestinosComponent);
export { DestinosComponent };
//# sourceMappingURL=destinos.component.js.map