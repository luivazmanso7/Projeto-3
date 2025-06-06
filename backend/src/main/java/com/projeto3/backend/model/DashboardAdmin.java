package com.projeto3.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "dashboard_admin")
public class DashboardAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "postagens_hoje")
    private int postagensHoje;

    @Column(name = "atualizacoes_pendentes")
    private int atualizacoesPendentes;

    @Column(name = "mensagens_pendentes")
    private int mensagensPendentes;

    @Column(name = "usuarios_ativos")
    private int usuariosAtivos;

    @Column(name = "cursos_ativos")
    private int cursosAtivos;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getPostagensHoje() { return postagensHoje; }
    public void setPostagensHoje(int postagensHoje) { this.postagensHoje = postagensHoje; }

    public int getAtualizacoesPendentes() { return atualizacoesPendentes; }
    public void setAtualizacoesPendentes(int atualizacoesPendentes) { this.atualizacoesPendentes = atualizacoesPendentes; }

    public int getMensagensPendentes() { return mensagensPendentes; }
    public void setMensagensPendentes(int mensagensPendentes) { this.mensagensPendentes = mensagensPendentes; }

    public int getUsuariosAtivos() { return usuariosAtivos; }
    public void setUsuariosAtivos(int usuariosAtivos) { this.usuariosAtivos = usuariosAtivos; }

    public int getCursosAtivos() { return cursosAtivos; }
    public void setCursosAtivos(int cursosAtivos) { this.cursosAtivos = cursosAtivos; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }
} 