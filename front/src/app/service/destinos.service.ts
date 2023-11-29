import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Destino} from "../model/destino.model";

@Injectable({
  providedIn: 'root'
})
export class DestinosService {
  private api = 'http://localhost:8080/api/destinos';
  constructor(private http: HttpClient) { }

  getAllDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(`${this.api}`);
  }

  getDestinoById(id: number): Observable<Destino> {
    return this.http.get<Destino>(`${this.api}/${id}`);
  }

  agregarDestino(destino: Destino): Observable<any> {
    return this.http.post(`${this.api}`, destino);
  }

  actualizarDestino(destino: Destino): Observable<any> {
    return this.http.put(`${this.api}/${destino.id}`, destino);
  }

  eliminarDestino(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

}
