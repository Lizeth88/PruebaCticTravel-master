package com.travel.ctictravel.modelos;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Inscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//Un usuario puede tener varias inscripciones, pero una inscripción pertenece a un solo usuario
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private LocalDateTime fechaInscripcion;

    @Enumerated(EnumType.STRING)
    private EstadoInscripcion estado;

}
