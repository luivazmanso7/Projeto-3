package com.projeto3.backend.controller;

import com.projeto3.backend.model.Certificado;
import com.projeto3.backend.model.Usuario;
import com.projeto3.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> buscarPorId(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id);
    }

    @GetMapping("/email/{email}")
    public Optional<Usuario> buscarPorEmail(@PathVariable String email) {
        return usuarioService.buscarPorEmail(email);
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) {
        System.out.println("=== RECEBENDO REQUISIÇÃO DE CADASTRO ===");
        System.out.println("Nome: " + (usuario != null ? usuario.getNome() : "null"));
        System.out.println("Email: " + (usuario != null ? usuario.getEmail() : "null"));
        System.out.println("Senha: " + (usuario != null && usuario.getSenha() != null ? "***" + usuario.getSenha().length() + " chars***" : "null"));
        System.out.println("Administrador: " + (usuario != null ? usuario.isAdministrador() : "null"));
        
        try {
            Usuario usuarioSalvo = usuarioService.salvar(usuario);
            System.out.println("Usuário salvo com sucesso: ID " + usuarioSalvo.getId());
            return ResponseEntity.ok(usuarioSalvo);
        } catch (IllegalArgumentException e) {
            System.out.println("Erro de validação de regras de negócio: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (jakarta.validation.ConstraintViolationException e) {
            System.out.println("Erro de validação de constraints: " + e.getMessage());
            StringBuilder mensagemErro = new StringBuilder("Erro de validação: ");
            e.getConstraintViolations().forEach(violation -> 
                mensagemErro.append(violation.getPropertyPath())
                           .append(" - ")
                           .append(violation.getMessage())
                           .append("; ")
            );
            return ResponseEntity.badRequest().body(mensagemErro.toString());
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            System.out.println("Erro de integridade de dados: " + e.getMessage());
            if (e.getMessage().contains("email")) {
                return ResponseEntity.badRequest().body("Este email já está cadastrado no sistema.");
            }
            return ResponseEntity.badRequest().body("Erro de integridade de dados: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Erro geral: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }

    @PostMapping("/{idUsuario}/certificados")
    public void salvarCertificado(@PathVariable Integer idUsuario, @RequestBody Certificado certificado) {
        usuarioService.salvarCertificado(idUsuario, certificado);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        usuarioService.deletar(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuarioLogin) {
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(usuarioLogin.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(usuarioLogin.getSenha())) {
                return ResponseEntity.ok(usuario); // ou retorne só o id/nome/email se preferir
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }
}
