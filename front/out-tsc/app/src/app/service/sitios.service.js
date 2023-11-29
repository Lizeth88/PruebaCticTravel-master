import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let SitiosService = class SitiosService {
    constructor(http) {
        this.http = http;
        this.api = 'http://localhost:8080/api/sitios'; // Ajusta la URL de tu API
    }
    getAllSitios() {
        return this.http.get(`${this.api}`);
    }
    getSitioById(id) {
        return this.http.get(`${this.api}/${id}`);
    }
    agregarSitio(sitio) {
        return this.http.post(`${this.api}`, sitio);
    }
    actualizarSitio(sitio) {
        return this.http.put(`${this.api}/${sitio.id}`, sitio);
    }
    eliminarSitio(id) {
        return this.http.delete(`${this.api}/${id}`);
    }
};
SitiosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SitiosService);
export { SitiosService };
//# sourceMappingURL=sitios.service.js.map