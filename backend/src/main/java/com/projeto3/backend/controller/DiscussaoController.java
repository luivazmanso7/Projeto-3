package com.projeto3.backend.controller;

import com.projeto3.backend.model.Discussao;
import com.projeto3.backend.repository.DiscussaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discussoes")
@CrossOrigin(origins = "http://localhost:3000")
public class DiscussaoController {

    @Autowired
    private DiscussaoRepository discussaoRepository;

    @GetMapping
    public List<Discussao> listar() {
        return discussaoRepository.findAll();
    }

    @PostMapping
    public Discussao criar(@RequestBody Discussao discussao) {
        return discussaoRepository.save(discussao);
    }

    @PutMapping("/{id}/like")
    public Discussao like(@PathVariable int id) {
        Discussao d = discussaoRepository.findById(id).orElseThrow();
        d.setLikes(d.getLikes() + 1);
        return discussaoRepository.save(d);
    }

    @PutMapping("/{id}/dislike")
    public Discussao dislike(@PathVariable int id) {
        Discussao d = discussaoRepository.findById(id).orElseThrow();
        d.setDislikes(d.getDislikes() + 1);
        return discussaoRepository.save(d);
    }
} 