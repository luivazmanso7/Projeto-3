package com.projeto3.backend.service;

import com.projeto3.backend.model.Usuario;
import com.projeto3.backend.model.Certificado;
import com.projeto3.backend.repository.UsuarioRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvar(Usuario usuario) {
        // Validações adicionais antes de salvar
        if (usuario.getNome() == null || usuario.getNome().trim().length() < 3) {
            throw new IllegalArgumentException("O nome deve ter pelo menos 3 caracteres.");
        }
        
        if (usuario.getEmail() == null || usuario.getEmail().trim().length() < 5) {
            throw new IllegalArgumentException("O email deve ter pelo menos 5 caracteres.");
        }
        
        if (usuario.getSenha() == null || usuario.getSenha().length() < 6) {
            throw new IllegalArgumentException("A senha deve ter pelo menos 6 caracteres.");
        }
        
        // Verifica se o email já existe
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("Este email já está cadastrado no sistema.");
        }
        
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }
    

    public void deletar(Integer id) {
        usuarioRepository.deleteById(id);
    }
    

    public void salvarCertificado(Integer idUsuario, Certificado certificado) {
        Optional<Usuario> opt = usuarioRepository.findById(idUsuario);
        if (opt.isPresent()) {
            Usuario usuario = opt.get();
            usuario.getCertificados().add(certificado);
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("Usuário não encontrado: " + idUsuario);
        }
    }
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    //Admin padrão
    @PostConstruct
    public void criarAdmin(){
        if (!usuarioRepository.existsByEmail("admin@admin.com")) {
            Usuario admin = new Usuario();
            admin.setNome("Admin");
            admin.setEmail("admin@admin.com");
            admin.setSenha("admin123"); 
            admin.setAdministrador(true);
            // Usa save direto para não passar pelas validações de negócio
            usuarioRepository.save(admin);
        }
    }
}