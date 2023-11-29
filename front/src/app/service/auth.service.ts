import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SweetAlertService} from "../util/sweet-alert.service";
import {Usuario} from "../model/usuario.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:8080/api/auth'
  currentUserSig = signal<Usuario | undefined | null>(undefined);

  private _currentUser = new BehaviorSubject<Usuario | undefined | null>(undefined);
  conectado = new BehaviorSubject<boolean>(this.tokenDisponible());

  get estaConectado(){
    return this.conectado.asObservable();
  }
  get currentUser() {
    return this._currentUser.asObservable();
  }
  constructor(private sweetAlertService: SweetAlertService, private http: HttpClient, private router: Router) { }

  public tokenDisponible(): boolean{
    return typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null;
  }

  hasRole(rol: string): boolean{
    const local = localStorage.getItem('usuario');
    if (local) {
      const usuario = JSON.parse(local);
      const roles = usuario?.roles || [];
      // console.log(roles);

      return roles.some((r: any) => r.nombre === rol);
    }else
      return false;
  }



  login(email: string, password: string): Observable<any>{
    localStorage.removeItem('token');
    return this.http.post<any>(`${this.api}/login`, {email, password})
      .pipe(
        tap(response =>{
          if (response.token){
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            this.conectado.next(true);
            this.currentUserSig.set(response.usuario);
          }
        })
      );
  }

  register(nombre:string, email: string, password:string): Observable<any>{
    return this.http.post<any>(`${this.api}/register`, {nombre, email, password})
      .pipe(
        tap(response =>{
          if (response.token){
            localStorage.setItem('token', response.token);
            this.currentUserSig.set(response.usuario);
            this.conectado.next(true);
          }
        })
      );
  }

  user(): Observable<any>{
    return this.http.get<any>(`${this.api}/user`)
      .pipe(
        tap(response =>{
          if (response.token){
            this.currentUserSig.set(response.usuario);
            this.conectado.next(true);
          }
        })
      );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    console.log("redirect")
    this.router.navigate(['/login']);
    this.currentUserSig.set(null);

    this.conectado.next(false);
  }

}
