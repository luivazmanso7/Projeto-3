package com.projeto3.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Size(min = 3, max = 100)
    @Column(nullable = false)
    private String nome;

    @NotNull
    @Size(min = 5, max = 100)
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull
    @Size(min = 6, max = 100)
    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private boolean administrador;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "usuario_id")
    private List<Certificado> certificados = new ArrayList<>();

    // ====================== GETTERS & SETTERS ======================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isAdministrador() {
        return administrador;
    }

    public void setAdministrador(boolean administrador) {
        this.administrador = administrador;
    }

    @JsonIgnore
    public List<Certificado> getCertificados() {
        return certificados;
    }

    public void setCertificados(List<Certificado> certificados) {
        this.certificados = certificados;
    }

    // ====================== MÉTODOS DE NEGÓCIO ======================

    public void salvarCertificado(Certificado certificado) {
        certificados.add(certificado);
    }

    public void excluirMeuForum(int idForum) {
        System.out.printf("Usuário %d excluiu fórum %d%n", this.id, idForum);
    }

    public void excluirMinhaPostagem(int idPost) {
        System.out.printf("Usuário %d excluiu postagem %d%n", this.id, idPost);
    }

    public void publicarCurso(Curso curso) {
        System.out.printf("Usuário %d publicou o curso %s%n", this.id, curso.getTitulo());
    }

    public void editarCurso(Curso curso) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode editar curso.");
        }
        System.out.printf("Administrador %d editou o curso %s%n", this.id, curso.getTitulo());
    }

    public void excluirCurso(Curso curso) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode excluir curso.");
        }
        System.out.printf("Administrador %d excluiu o curso %s%n", this.id, curso.getTitulo());
    }

    public void excluirForum(Forum forum) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode excluir fórum.");
        }
        System.out.printf("Administrador %d excluiu fórum %s%n", this.id, forum.getTitulo());
    }

    public void excluirPostagem(Postagem postagem) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode excluir postagem.");
        }
        System.out.printf("Administrador %d excluiu postagem %d%n", this.id, postagem.getIdPost());
    }
}
