package com.projeto3.backend.service;

import com.projeto3.backend.model.DashboardCliente;
import com.projeto3.backend.repository.DashboardClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DashboardClienteService {
    @Autowired
    private DashboardClienteRepository dashboardClienteRepository;

    public List<DashboardCliente> listarPorUsuario(int usuarioId) {
        return dashboardClienteRepository.findByUsuarioId(usuarioId);
    }

    public DashboardCliente salvar(DashboardCliente dashboardCliente) {
        return dashboardClienteRepository.save(dashboardCliente);
    }

    public List<DashboardCliente> listarTodos() {
        return dashboardClienteRepository.findAll();
    }
} 