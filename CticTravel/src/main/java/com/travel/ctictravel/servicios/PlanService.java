package com.travel.ctictravel.servicios;

import com.travel.ctictravel.modelos.Plan;
import com.travel.ctictravel.repositorios.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {
    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
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

}
