package com.projeto3.backend.service;

import com.projeto3.backend.model.Usuario;
import com.projeto3.backend.repository.UsuarioRepository;
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
        return usuarioRepository.save(usuario);
    }
    
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
    
    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }
    
    public void removerPorId(Integer id) {
        usuarioRepository.deleteById(id);
    }
}