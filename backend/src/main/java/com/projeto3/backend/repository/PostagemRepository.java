package com.projeto3.backend.repository;

import com.projeto3.backend.model.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PostagemRepository extends JpaRepository<Postagem, Long> {

    // Buscar todas as postagens de um fórum específico (pelo ID do fórum)
    List<Postagem> findByForumId(Long forumId);

    // Buscar todas as postagens de um autor específico (pelo ID do autor)
    List<Postagem> findByAutorId(Long autorId);

    // Buscar postagens feitas em uma data específica
    List<Postagem> findByDataPostagem(LocalDate data);

    // Buscar postagens feitas após uma data específica
    List<Postagem> findByDataPostagemAfter(LocalDate data);

    // Buscar postagens entre duas datas
    List<Postagem> findByDataPostagemBetween(LocalDate inicio, LocalDate fim);

    // Buscar postagens cujo conteúdo contenha uma determinada palavra/frase (ignorar maiúsculas/minúsculas)
    List<Postagem> findByConteudoContainingIgnoreCase(String termo);
}
