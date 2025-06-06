package com.projeto3.backend.repository;

import com.projeto3.backend.model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecursoRepository extends JpaRepository<Recurso, Integer> {
    List<Recurso> findByCursoId(int cursoId);
} 