import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import jspdf from 'jspdf';
import 'jspdf-autotable';

import {PlanesService} from "../../service/planes.service";
import {DestinosService} from "../../service/destinos.service";
import {SweetAlertService} from "../../util/sweet-alert.service";
import {Destino} from "../../model/destino.model";


import {Sitio} from "../../model/sitio.model";
import {Plan} from "../../model/plan.model";
import {SitiosService} from "../../service/sitios.service";
import jsPDF from "jspdf";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})

export class EstadisticasComponent implements OnInit {
  estadisticas: any;
  destinos: Destino[] = [];
  sitios: Sitio[] = [];
  planes: Plan[] = [];


  constructor(private planesService: PlanesService,
              private destinoService: DestinosService,
              private sitiosService: SitiosService,
              private sweetAlertService: SweetAlertService) {}

  ngOnInit(): void {
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

  agregarTabla(pdf: any, titulo: string, datos: any[]) {
    // Añade un título
    pdf.text(titulo, 13, 2);



    // Crea una tabla
    pdf.autoTable({
      startY: 3, // Altura inicial
      head: [Object.keys(datos[0])], // Encabezados de la tabla
      body: datos.map(obj => Object.values(obj)) // Cuerpo de la tabla
    });


    // Agrega un salto de página para la próxima tabla
    pdf.addPage();
  }


  listarDestinos(){
    this.destinoService.getAllDestinos().subscribe({
      next: response => {
        this.destinos = response;
        console.log(response)
        this.sweetAlertService.showSuccessMessage('¡Destinos Cargados!');

      }, error: error => {
        console.log(error);
        this.sweetAlertService.showErrorMessage('Error al cargar los destinos');
      }
    });
  }
  listarSitios(){
    this.sitiosService.getAllSitios().subscribe({
      next: response => {
        this.sitios = response;
        console.log(response)
        this.sweetAlertService.showSuccessMessage('¡Sitios Cargados!');

      }, error: error => {
        console.log(error);
        this.sweetAlertService.showErrorMessage('Error al cargar los sitios');
      }
    });
  }
  listarPlanes(){
    this.planesService.getAllPlanes().subscribe({
      next: response => {
        this.planes = response;
        console.log(response)
        this.sweetAlertService.showSuccessMessage('¡Planes Cargados!');

      }, error: error => {
        console.log(error);
        this.sweetAlertService.showErrorMessage('Error al cargar los planes');
      }
    });
  }
}

