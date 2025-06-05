package com.projeto3.backend.controller;

import com.projeto3.backend.dto.PostagemDTO;
import com.projeto3.backend.model.Postagem;
import com.projeto3.backend.service.PostagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Postagem> criarPostagem(@RequestBody Postagem postagem) {
        try {
            Postagem novaPostagem = postagemService.salvarPostagem(postagem);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaPostagem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/nova")
    public ResponseEntity<Postagem> criarNovaPostagem(@RequestBody PostagemDTO postagemDTO) {
        try {
            Postagem novaPostagem = postagemService.criarPostagem(postagemDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaPostagem);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPostagem(@PathVariable Long id) {
        postagemService.deletarPostagem(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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
