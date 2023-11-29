import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Sitio } from "../../model/sitio.model";
import { SweetAlertService } from "../../util/sweet-alert.service";
import { error } from "@angular/compiler-cli/src/transformers/util";
import {SitiosService} from "../../service/sitios.service";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";

@Component({
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
export class SitiosComponent implements OnInit {
  sitios: Sitio[] = [];
  sitioForm: FormGroup;
  editandoSitio: boolean = false;

  constructor(private fb: FormBuilder,
              private sitioService: SitiosService,
              private sweetAlertService: SweetAlertService) {
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
    return (this.sitioForm.get('lugares') as FormArray);
  }

  agregarLugar() {
    this.lugares.push(this.fb.control('', Validators.required));
  }

  eliminarLugar(index: number) {
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

  editarSitio(sitio: Sitio) {
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

  eliminarSitio(id: any) {
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
      } else {
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
}

