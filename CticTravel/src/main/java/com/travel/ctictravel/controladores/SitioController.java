package com.travel.ctictravel.controladores;

import com.travel.ctictravel.modelos.Sitio;
import com.travel.ctictravel.servicios.SitioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sitios")
public class SitioController {
    private final SitioService sitioService;

    @Autowired
    public SitioController(SitioService sitioService) {
        this.sitioService = sitioService;
    }

    @GetMapping
    public ResponseEntity<List<Sitio>> obtenerTodosLosSitios() {
        List<Sitio> sitios = sitioService.obtenerTodosLosSitios();
        return ResponseEntity.ok(sitios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sitio> obtenerSitioPorId(@PathVariable Long id) {
        Sitio sitio = sitioService.obtenerSitioPorId(id);
        return ResponseEntity.ok(sitio);
    }

    @PostMapping
    public ResponseEntity<Sitio> crearSitio(@RequestBody Sitio sitio) {
        Sitio nuevoSitio = sitioService.crearSitio(sitio);
        return ResponseEntity.ok(nuevoSitio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSitio(@PathVariable Long id) {
        sitioService.eliminarSitio(id);
        return ResponseEntity.noContent().build();
    }
}
