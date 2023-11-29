package com.travel.ctictravel.modelos;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "destino_id")
    private Destino destino;

    @ManyToOne
    @JoinColumn(name = "hospedaje_id")
    private Sitio sitio;

    private int precioPaquete;
    private int duracionDias;
    private int duracionNoches;
    private String tipoTransporte;
    private int cantidadPaquetes;

//Un plan turístico puede tener varias inscripciones, pero una inscripción pertenece a un solo plan turístico
//    @OneToMany(mappedBy = "plan")
//    private List<Inscripcion> inscripcion;

}
