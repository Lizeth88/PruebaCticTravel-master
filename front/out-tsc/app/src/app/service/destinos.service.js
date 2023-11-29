import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DestinosService = class DestinosService {
    constructor(http) {
        this.http = http;
        this.api = 'http://localhost:8080/api/destinos';
    }
    getAllDestinos() {
        return this.http.get(`${this.api}`);
    }
    getDestinoById(id) {
        return this.http.get(`${this.api}/${id}`);
    }
    agregarDestino(destino) {
        return this.http.post(`${this.api}`, destino);
    }
    actualizarDestino(destino) {
        return this.http.put(`${this.api}/${destino.id}`, destino);
    }
    eliminarDestino(id) {
        return this.http.delete(`${this.api}/${id}`);
    }
};
DestinosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DestinosService);
export { DestinosService };
//# sourceMappingURL=destinos.service.js.map