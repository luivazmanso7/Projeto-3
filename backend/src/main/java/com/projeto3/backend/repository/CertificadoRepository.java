package com.projeto.backend.repository;

import com.projeto.backend.entity.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificadoRepository extends JpaRepository<Certificado, Long> {

    List<Certificado> findByNomeUsuario(String nomeUsuario);

    List<Certificado> findByNomeCurso(String nomeCurso);

    List<Certificado> findByNomeUsuarioAndNomeCurso(String nomeUsuario, String nomeCurso);
}
