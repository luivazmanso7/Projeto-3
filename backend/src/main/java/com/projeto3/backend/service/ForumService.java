package com.projeto3.backend.service;

import com.projeto3.backend.model.Forum;
import com.projeto3.backend.repository.ForumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ForumService {

    @Autowired
    private ForumRepository forumRepository;

    public Forum salvarForum(Forum forum) {
        return forumRepository.save(forum);
    }

    public List<Forum> listarTodos() {
        return forumRepository.findAll();
    }

    public Optional<Forum> buscarPorId(Long id) {
        return forumRepository.findById(id);
    }

    public List<Forum> buscarPorTitulo(String titulo) {
        return forumRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public void excluirForum(Long id) {
        forumRepository.deleteById(id);
    }
}
