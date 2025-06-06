package com.projeto3.backend.service;

import com.projeto3.backend.model.Postagem;
import com.projeto3.backend.repository.PostagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PostagemService {

    @Autowired
    private PostagemRepository postagemRepository;

    @Transactional(readOnly = true)
    public List<Postagem> listarTodas() {
        return postagemRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Postagem> buscarPorId(Integer id) {
        return postagemRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Postagem> buscarPorAutor(Integer autorId) {
        return postagemRepository.findByAutor_Id(autorId);
    }

    @Transactional(readOnly = true)
    public List<Postagem> buscarPorForum(Integer forumId) {
        return postagemRepository.findByForumIdForum(forumId);
    }

    @Transactional(readOnly = true)
    public List<Postagem> buscarPorConteudo(String termo) {
        return postagemRepository.findByConteudoContainingIgnoreCase(termo);
    }

    @Transactional(readOnly = true)
    public List<Postagem> buscarPorData(LocalDate data) {
        return postagemRepository.findByDataPostagem(data);
    }

    @Transactional(readOnly = true)
    public List<Postagem> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return postagemRepository.findByDataPostagemBetween(inicio, fim);
    }

    public Postagem salvarPostagem(Postagem postagem) {
        // Se não tem data de postagem, define como hoje
        if (postagem.getDataPostagem() == null) {
            postagem.setDataPostagem(LocalDate.now());
        }
        return postagemRepository.save(postagem);
    }

    public void deletarPostagem(Integer id) {
        postagemRepository.deleteById(id);
    }
}
