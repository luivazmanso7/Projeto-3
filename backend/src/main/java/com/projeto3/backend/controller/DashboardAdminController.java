package com.projeto3.backend.controller;

import com.projeto3.backend.model.DashboardAdmin;
import com.projeto3.backend.service.DashboardAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/dashboard/admin")
@CrossOrigin(origins = "*")
public class DashboardAdminController {
    @Autowired
    private DashboardAdminService dashboardAdminService;

    @GetMapping
    public DashboardAdmin getUltimoResumo() {
        return dashboardAdminService.getUltimoResumo();
    }

    @PostMapping
    public DashboardAdmin salvar(@RequestBody DashboardAdmin dashboardAdmin) {
        return dashboardAdminService.salvar(dashboardAdmin);
    }

    @GetMapping("/historico")
    public List<DashboardAdmin> listarTodos() {
        return dashboardAdminService.listarTodos();
    }
} 