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
import { Plan } from "../../model/plan.model";
import { PlanesService } from "../../service/planes.service";
import { Destino } from "../../model/destino.model";
import { Sitio } from "../../model/sitio.model";
import { DestinosService } from "../../service/destinos.service";
import { SitiosService } from "../../service/sitios.service";
import { SweetAlertService } from "../../util/sweet-alert.service";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {AuthService} from "../../service/auth.service";
import {Inscripcion} from "../../model/inscripcion.model";
import {Observable} from "rxjs";
import {MatTableModule} from "@angular/material/table";

@Component({
    selector: 'app-planes',
    standalone: true,
    imports: [CommonModule, MatListModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule, MatIconModule, MatSelectModule, MatTableModule,],
    templateUrl: './planes.component.html',
    styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
    planes: Plan[] = [];
    planForm: FormGroup;
    destinos: Destino[] = [];
    sitios: Sitio[] = [];
    inscripciones: any = [];
    editandoPlan: boolean = false;

    constructor(private fb: FormBuilder,
                private planService: PlanesService,
                private destinoService: DestinosService,
                private sitioService: SitiosService,
                public authService: AuthService,
                private sweetAlertService: SweetAlertService) {
        this.planForm = this.fb.group({
            id: [''],
            destino: ['', Validators.required],
            sitio: ['', Validators.required],
            precioPaquete: ['', Validators.required],
            duracionDias: ['', Validators.required],
            duracionNoches: ['', Validators.required],
            tipoTransporte: ['', Validators.required],
            cantidadPaquetes: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.listarPlanes();
        this.listarDestinos();
        this.listarSitios();

        if(this.authService.hasRole('CLIENT')){
            console.log("Es Cliente");
            this.listarInscripciones();
            console.log(this.inscripciones);
        }
    }


    listarPlanes() {
        this.planService.getAllPlanes().subscribe({
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

    listarDestinos() {
        this.destinoService.getAllDestinos().subscribe({
            next: response => {
                this.destinos = response;
                console.log(response);
            }, error: error => {
                console.log(error);
            }
        });
    }

    listarSitios() {
        this.sitioService.getAllSitios().subscribe({
            next: response => {
                this.sitios = response;
                console.log(response);
            }, error: error => {
                console.log(error);
            }
        });
    }

    editarPlan(plan: Plan) {
        this.planForm.patchValue({
            id: plan.id,
            destino: plan.destino,
            sitio: plan.sitio,
            precioPaquete: plan.precioPaquete,
            duracionDias: plan.duracionDias,
            duracionNoches: plan.duracionNoches,
            tipoTransporte: plan.tipoTransporte,
            cantidadPaquetes: plan.cantidadPaquetes,
        });

        this.editandoPlan = true;
    }

    eliminarPlan(id: any) {
        this.planService.eliminarPlan(id).subscribe({
            next: response => {
                this.listarPlanes();
                console.log('Plan eliminado exitosamente', response);
                this.sweetAlertService.showSuccessMessage('¡Plan eliminado exitosamente!');
            },
            error: error => {
                console.error('Error al eliminar plan', error);
            }
        });
    }

    guardarPlan() {
        if (this.planForm.valid) {
            const planData = {
                id: this.planForm.value.id,
                destino: this.planForm.value.destino,
                sitio: this.planForm.value.sitio,
                precioPaquete: this.planForm.value.precioPaquete,
                duracionDias: this.planForm.value.duracionDias,
                duracionNoches: this.planForm.value.duracionNoches,
                tipoTransporte: this.planForm.value.tipoTransporte,
                cantidadPaquetes: this.planForm.value.cantidadPaquetes,
            };

            if (this.editandoPlan) {
                this.planService.actualizarPlan(planData).subscribe({
                    next: response => {
                        this.listarPlanes();

                        console.log('Plan actualizado exitosamente', response);
                        this.sweetAlertService.showSuccessMessage('¡Plan actualizado exitosamente!');
                    },
                    error: error => {
                        console.error('Error al actualizar plan', error);
                    }
                });
            } else {
                this.planService.agregarPlan(planData).subscribe({
                    next: response => {
                        this.listarPlanes();

                        console.log('Plan agregado exitosamente', response);
                        this.sweetAlertService.showSuccessMessage('¡Plan agregado exitosamente!');
                    },
                    error: error => {
                        console.error('Error al agregar plan', error);
                    }
                });
            }

            this.planForm.reset();
            this.editandoPlan = false;
            this.listarPlanes();
        }
    }

    inscribirPlan(planId: number) {
        this.planService.inscribirseEnPlan(planId).subscribe(() => {
            this.sweetAlertService.showSuccessMessage('¡Inscripcion realizada exitosamente!');

            console.log('Inscripción exitosa');
        });
    }

    eliminarInscripcion(inscripcionId: number) {
        this.planService.eliminarInscripcion(inscripcionId).subscribe( {
            next: response => {
                console.log(response);
                this.listarInscripciones();
                this.sweetAlertService.showSuccessMessage('¡Inscripcion a Plan eliminado exitosamente!');
                console.log('Inscripción eliminada');
            }, error: error => {
                this.listarInscripciones();
                console.error('Error al eliminar la inscripcion', error);
            }
        });
    }


    listarInscripciones() {
        this.planService.getInscripcionesCliente().subscribe(
            (data) => {
                this.inscripciones = data;
                console.log(data);
                this.sweetAlertService.showSuccessMessage('¡Inscripciones cargadas exitosamente!');
            },
            error => {
                console.error('Error al cargar las inscripciones', error);
            }
        );
    }

}
