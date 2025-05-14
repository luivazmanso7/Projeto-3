package com.projeto3.backend.repository;

import com.projeto3.backend.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface CursoRepository extends JpaRepository<Curso, Long> {

    // Buscar curso pelo nome exato
    Curso findByCursoNome(String cursoNome);

    // Buscar cursos cujo nome contenha uma determinada string (ignorando maiúsculas/minúsculas)
    List<Curso> findByCursoNomeContainingIgnoreCase(String termo);

    // Verificar se existe um curso com determinado nome
    boolean existsByCursoNome(String cursoNome);

    // Buscar cursos por parte do conteúdo do campo "certificado"
    List<Curso> findByCertificadoContainingIgnoreCase(String descricaoCertificado);
}
