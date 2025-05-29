package com.projeto3.backend.repository;

import com.projeto3.backend.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByPostagemIdPost(int idPost);
}
