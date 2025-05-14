package com.projeto3.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private boolean administrador;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "usuario_id")
    private List<Certificado> certificados = new ArrayList<>();

    // Salva um certificado para este usuário
    public void salvarCertificado(Certificado certificado) {
        certificados.add(certificado);
    }

    // Exclui um fórum cujo ID seja idForum
    public void excluirMeuForum(int idForum) {
        // Ex.: buscar o fórum na lista de fóruns deste usuário e remover
        // Fórum só pode ser removido por quem o criou, mas aqui é stub:
        System.out.printf("Usuário %d excluiu fórum %d%n", this.id, idForum);
    }

    // Exclui uma postagem cujo ID seja idPost
    public void excluirMinhaPostagem(int idPost) {
        System.out.printf("Usuário %d excluiu postagem %d%n", this.id, idPost);
    }

    // Publica um curso (qualquer usuário)
    public void publicarCurso(Curso curso) {
        System.out.printf("Usuário %d publicou o curso %s%n", this.id, curso.getNomeCurso());
    }

    // Edita um curso — só admin
    public void editarCurso(Curso curso) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode editar curso.");
        }
        System.out.printf("Administrador %d editou o curso %s%n", this.id, curso.getNomeCurso());
    }

    // Exclui um curso — só admin
    public void excluirCurso(Curso curso) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode excluir curso.");
        }
        System.out.printf("Administrador %d excluiu o curso %s%n", this.id, curso.getNomeCurso());
    }

    // Exclui um fórum — só admin pode excluir qualquer fórum
    public void excluirForum(Forum forum) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode excluir fórum.");
        }
        System.out.printf("Administrador %d excluiu fórum %s%n", this.id, forum.getTitulo());
    }

    // Exclui uma postagem — só admin qualquer postagem
    public void excluirPostagem(Postagem postagem) {
        if (!administrador) {
            throw new SecurityException("Apenas administrador pode excluir postagem.");
        }
        System.out.printf("Administrador %d excluiu postagem %d%n", this.id, postagem.getIdPost());
    }

     // getter necessário para usuario.getCertificados() funcionar:
     public List<Certificado> getCertificados() {
        return certificados;
    }

    // (opcional) setter, caso precise:
    public void setCertificados(List<Certificado> certificados) {
        this.certificados = certificados;
    }
    // getters/setters omitidos para brevidade...
}