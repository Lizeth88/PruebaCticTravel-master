import { __decorate } from "tslib";
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, tap } from "rxjs";
let AuthService = class AuthService {
    get estaConectado() {
        return this.conectado.asObservable();
    }
    get currentUser() {
        return this._currentUser.asObservable();
    }
    constructor(sweetAlertService, http, router) {
        this.sweetAlertService = sweetAlertService;
        this.http = http;
        this.router = router;
        this.api = 'http://localhost:8080/api/auth';
        this.currentUserSig = signal(undefined);
        this._currentUser = new BehaviorSubject(undefined);
        this.conectado = new BehaviorSubject(this.tokenDisponible());
    }
    tokenDisponible() {
        return typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null;
    }
    hasRole(rol) {
        const local = localStorage.getItem('usuario');
        if (local) {
            const usuario = JSON.parse(local);
            const roles = usuario?.roles || [];
            // console.log(roles);
            return roles.some((r) => r.nombre === rol);
        }
        else
            return false;
    }
    login(email, password) {
        localStorage.removeItem('token');
        return this.http.post(`${this.api}/login`, { email, password })
            .pipe(tap(response => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('usuario', JSON.stringify(response.usuario));
                this.conectado.next(true);
                this.currentUserSig.set(response.usuario);
            }
        }));
    }
    register(nombre, email, password) {
        return this.http.post(`${this.api}/register`, { nombre, email, password })
            .pipe(tap(response => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                this.currentUserSig.set(response.usuario);
                this.conectado.next(true);
            }
        }));
    }
    user() {
        return this.http.get(`${this.api}/user`)
            .pipe(tap(response => {
            if (response.token) {
                this.currentUserSig.set(response.usuario);
                this.conectado.next(true);
            }
        }));
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        console.log("redirect");
        this.router.navigate(['/login']);
        this.currentUserSig.set(null);
        this.conectado.next(false);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map