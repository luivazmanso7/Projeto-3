package com.projeto3.backend.controller;

import com.projeto3.backend.model.DashboardCliente;
import com.projeto3.backend.service.DashboardClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/dashboard/cliente")
@CrossOrigin(origins = "*")
public class DashboardClienteController {
    @Autowired
    private DashboardClienteService dashboardClienteService;

    @GetMapping("/usuario/{usuarioId}")
    public List<DashboardCliente> listarPorUsuario(@PathVariable int usuarioId) {
        return dashboardClienteService.listarPorUsuario(usuarioId);
    }

    @PostMapping
    public DashboardCliente salvar(@RequestBody DashboardCliente dashboardCliente) {
        return dashboardClienteService.salvar(dashboardCliente);
    }

    @GetMapping
    public List<DashboardCliente> listarTodos() {
        return dashboardClienteService.listarTodos();
    }
} 