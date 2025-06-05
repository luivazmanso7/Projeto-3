package com.projeto3.backend.service;

import com.projeto3.backend.model.Curso;
import com.projeto3.backend.model.Usuario;
import com.projeto3.backend.repository.CursoRepository;
import com.projeto3.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Curso salvarCurso(Curso curso, String emailUsuario) {
        // Validar se o usuário é administrador
        if (!isAdministrador(emailUsuario)) {
            throw new SecurityException("Apenas administradores podem criar cursos.");
        }
        
        // Validações de negócio
        if (curso.getTitulo() == null || curso.getTitulo().trim().length() < 3) {
            throw new IllegalArgumentException("O título do curso deve ter pelo menos 3 caracteres.");
        }
        
        if (curso.getTitulo().trim().length() > 100) {
            throw new IllegalArgumentException("O título do curso deve ter no máximo 100 caracteres.");
        }
        
        // Verificar se já existe um curso com o mesmo título
        if (cursoRepository.existsByTitulo(curso.getTitulo().trim())) {
            throw new IllegalArgumentException("Já existe um curso com este título.");
        }
        
        return cursoRepository.save(curso);
    }

    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    public Optional<Curso> buscarPorId(Long id) {
        return cursoRepository.findById(id);
    }

    public List<Curso> buscarPorNome(String nome) {
        return cursoRepository.findByTituloContainingIgnoreCase(nome);
    }

    public Curso atualizarCurso(Long id, Curso cursoAtualizado, String emailUsuario) {
        // Validar se o usuário é administrador
        if (!isAdministrador(emailUsuario)) {
            throw new SecurityException("Apenas administradores podem editar cursos.");
        }
        
        Optional<Curso> cursoExistente = cursoRepository.findById(id);
        if (!cursoExistente.isPresent()) {
            throw new IllegalArgumentException("Curso não encontrado com ID: " + id);
        }
        
        Curso curso = cursoExistente.get();
        
        // Validações de negócio
        if (cursoAtualizado.getTitulo() != null) {
            if (cursoAtualizado.getTitulo().trim().length() < 3) {
                throw new IllegalArgumentException("O título do curso deve ter pelo menos 3 caracteres.");
            }
            if (cursoAtualizado.getTitulo().trim().length() > 100) {
                throw new IllegalArgumentException("O título do curso deve ter no máximo 100 caracteres.");
            }
            
            // Verificar se já existe outro curso com o mesmo título
            Curso cursoComMesmoTitulo = cursoRepository.findByTitulo(cursoAtualizado.getTitulo().trim());
            if (cursoComMesmoTitulo != null && !id.equals(cursoComMesmoTitulo.getId())) {
                throw new IllegalArgumentException("Já existe outro curso com este título.");
            }
            
            curso.setTitulo(cursoAtualizado.getTitulo().trim());
        }
        
        // Atualizar outros campos
        if (cursoAtualizado.getDescricaoConteudo() != null) {
            curso.setDescricaoConteudo(cursoAtualizado.getDescricaoConteudo());
        }
        if (cursoAtualizado.getDescricaoCurta() != null) {
            curso.setDescricaoCurta(cursoAtualizado.getDescricaoCurta());
        }
        if (cursoAtualizado.getCategoria() != null) {
            curso.setCategoria(cursoAtualizado.getCategoria());
        }
        if (cursoAtualizado.getDocente() != null) {
            curso.setDocente(cursoAtualizado.getDocente());
        }
        if (cursoAtualizado.getTags() != null) {
            curso.setTags(cursoAtualizado.getTags());
        }
        if (cursoAtualizado.getDataInicio() != null) {
            curso.setDataInicio(cursoAtualizado.getDataInicio());
        }
        if (cursoAtualizado.getCapaCurso() != null) {
            curso.setCapaCurso(cursoAtualizado.getCapaCurso());
        }
        if (cursoAtualizado.getMaterialApoio() != null) {
            curso.setMaterialApoio(cursoAtualizado.getMaterialApoio());
        }
        
        return cursoRepository.save(curso);
    }

    public void excluirCurso(Long id, String emailUsuario) {
        // Validar se o usuário é administrador
        if (!isAdministrador(emailUsuario)) {
            throw new SecurityException("Apenas administradores podem excluir cursos.");
        }
        
        if (!cursoRepository.existsById(id)) {
            throw new IllegalArgumentException("Curso não encontrado com ID: " + id);
        }
        
        cursoRepository.deleteById(id);
    }
    
    private boolean isAdministrador(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.isPresent() && usuario.get().isAdministrador();
    }
}
