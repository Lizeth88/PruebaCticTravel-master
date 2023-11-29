package com.travel.ctictravel.servicios;

import com.travel.ctictravel.modelos.EstadoInscripcion;
import com.travel.ctictravel.modelos.Inscripcion;
import com.travel.ctictravel.modelos.Plan;
import com.travel.ctictravel.modelos.Usuario;
import com.travel.ctictravel.repositorios.InscripcionRepository;
import com.travel.ctictravel.repositorios.PlanRepository;
import com.travel.ctictravel.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlanService {

    private final InscripcionRepository inscripcionRepository;

    private final UsuarioRepository usuarioRepository;

    private final PlanRepository planRepository;

    @Autowired
    public PlanService(InscripcionRepository inscripcionRepository, UsuarioRepository usuarioRepository, PlanRepository planRepository) {
        this.inscripcionRepository = inscripcionRepository;
        this.usuarioRepository = usuarioRepository;
        this.planRepository = planRepository;
    }

    public List<Plan> obtenerTodosLosPlanes() {
        return planRepository.findAll();
    }

    public Plan obtenerPlanPorId(Long id) {
        return planRepository.findById(id).orElse(null);
    }

    public Plan crearPlan(Plan plan){
        return planRepository.save(plan);
    }

    public void eliminarPlan(Long id) {
        planRepository.deleteById(id);
    }

    public void inscribirseEnPlan(Long usuarioId,Long planId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

        if (plan.getCantidadPaquetes() > 0) {
            Inscripcion inscripcion = new Inscripcion();
            inscripcion.setUsuario(usuario);
            inscripcion.setPlan(plan);
            inscripcion.setFechaInscripcion(LocalDateTime.now());
            inscripcion.setEstado(EstadoInscripcion.ACTIVO);

            inscripcionRepository.save(inscripcion);

            // Restar un paquete disponible
            plan.setCantidadPaquetes(plan.getCantidadPaquetes() - 1);
            planRepository.save(plan);
        } else {
            throw new RuntimeException("No hay cupos disponibles para este plan");
        }
    }

    public void eliminarInscripcion(Long inscripcionId) {
        Inscripcion inscripcion = inscripcionRepository.findById(inscripcionId)
                .orElseThrow(() -> new RuntimeException("Inscripción no encontrada"));

        // Aumentar un paquete disponible al eliminar la inscripción
        Plan plan = inscripcion.getPlan();
        plan.setCantidadPaquetes(plan.getCantidadPaquetes() + 1);
        planRepository.save(plan);

        // Cambiar el estado de la inscripción
        inscripcion.setEstado(EstadoInscripcion.INACTIVO);
        inscripcionRepository.save(inscripcion);
    }

    public List<Inscripcion> getInscripcionesByUsuarioId(Long usuarioId) {
        return inscripcionRepository.findByUsuarioId(usuarioId);
    }

}
