package com.travel.ctictravel.repositorios;

import com.travel.ctictravel.modelos.Sitio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SitioRepository extends JpaRepository<Sitio, Long> {
}
