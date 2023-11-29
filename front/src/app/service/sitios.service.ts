import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sitio} from "../model/sitio.model";

@Injectable({
  providedIn: 'root'
})
export class SitiosService {
  private api = 'http://localhost:8080/api/sitios'; // Ajusta la URL de tu API
  constructor(private http: HttpClient) { }

  getAllSitios(): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(`${this.api}`);
  }

  getSitioById(id: number): Observable<Sitio> {
    return this.http.get<Sitio>(`${this.api}/${id}`);
  }

  agregarSitio(sitio: Sitio): Observable<any> {
    return this.http.post(`${this.api}`, sitio);
  }

  actualizarSitio(sitio: Sitio): Observable<any> {
    return this.http.put(`${this.api}/${sitio.id}`, sitio);
  }

  eliminarSitio(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

}
