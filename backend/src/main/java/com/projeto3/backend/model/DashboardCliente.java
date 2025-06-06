package com.projeto3.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "dashboard_cliente")
public class DashboardCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "usuario_id")
    private int usuarioId;

    @Column(name = "sugestao_img_url")
    private String sugestaoImgUrl;

    @Column(name = "sugestao_img_texto")
    private String sugestaoImgTexto;

    @Column(name = "curso_id")
    private int cursoId;

    @Column(name = "status_aprendizado")
    private String statusAprendizado;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUsuarioId() { return usuarioId; }
    public void setUsuarioId(int usuarioId) { this.usuarioId = usuarioId; }

    public String getSugestaoImgUrl() { return sugestaoImgUrl; }
    public void setSugestaoImgUrl(String sugestaoImgUrl) { this.sugestaoImgUrl = sugestaoImgUrl; }

    public String getSugestaoImgTexto() { return sugestaoImgTexto; }
    public void setSugestaoImgTexto(String sugestaoImgTexto) { this.sugestaoImgTexto = sugestaoImgTexto; }

    public int getCursoId() { return cursoId; }
    public void setCursoId(int cursoId) { this.cursoId = cursoId; }

    public String getStatusAprendizado() { return statusAprendizado; }
    public void setStatusAprendizado(String statusAprendizado) { this.statusAprendizado = statusAprendizado; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }
} 