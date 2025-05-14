package com.projeto3.backend.repository;

import com.projeto3.backend.model.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForumRepository extends JpaRepository<Forum, Long> {

    // Buscar todos os fóruns criados por um usuário específico (pelo ID do autor)
    List<Forum> findByAutorId(Long autorId);

    // Buscar fórum pelo título exato
    Forum findByTitulo(String titulo);

    // Buscar fóruns cujo título contenha um termo (case insensitive)
    List<Forum> findByTituloContainingIgnoreCase(String termo);

    // Verificar se já existe um fórum com determinado título
    boolean existsByTitulo(String titulo);
}
