package com.projeto3.backend.service;

import com.projeto3.backend.model.Postagem;
import com.projeto3.backend.repository.PostagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostagemService {

    @Autowired
    private PostagemRepository postagemRepository;

    public List<Postagem> listarTodas() {
        return postagemRepository.findAll();
    }

    public Optional<Postagem> buscarPorId(Long id) {
        return postagemRepository.findById(id);
    }

    public Postagem salvarPostagem(Postagem postagem) {
        return postagemRepository.save(postagem);
    }

    public void deletarPostagem(Long id) {
        postagemRepository.deleteById(id);
    }
}
