package com.projeto.backend.controller;

import com.projeto.backend.entity.Postagem;
import com.projeto.backend.service.PostagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/postagens")
@CrossOrigin(origins = "*")
public class PostagemController {

    @Autowired
    private PostagemService postagemService;

    @GetMapping
    public List<Postagem> listar() {
        return postagemService.listarPostagens();
    }

    @GetMapping("/{id}")
    public Optional<Postagem> buscarPorId(@PathVariable Long id) {
        return postagemService.buscarPorId(id);
    }

    @GetMapping("/conteudo/{termo}")
    public List<Postagem> buscarPorConteudo(@PathVariable String termo) {
        return postagemService.buscarPorConteudo(termo);
    }

    @GetMapping("/autor/{autorId}")
    public List<Postagem> buscarPorAutor(@PathVariable Long autorId) {
        return postagemService.buscarPorAutorId(autorId);
    }

    @GetMapping("/entreDatas")
    public List<Postagem> buscarPorData(@RequestParam String inicio, @RequestParam String fim) {
        return postagemService.buscarPorData(LocalDate.parse(inicio), LocalDate.parse(fim));
    }

    @PostMapping
    public Postagem salvar(@RequestBody Postagem postagem) {
        return postagemService.salvarPostagem(postagem);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        postagemService.excluirPostagem(id);
    }
}
