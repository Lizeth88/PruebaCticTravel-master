import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {Plan} from "../model/plan.model";
import {AuthService} from "./auth.service";
import {Inscripcion} from "../model/inscripcion.model";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private apiUrl = 'http://localhost:8080/api/planes'; // Ajusta la URL de tu API
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }

  agregarPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }

  actualizarPlan(plan: Plan): Observable<Plan> {
    const url = `${this.apiUrl}/${plan.id}`;
    return this.http.put<Plan>(url, plan);
  }

  eliminarPlan(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  inscribirseEnPlan(planId: number): Observable<any> {
    const local = localStorage.getItem('usuario');
    if (local) {
      const usuario = JSON.parse(local);
      const url = `${this.apiUrl}/inscribir/${planId}/${usuario.id}`;
      return this.http.post(url, {});
    }else {
      // Manejar el caso en el que el usuario no está autenticado
      console.error('Usuario no autenticado');
      return throwError('Usuario no autenticado');
    }
  }

  eliminarInscripcion(inscripcionId: number): Observable<any> {
    const url = `${this.apiUrl}/inscribir/${inscripcionId}`;
    return this.http.delete<void>(url).pipe(
        tap((data) => {
          console.log(data);
        })
    );
  }


  getInscripcionesCliente(): Observable<any[]> {
    const local = localStorage.getItem('usuario');
    if (local) {
      const usuario = JSON.parse(local);
      const url = `${this.apiUrl}/inscripciones/${usuario.id}`;
      return this.http.get<any[]>(url);
    }else {
      // Manejar el caso en el que el usuario no está autenticado
      console.error('Usuario no autenticado');
      return throwError('Usuario no autenticado');
    }
  }
}
