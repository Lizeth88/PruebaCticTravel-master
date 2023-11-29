package com.travel.ctictravel.controladores;

import com.travel.ctictravel.modelos.Plan;
import com.travel.ctictravel.servicios.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planes")
public class PlanController {
    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<Plan>> obtenerTodosLosPlanes() {
        List<Plan> planes = planService.obtenerTodosLosPlanes();
        return ResponseEntity.ok(planes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> obtenerPlanPorId(@PathVariable Long id) {
        Plan plan = planService.obtenerPlanPorId(id);
        return ResponseEntity.ok(plan);
    }

    @PostMapping
    public ResponseEntity<Plan> crearPlan(@RequestBody Plan plan) {
        Plan nuevoPlan = planService.crearPlan(plan);
        return ResponseEntity.ok(nuevoPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPlan(@PathVariable Long id) {
        planService.eliminarPlan(id);
        return ResponseEntity.noContent().build();
    }
}
