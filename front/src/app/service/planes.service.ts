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
    return this.http.get<Plan[]>(`${this.apiUrl}/listar`);
  }

  getPlanById(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.apiUrl}/${id}`);
  }
}
