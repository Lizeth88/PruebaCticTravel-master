package com.travel.ctictravel.controladores;

import com.travel.ctictravel.modelos.Destino;
import com.travel.ctictravel.servicios.DestinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinos")
public class DestinoController {
    private final DestinoService destinoService;

    @Autowired
    public DestinoController(DestinoService destinoService) {
        this.destinoService = destinoService;
    }

    @GetMapping
    public ResponseEntity<List<Destino>> obtenerTodosLosDestinos() {
        List<Destino> destinos = destinoService.obtenerTodosLosDestinos();
        return ResponseEntity.ok(destinos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destino> obtenerDestinoPorId(@PathVariable Long id) {
        Destino destino = destinoService.obtenerDestinoPorId(id);
        return ResponseEntity.ok(destino);
    }

    @PostMapping
    public ResponseEntity<Destino> crearDestino(@RequestBody Destino destino) {
        Destino nuevoDestino = destinoService.crearDestino(destino);
        return ResponseEntity.ok(nuevoDestino);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destino> actualizarDestino(@PathVariable Long id,@RequestBody Destino destino) {
      destino.setId(id);
      Destino nuevoDestino = destinoService.actualizarDestino(destino);
      return ResponseEntity.ok(nuevoDestino);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDestino(@PathVariable Long id) {
        destinoService.eliminarDestino(id);
        return ResponseEntity.noContent().build();
    }
}
