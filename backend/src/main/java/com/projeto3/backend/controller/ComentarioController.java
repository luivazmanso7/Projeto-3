package com.projeto3.backend.controller;

import com.projeto3.backend.model.Comentario;
import com.projeto3.backend.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @GetMapping("/postagem/{idPost}")
    public List<Comentario> listarPorPostagem(@PathVariable int idPost) {
        return comentarioRepository.findByPostagemIdPost(idPost);
    }

    @PostMapping
    public Comentario adicionarComentario(@RequestBody Comentario comentario) {
        return comentarioRepository.save(comentario);
    }
}
