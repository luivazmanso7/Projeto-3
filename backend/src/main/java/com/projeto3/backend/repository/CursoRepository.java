package com.projeto3.backend.repository;

import com.projeto3.backend.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface CursoRepository extends JpaRepository<Curso, Long> {

    // Buscar curso pelo título exato
    Curso findByTitulo(String titulo);

    // Buscar cursos cujo título contenha uma determinada string (ignorando maiúsculas/minúsculas)
    List<Curso> findByTituloContainingIgnoreCase(String termo);

    // Verificar se existe um curso com determinado título
    boolean existsByTitulo(String titulo);
}
