package com.projeto3.backend.repository;

import com.projeto3.backend.model.DashboardAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardAdminRepository extends JpaRepository<DashboardAdmin, Integer> {
    DashboardAdmin findTopByOrderByDataAtualizacaoDesc();
} 