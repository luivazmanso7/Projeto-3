package com.projeto3.backend.repository;

import com.projeto3.backend.model.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CertificadoRepository extends JpaRepository<Certificado, Integer> {

    List<Certificado> findByUsuarioNome(String nomeUsuario);

    List<Certificado> findByCursoNomeCurso(String nomeCurso);

    List<Certificado> findByUsuarioNomeAndCursoNomeCurso(String nomeUsuario, String nomeCurso);
}
