package com.projeto3.backend.controller;

import com.projeto3.backend.model.Postagem;
import com.projeto3.backend.service.PostagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/postagens")
@CrossOrigin(origins = "*")
public class PostagemController {

    @Autowired
    private PostagemService postagemService;

    @GetMapping
    public List<Postagem> listarTodas() {
        return postagemService.listarTodas();
    }

    @GetMapping("/{id}")
    public Optional<Postagem> buscarPorId(@PathVariable Long id) {
        return postagemService.buscarPorId(id);
    }

    @PostMapping
    public Postagem criarPostagem(@RequestBody Postagem postagem) {
        return postagemService.salvarPostagem(postagem);
    }

    @DeleteMapping("/{id}")
    public void deletarPostagem(@PathVariable Long id) {
        postagemService.deletarPostagem(id);
    }

    @PutMapping("/{id}/curtir")
    public Postagem curtirPostagem(@PathVariable Long id) {
        Optional<Postagem> postagemOpt = postagemService.buscarPorId(id);
        if (postagemOpt.isPresent()) {
            Postagem postagem = postagemOpt.get();
            postagem.adicionarCurtida();
            return postagemService.salvarPostagem(postagem);
        } else {
            throw new RuntimeException("Postagem não encontrada com ID: " + id);
        }
    }
}
