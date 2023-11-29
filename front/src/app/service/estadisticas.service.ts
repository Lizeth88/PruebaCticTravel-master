import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private api = 'http://localhost:8080/api/destinos';
  constructor(private http: HttpClient) { }


  getEstadisticas(): Observable<any> {
    const url = 'tu_url_del_backend/api/estadisticas';
    return this.http.get<any>(url);
  }

}
