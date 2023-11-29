import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
let SitiosComponent = class SitiosComponent {
    constructor(fb, sitioService, sweetAlertService) {
        this.fb = fb;
        this.sitioService = sitioService;
        this.sweetAlertService = sweetAlertService;
        this.sitios = [];
        this.editandoSitio = false;
        this.sitioForm = this.fb.group({
            id: [''],
            nombreHospedaje: ['', Validators.required],
            tipoHospedaje: ['', Validators.required],
            cantidadHabitaciones: [''],
            horarioCheckIn: [''],
            horarioCheckOut: [''],
            lugarUbicacion: ['', Validators.required],
        });
    }
    ngOnInit() {
        this.listarSitios();
    }
    get lugares() {
        return this.sitioForm.get('lugares');
    }
    agregarLugar() {
        this.lugares.push(this.fb.control('', Validators.required));
    }
    eliminarLugar(index) {
        this.lugares.removeAt(index);
    }
    listarSitios() {
        this.sitioService.getAllSitios().subscribe({
            next: response => {
                this.sitios = response;
                console.log(response);
                this.sweetAlertService.showSuccessMessage('¡Sitios Cargados!');
            }, error: error => {
                console.log(error);
                this.sweetAlertService.showErrorMessage('Error al cargar los sitios');
            }
        });
    }
    editarSitio(sitio) {
        this.sitioForm.patchValue({
            id: sitio.id,
            nombreHospedaje: sitio.nombreHospedaje,
            tipoHospedaje: sitio.tipoHospedaje,
            cantidadHabitaciones: sitio.cantidadHabitaciones,
            horarioCheckIn: sitio.horarioCheckIn,
            horarioCheckOut: sitio.horarioCheckOut,
            lugarUbicacion: sitio.lugarUbicacion
        });
        this.editandoSitio = true;
    }
    eliminarSitio(id) {
        this.sitioService.eliminarSitio(id).subscribe({
            next: response => {
                console.log('Sitio eliminado exitosamente', response);
                this.sweetAlertService.showSuccessMessage('¡Sitio eliminado exitosamente!');
            },
            error: error => {
                console.error('Error al eliminar sitio', error);
            }
        });
        this.listarSitios();
    }
    guardarSitio() {
        if (this.sitioForm.valid) {
            const sitioData = {
                id: this.sitioForm.value.id,
                nombreHospedaje: this.sitioForm.value.nombreHospedaje,
                tipoHospedaje: this.sitioForm.value.tipoHospedaje,
                cantidadHabitaciones: this.sitioForm.value.cantidadHabitaciones,
                horarioCheckIn: this.sitioForm.value.horarioCheckIn,
                horarioCheckOut: this.sitioForm.value.horarioCheckOut,
                lugarUbicacion: this.sitioForm.value.lugarUbicacion
            };
            if (this.editandoSitio) {
                this.sitioService.actualizarSitio(sitioData).subscribe({
                    next: response => {
                        this.listarSitios();
                        console.log('Sitio actualizado exitosamente', response);
                        this.sweetAlertService.showSuccessMessage('¡Sitio actualizado exitosamente!');
                    },
                    error: error => {
                        console.error('Error al actualizar sitio', error);
                    }
                });
            }
            else {
                this.sitioService.agregarSitio(sitioData).subscribe({
                    next: response => {
                        this.listarSitios();
                        console.log('Sitio agregado exitosamente', response);
                        this.sweetAlertService.showSuccessMessage('¡Sitio agregado exitosamente!');
                    },
                    error: error => {
                        console.error('Error al agregar sitio', error);
                    }
                });
            }
            this.sitioForm.reset();
            this.editandoSitio = false;
            this.listarSitios();
        }
    }
};
SitiosComponent = __decorate([
    Component({
        selector: 'app-sitios',
        standalone: true,
        imports: [CommonModule, MatListModule,
            MatInputModule,
            MatButtonModule,
            MatListModule,
            FormsModule,
            ReactiveFormsModule, MatSelectModule, MatIconModule,],
        templateUrl: './sitios.component.html',
        styleUrls: ['./sitios.component.css']
    })
], SitiosComponent);
export { SitiosComponent };
//# sourceMappingURL=sitios.component.js.map