package com.projeto3.backend.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

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

    // getters/setters
    public int getIdPost() { return idPost; }
    public void setIdPost(int idPost) { this.idPost = idPost; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDate getDataPostagem() { return dataPostagem; }
    public void setDataPostagem(LocalDate dataPostagem) { this.dataPostagem = dataPostagem; }

    public Forum getForum() { return forum; }
    public void setForum(Forum forum) { this.forum = forum; }
}