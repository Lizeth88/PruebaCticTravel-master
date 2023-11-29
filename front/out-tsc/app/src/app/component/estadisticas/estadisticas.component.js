import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'jspdf-autotable';
import jsPDF from "jspdf";
import { MatIconModule } from "@angular/material/icon";
let EstadisticasComponent = class EstadisticasComponent {
    constructor(planesService, destinoService, sitiosService, sweetAlertService) {
        this.planesService = planesService;
        this.destinoService = destinoService;
        this.sitiosService = sitiosService;
        this.sweetAlertService = sweetAlertService;
        this.destinos = [];
        this.sitios = [];
        this.planes = [];
    }
    ngOnInit() {
        this.listarDestinos();
        this.listarSitios();
        this.listarPlanes();
    }
    descargarPDF() {
        const pdf = new jsPDF('landscape', 'cm', 'letter');
        // Agrega la tabla de destinos
        this.agregarTabla(pdf, 'Destinos', this.destinos);
        // Agrega la tabla de sitios
        this.agregarTabla(pdf, 'Sitios', this.sitios);
        // Agrega la tabla de planes
        this.agregarTabla(pdf, 'Planes', this.planes);
        // Guarda el PDF
        pdf.save('estadisticas.pdf');
    }
    agregarTabla(pdf, titulo, datos) {
        // Añade un título
        pdf.text(titulo, 13, 2);
        // Crea una tabla
        pdf.autoTable({
            startY: 3,
            head: [Object.keys(datos[0])],
            body: datos.map(obj => Object.values(obj)) // Cuerpo de la tabla
        });
        // Agrega un salto de página para la próxima tabla
        pdf.addPage();
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
    listarSitios() {
        this.sitiosService.getAllSitios().subscribe({
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
    listarPlanes() {
        this.planesService.getAllPlanes().subscribe({
            next: response => {
                this.planes = response;
                console.log(response);
                this.sweetAlertService.showSuccessMessage('¡Planes Cargados!');
            }, error: error => {
                console.log(error);
                this.sweetAlertService.showErrorMessage('Error al cargar los planes');
            }
        });
    }
};
EstadisticasComponent = __decorate([
    Component({
        selector: 'app-estadisticas',
        standalone: true,
        imports: [CommonModule, MatIconModule],
        templateUrl: './estadisticas.component.html',
        styleUrl: './estadisticas.component.css'
    })
], EstadisticasComponent);
export { EstadisticasComponent };
//# sourceMappingURL=estadisticas.component.js.map