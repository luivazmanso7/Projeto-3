package com.projeto.backend.service;

import com.projeto.backend.entity.Certificado;
import com.projeto.backend.entity.Usuario;
import com.projeto.backend.repository.CertificadoRepository;
import com.projeto.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CertificadoRepository certificadoRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void salvarCertificado(Long idUsuario, Certificado certificado) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        certificado.setUsuario(usuario);
        certificadoRepository.save(certificado);

        usuario.getCertificados().add(certificado);
        usuarioRepository.save(usuario);
    }
}
