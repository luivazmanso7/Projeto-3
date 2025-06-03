package com.projeto3.backend.service;

import com.projeto3.backend.model.Comentario;
import com.projeto3.backend.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public Comentario salvarComentario(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    public List<Comentario> listarPorPostagem(int idPost) {
        return comentarioRepository.findByPostagemIdPost(idPost);
    }
}
