package com.projeto3.backend.controller;

import com.projeto3.backend.model.Recurso;
import com.projeto3.backend.service.RecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recursos")
@CrossOrigin(origins = "*")
public class RecursoController {
    @Autowired
    private RecursoService recursoService;

    @GetMapping
    public List<Recurso> listarTodos() {
        return recursoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Recurso> buscarPorId(@PathVariable int id) {
        return recursoService.buscarPorId(id);
    }

    @GetMapping("/curso/{cursoId}")
    public List<Recurso> buscarPorCursoId(@PathVariable int cursoId) {
        return recursoService.buscarPorCursoId(cursoId);
    }

    @PostMapping
    public Recurso salvar(@RequestBody Recurso recurso) {
        return recursoService.salvar(recurso);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        recursoService.deletar(id);
    }
} 