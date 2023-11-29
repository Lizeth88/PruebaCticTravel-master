package com.travel.ctictravel.servicios;

import com.travel.ctictravel.modelos.EstadoInscripcion;
import com.travel.ctictravel.modelos.Inscripcion;
import com.travel.ctictravel.repositorios.InscripcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscripcionService {
    private final InscripcionRepository inscripcionRepository;

    @Autowired
    public InscripcionService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    public List<Inscripcion> obtenerTodasLasInscripciones() {
        return inscripcionRepository.findAll();
    }

    public Inscripcion obtenerInscripcionPorId(Long id) {
        return inscripcionRepository.findById(id).orElse(null);
    }

    public Inscripcion crearInscripcion(Inscripcion inscripcion){
        inscripcion.setEstado(EstadoInscripcion.ACTIVO); // Por defecto, la inscripción se crea como activa
        return inscripcionRepository.save(inscripcion);
    }

    public void eliminarInscripcion(Long id) {
        inscripcionRepository.deleteById(id);
    }

    public void inactivarInscripcion(Long id) {
        Inscripcion inscripcion = obtenerInscripcionPorId(id);
        if (inscripcion != null) {
            inscripcion.setEstado(EstadoInscripcion.INACTIVO);
            inscripcionRepository.save(inscripcion);
        }
    }

    public void activarInscripcion(Long id) {
        Inscripcion inscripcion = obtenerInscripcionPorId(id);
        if (inscripcion != null) {
            inscripcion.setEstado(EstadoInscripcion.ACTIVO);
            inscripcionRepository.save(inscripcion);
        }
    }
}
