package com.projeto.backend.controller;

import com.projeto.backend.entity.Forum;
import com.projeto.backend.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/foruns")
@CrossOrigin(origins = "*")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @GetMapping
    public List<Forum> listarTodos() {
        return forumService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Forum> buscarPorId(@PathVariable Long id) {
        return forumService.buscarPorId(id);
    }

    @GetMapping("/titulo/{titulo}")
    public List<Forum> buscarPorTitulo(@PathVariable String titulo) {
        return forumService.buscarPorTitulo(titulo);
    }

    @PostMapping
    public Forum salvar(@RequestBody Forum forum) {
        return forumService.salvarForum(forum);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        forumService.excluirForum(id);
    }
}
