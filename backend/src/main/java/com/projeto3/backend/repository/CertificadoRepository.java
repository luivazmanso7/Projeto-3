package com.projeto3.backend.repository;

import com.projeto3.backend.model.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificadoRepository extends JpaRepository<Certificado, Integer> {

    List<Certificado> findByNomeUsuario(String nomeUsuario);

    List<Certificado> findByNomeCurso(String nomeCurso);

    List<Certificado> findByNomeUsuarioAndNomeCurso(String nomeUsuario, String nomeCurso);
}
