package com.projeto3.backend.repository;

import com.projeto3.backend.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Integer> {
} 