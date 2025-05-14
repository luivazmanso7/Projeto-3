package com.projeto3.backend.service;

import com.projeto3.backend.model.Postagem;
import com.projeto3.backend.repository.PostagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PostagemService {

    @Autowired
    private PostagemRepository postagemRepository;

    public Postagem salvarPostagem(Postagem postagem) {
        return postagemRepository.save(postagem);
    }

    public List<Postagem> listarPostagens() {
        return postagemRepository.findAll();
    }

    public Optional<Postagem> buscarPorId(Long id) {
        return postagemRepository.findById(id);
    }

    public List<Postagem> buscarPorConteudo(String conteudo) {
        return postagemRepository.findByConteudoContainingIgnoreCase(conteudo);
    }

    public List<Postagem> buscarPorAutorId(Long autorId) {
        return postagemRepository.findByAutorId(autorId);
    }

    public List<Postagem> buscarPorData(LocalDate inicio, LocalDate fim) {
        return postagemRepository.findByDataPostagemBetween(inicio, fim);
    }

    public void excluirPostagem(Long id) {
        postagemRepository.deleteById(id);
    }
}
