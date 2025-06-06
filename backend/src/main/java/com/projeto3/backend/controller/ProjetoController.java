package com.projeto3.backend.controller;

import com.projeto3.backend.model.Projeto;
import com.projeto3.backend.service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/projetos")
@CrossOrigin(origins = "*")
public class ProjetoController {
    @Autowired
    private ProjetoService projetoService;

    @GetMapping
    public List<Projeto> listarTodos() {
        return projetoService.listarTodos();
    }

    @PostMapping
    public Projeto salvar(@RequestBody Projeto projeto) {
        return projetoService.salvar(projeto);
    }
} 