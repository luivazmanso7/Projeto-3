package com.projeto3.backend.service;

import com.projeto3.backend.model.Projeto;
import com.projeto3.backend.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjetoService {
    @Autowired
    private ProjetoRepository projetoRepository;

    public List<Projeto> listarTodos() {
        return projetoRepository.findAll();
    }

    public Projeto salvar(Projeto projeto) {
        return projetoRepository.save(projeto);
    }
} 