package com.projeto3.backend.repository;

import com.projeto3.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Buscar por e-mail (usado para login ou verificação de existência)
    Optional<Usuario> findByEmail(String email);

    // Buscar lista de usuários por nome (pesquisa parcial, case-insensitive)
    List<Usuario> findByNomeContainingIgnoreCase(String nome);

    // Verificar se já existe um e-mail cadastrado (validação de cadastro)
    boolean existsByEmail(String email);
}
