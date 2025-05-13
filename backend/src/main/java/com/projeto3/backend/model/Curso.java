package com.projeto3.backend.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import java.util.ArrayList;

@Entity
@Table(name = "cursos")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nome_curso", nullable = false)
    private String nomeCurso;

    @Column(nullable = false)
    private String certificado;

    @ManyToMany
    @JoinTable(
      name = "curso_usuario",
      joinColumns = @JoinColumn(name = "curso_id"),
      inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> usuarios = new ArrayList<>();

    // Emite (gera) um certificado para um usuário
    public void emitirCertificado(Usuario usuario, Certificado cert) {
        // Lógica de emissão: por ex. gerar pdf, preencher data, etc.
        usuario.salvarCertificado(cert);
    }

    // getters/setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNomeCurso() { return nomeCurso; }
    public void setNomeCurso(String nomeCurso) { this.nomeCurso = nomeCurso; }

    public String getCertificado() { return certificado; }
    public void setCertificado(String certificado) { this.certificado = certificado; }

    public List<Usuario> getUsuarios() { return usuarios; }
    public void setUsuarios(List<Usuario> usuarios) { this.usuarios = usuarios; }
}