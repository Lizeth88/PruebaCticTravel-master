import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private api = 'http://localhost:8080/api'; // Ajusta la URL de tu API
  constructor(private http: HttpClient) { }

  getUserDetails(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.api}/${email}`);
  }
}
