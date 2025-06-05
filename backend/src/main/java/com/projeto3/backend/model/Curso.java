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
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cursos")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Size(min = 3, max = 100)
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "capa_curso")
    private String capaCurso; // Caminho do arquivo da capa

    @Column(name = "descricao_conteudo", columnDefinition = "TEXT")
    private String descricaoConteudo;

    @Column(name = "descricao_curta")
    private String descricaoCurta;

    @Column(name = "categoria", nullable = false)
    private String categoria; // BASICO ou AO VIVO

    @Column(name = "docente")
    private String docente;

    @Column(name = "material_apoio")
    private String materialApoio; // Caminho do arquivo de material de apoio

    @Column(name = "tags")
    private String tags; // Pode ser uma string separada por vírgula

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_inicio")
    private LocalDate dataInicio;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
      name = "curso_usuario",
      joinColumns = @JoinColumn(name = "curso_id"),
      inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> usuarios = new ArrayList<>();

    // Construtores
    public Curso() {}

    public Curso(String titulo, String descricaoConteudo, String descricaoCurta, 
                String categoria, String docente, String tags, LocalDate dataInicio) {
        this.titulo = titulo;
        this.descricaoConteudo = descricaoConteudo;
        this.descricaoCurta = descricaoCurta;
        this.categoria = categoria;
        this.docente = docente;
        this.tags = tags;
        this.dataInicio = dataInicio;
    }

    // Emite (gera) um certificado para um usuário
    public void emitirCertificado(Usuario usuario, Certificado cert) {
        // Lógica de emissão: por ex. gerar pdf, preencher data, etc.
        usuario.salvarCertificado(cert);
    }

    // getters/setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getCapaCurso() { return capaCurso; }
    public void setCapaCurso(String capaCurso) { this.capaCurso = capaCurso; }

    public String getDescricaoConteudo() { return descricaoConteudo; }
    public void setDescricaoConteudo(String descricaoConteudo) { this.descricaoConteudo = descricaoConteudo; }

    public String getDescricaoCurta() { return descricaoCurta; }
    public void setDescricaoCurta(String descricaoCurta) { this.descricaoCurta = descricaoCurta; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDocente() { return docente; }
    public void setDocente(String docente) { this.docente = docente; }

    public String getMaterialApoio() { return materialApoio; }
    public void setMaterialApoio(String materialApoio) { this.materialApoio = materialApoio; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public LocalDate getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDate dataInicio) { this.dataInicio = dataInicio; }

    @JsonIgnore
    public List<Usuario> getUsuarios() { return usuarios; }
    public void setUsuarios(List<Usuario> usuarios) { this.usuarios = usuarios; }
}