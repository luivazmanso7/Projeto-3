package com.projeto3.backend.service;

import com.projeto3.backend.model.DashboardAdmin;
import com.projeto3.backend.repository.DashboardAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DashboardAdminService {
    @Autowired
    private DashboardAdminRepository dashboardAdminRepository;

    public DashboardAdmin getUltimoResumo() {
        return dashboardAdminRepository.findTopByOrderByDataAtualizacaoDesc();
    }

    public DashboardAdmin salvar(DashboardAdmin dashboardAdmin) {
        return dashboardAdminRepository.save(dashboardAdmin);
    }

    public List<DashboardAdmin> listarTodos() {
        return dashboardAdminRepository.findAll();
    }
} 