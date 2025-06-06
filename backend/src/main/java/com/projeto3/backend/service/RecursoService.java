package com.projeto3.backend.service;

import com.projeto3.backend.model.Recurso;
import com.projeto3.backend.repository.RecursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecursoService {
    @Autowired
    private RecursoRepository recursoRepository;

    public List<Recurso> listarTodos() {
        return recursoRepository.findAll();
    }

    public Optional<Recurso> buscarPorId(int id) {
        return recursoRepository.findById(id);
    }

    public List<Recurso> buscarPorCursoId(int cursoId) {
        return recursoRepository.findByCursoId(cursoId);
    }

    public Recurso salvar(Recurso recurso) {
        return recursoRepository.save(recurso);
    }

    public void deletar(int id) {
        recursoRepository.deleteById(id);
    }
} 