package com.projeto3.backend.repository;

import com.projeto3.backend.model.DashboardCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DashboardClienteRepository extends JpaRepository<DashboardCliente, Integer> {
    List<DashboardCliente> findByUsuarioId(int usuarioId);
} 