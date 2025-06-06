package com.projeto3.backend.repository;

import com.projeto3.backend.model.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CertificadoRepository extends JpaRepository<Certificado, Integer> {

    List<Certificado> findByUsuario_Nome(String nomeUsuario);

    List<Certificado> findByCurso_Titulo(String titulo);

    List<Certificado> findByUsuario_NomeAndCurso_Titulo(String nomeUsuario, String titulo);
}
