package com.projeto3.backend.service;

import com.projeto3.backend.model.Curso;
import com.projeto3.backend.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public Curso salvarCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    public Optional<Curso> buscarPorId(Long id) {
        return cursoRepository.findById(id);
    }

    public List<Curso> buscarPorNome(String nome) {
        return cursoRepository.findByNomeCursoContainingIgnoreCase(nome);
    }

    public void excluirCurso(Long id) {
        cursoRepository.deleteById(id);
    }
}
