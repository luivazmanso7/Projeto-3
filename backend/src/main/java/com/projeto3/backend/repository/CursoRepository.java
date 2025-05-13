package com.projeto3.backend.repository;

import com.projeto3.backend.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Integer> {}