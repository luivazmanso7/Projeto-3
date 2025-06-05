package com.projeto3.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PostagemDTO {
    
    @NotNull
    @Size(min = 1, max = 255)
    private String titulo;
    
    @NotNull
    @Size(min = 1, max = 5000)
    private String conteudo;
    
    @NotNull
    private Long forumId;
    
    @NotNull
    private Integer autorId;
    
    // Construtores
    public PostagemDTO() {}
    
    public PostagemDTO(String titulo, String conteudo, Long forumId, Integer autorId) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.forumId = forumId;
        this.autorId = autorId;
    }
    
    // Getters e Setters
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }
    
    public Long getForumId() { return forumId; }
    public void setForumId(Long forumId) { this.forumId = forumId; }
    
    public Integer getAutorId() { return autorId; }
    public void setAutorId(Integer autorId) { this.autorId = autorId; }
}
