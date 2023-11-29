import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from "rxjs";
let PlanesService = class PlanesService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = 'http://localhost:8080/api/planes'; // Ajusta la URL de tu API
    }
    getAllPlanes() {
        return this.http.get(this.apiUrl);
    }
    agregarPlan(plan) {
        return this.http.post(this.apiUrl, plan);
    }
    actualizarPlan(plan) {
        const url = `${this.apiUrl}/${plan.id}`;
        return this.http.put(url, plan);
    }
    eliminarPlan(id) {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }
    inscribirseEnPlan(planId) {
        const local = localStorage.getItem('usuario');
        if (local) {
            const usuario = JSON.parse(local);
            const url = `${this.apiUrl}/inscribir/${planId}/${usuario.id}`;
            return this.http.post(url, {});
        }
        else {
            // Manejar el caso en el que el usuario no está autenticado
            console.error('Usuario no autenticado');
            return throwError('Usuario no autenticado');
        }
    }
    eliminarInscripcion(inscripcionId) {
        const url = `${this.apiUrl}/inscribir/${inscripcionId}`;
        return this.http.delete(url);
    }
    getInscripcionesCliente() {
        const local = localStorage.getItem('usuario');
        if (local) {
            const usuario = JSON.parse(local);
            const url = `${this.apiUrl}/inscripciones/${usuario.id}`;
            return this.http.get(url);
        }
        else {
            // Manejar el caso en el que el usuario no está autenticado
            console.error('Usuario no autenticado');
            return throwError('Usuario no autenticado');
        }
    }
};
PlanesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanesService);
export { PlanesService };
//# sourceMappingURL=planes.service.js.map