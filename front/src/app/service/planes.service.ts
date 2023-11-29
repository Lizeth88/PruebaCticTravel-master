import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plan} from "../model/plan.model";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private apiUrl = 'http://tu-api.com/api/planes-turisticos'; // Ajusta la URL de tu API
  constructor(private http: HttpClient) { }

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
}
