package com.projeto3.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "postagens")
public class Postagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPost;

    @Column(nullable = false)
    private String conteudo;

    @Column(name = "data_postagem", nullable = false)
    private LocalDate dataPostagem;

    @ManyToOne
    @JoinColumn(name = "forum_id", nullable = false)
    private Forum forum;

    @OneToMany(mappedBy = "postagem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios;

    @Column(name = "curtidas", nullable = false)
    private int curtidas = 0;

    // Getters e Setters
    // (Inclua também os novos campos)

    public int getIdPost() { return idPost; }
    public void setIdPost(int idPost) { this.idPost = idPost; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDate getDataPostagem() { return dataPostagem; }
    public void setDataPostagem(LocalDate dataPostagem) { this.dataPostagem = dataPostagem; }

    public Forum getForum() { return forum; }
    public void setForum(Forum forum) { this.forum = forum; }

    public List<Comentario> getComentarios() { return comentarios; }
    public void setComentarios(List<Comentario> comentarios) { this.comentarios = comentarios; }

    public int getCurtidas() { return curtidas; }
    public void setCurtidas(int curtidas) { this.curtidas = curtidas; }

    public void adicionarCurtida() { this.curtidas++; }
}
