package com.projeto3.backend.repository;

import com.projeto3.backend.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Integer> {

    List<Curso> findByCursoNomeContainingIgnoreCase(String cursoNome);

    boolean existsByCursoNome(String cursoNome);
}
