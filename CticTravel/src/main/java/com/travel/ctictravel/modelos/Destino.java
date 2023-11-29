package com.travel.ctictravel.modelos;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Destino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pais;
    private String departamento;
    private String municipios;
    private String lugares;

//Un destino turístico puede tener varios planes turísticos, pero un plan turístico pertenece a un solo destino turístico
    @OneToMany(mappedBy = "destino")
    private List<Plan> plan;

}
