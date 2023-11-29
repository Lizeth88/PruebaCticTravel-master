package com.travel.ctictravel.servicios;

import com.travel.ctictravel.modelos.Sitio;
import com.travel.ctictravel.repositorios.SitioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SitioService {
    private final SitioRepository sitioRepository;

    @Autowired
    public SitioService(SitioRepository sitioRepository) {
        this.sitioRepository = sitioRepository;
    }

    public List<Sitio> obtenerTodosLosSitios() {
        return sitioRepository.findAll();
    }

    public Sitio obtenerSitioPorId(Long id) {
        return sitioRepository.findById(id).orElse(null);
    }

    public Sitio crearSitio(Sitio sitio) {
        return sitioRepository.save(sitio);
    }

    public void eliminarSitio(Long id) {
        sitioRepository.deleteById(id);
    }

}

