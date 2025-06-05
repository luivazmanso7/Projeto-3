package com.projeto3.backend.service;

import com.projeto3.backend.dto.PostagemDTO;
import com.projeto3.backend.model.Postagem;
import com.projeto3.backend.model.Forum;
import com.projeto3.backend.model.Usuario;
import com.projeto3.backend.repository.PostagemRepository;
import com.projeto3.backend.repository.ForumRepository;
import com.projeto3.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PostagemService {

    @Autowired
    private PostagemRepository postagemRepository;

    @Autowired
    private ForumRepository forumRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Postagem> listarTodas() {
        return postagemRepository.findAll();
    }

    public Optional<Postagem> buscarPorId(Long id) {
        return postagemRepository.findById(id);
    }

    public Postagem salvarPostagem(Postagem postagem) {
        return postagemRepository.save(postagem);
    }

    public Postagem criarPostagem(PostagemDTO postagemDTO) {
        // Buscar forum e autor
        Forum forum = forumRepository.findById(postagemDTO.getForumId())
                .orElseThrow(() -> new RuntimeException("Forum não encontrado"));
        Usuario autor = usuarioRepository.findById(postagemDTO.getAutorId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Criar postagem
        Postagem postagem = new Postagem();
        postagem.setTitulo(postagemDTO.getTitulo());
        postagem.setConteudo(postagemDTO.getConteudo());
        postagem.setForum(forum);
        postagem.setAutor(autor);
        postagem.setDataPostagem(LocalDate.now());

        return postagemRepository.save(postagem);
    }

    public void deletarPostagem(Long id) {
        postagemRepository.deleteById(id);
    }
}
