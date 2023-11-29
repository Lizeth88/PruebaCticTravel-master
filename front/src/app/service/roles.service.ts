import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://tu-api.com/api/roles'; // Ajusta la URL de tu API

  constructor(private http: HttpClient) { }


}
