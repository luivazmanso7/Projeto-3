package com.projeto3.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "postagens")
public class Postagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPost;

    @NotNull
    @Size(min = 1, max = 255)
    @Column(nullable = false)
    private String titulo;

    @NotNull
    @Size(min = 1, max = 5000)
    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @Column(name = "data_postagem", nullable = false)
    private LocalDate dataPostagem;

    @ManyToOne
    @JoinColumn(name = "forum_id", nullable = false)
    private Forum forum;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Usuario autor;

    @OneToMany(mappedBy = "postagem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comentario> comentarios;

    @Column(name = "curtidas", nullable = false)
    private int curtidas = 0;

    // Getters e Setters
    public int getIdPost() { return idPost; }
    public void setIdPost(int idPost) { this.idPost = idPost; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDate getDataPostagem() { return dataPostagem; }
    public void setDataPostagem(LocalDate dataPostagem) { this.dataPostagem = dataPostagem; }

    public Forum getForum() { return forum; }
    public void setForum(Forum forum) { this.forum = forum; }

    public Usuario getAutor() { return autor; }
    public void setAutor(Usuario autor) { this.autor = autor; }

    public List<Comentario> getComentarios() { return comentarios; }
    public void setComentarios(List<Comentario> comentarios) { this.comentarios = comentarios; }

    public int getCurtidas() { return curtidas; }
    public void setCurtidas(int curtidas) { this.curtidas = curtidas; }

    public void adicionarCurtida() { this.curtidas++; }
}
