package com.projeto3.backend.service;

import com.projeto3.backend.model.Certificado;
import com.projeto3.backend.repository.CertificadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificadoService {

    @Autowired
    private CertificadoRepository certificadoRepository;

    public Certificado salvarCertificado(Certificado certificado) {
        return certificadoRepository.save(certificado);
    }

    public List<Certificado> listarTodos() {
        return certificadoRepository.findAll();
    }

    public Optional<Certificado> buscarPorId(Integer id) {
        return certificadoRepository.findById(id);
    }

    public List<Certificado> buscarPorUsuario(String nomeUsuario) {
        return certificadoRepository.findByUsuarioNome(nomeUsuario);
    }

    public List<Certificado> buscarPorCurso(String nomeCurso) {
        return certificadoRepository.findByCursoNomeCurso(nomeCurso);
    }

    public void excluirCertificado(Integer id) {
        certificadoRepository.deleteById(id);
    }
}
