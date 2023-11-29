package com.travel.ctictravel.modelos;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Sitio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreHospedaje;
    private String tipoHospedaje;
    private int cantidadHabitaciones;
    private String horarioCheckIn;
    private String horarioCheckOut;
    private String lugarUbicacion;

//Un sitio de hospedaje puede tener varios planes turísticos, pero un plan turístico pertenece a un solo sitio de hospedaje
    @OneToMany(mappedBy = "sitio")
    private List<Plan> plan;

}
