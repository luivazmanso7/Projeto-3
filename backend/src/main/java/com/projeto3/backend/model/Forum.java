package com.projeto3.backend.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.ArrayList;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "forums")
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idForum;

    @NotNull
    @Size(min = 3, max = 100)
    @Column(nullable = false)
    private String titulo;

    @OneToMany(mappedBy = "forum", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Postagem> postagens = new ArrayList<>();

    // getters/setters
    public int getIdForum() { return idForum; }
    public void setIdForum(int idForum) { this.idForum = idForum; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public List<Postagem> getPostagens() { return postagens; }
    public void setPostagens(List<Postagem> postagens) { this.postagens = postagens; }
}