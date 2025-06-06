package com.projeto3.backend.controller;

import com.projeto3.backend.model.Curso;
import com.projeto3.backend.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "*")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public List<Curso> listarCursos() {
        return cursoService.listarCursos();
    }

    @GetMapping("/{id}")
    public Optional<Curso> buscarPorId(@PathVariable Long id) {
        return cursoService.buscarPorId(id);
    }

    @GetMapping("/buscar/{nome}")
    public List<Curso> buscarPorNome(@PathVariable String nome) {
        return cursoService.buscarPorNome(nome);
    }

    @PostMapping
    public Curso salvarCurso(@RequestBody Curso curso) {
        return cursoService.salvarCurso(curso);
    }

    @DeleteMapping("/{id}")
    public void excluirCurso(@PathVariable Long id) {
        cursoService.excluirCurso(id);
    }

    @GetMapping("/teste")
    public List<Curso> listarCursosTeste() {
        Curso curso1 = new Curso();
        curso1.setId(1);
        curso1.setNomeCurso("Java Básico");
        
        Curso curso2 = new Curso();
        curso2.setId(2);
        curso2.setNomeCurso("Spring Boot");
        
        return List.of(curso1, curso2);
    }
}
