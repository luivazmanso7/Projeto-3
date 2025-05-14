package com.projeto.backend.service;

import com.projeto.backend.entity.Certificado;
import com.projeto.backend.repository.CertificadoRepository;
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

    public Optional<Certificado> buscarPorId(Long id) {
        return certificadoRepository.findById(id);
    }

    public List<Certificado> buscarPorUsuario(String nomeUsuario) {
        return certificadoRepository.findByNomeUsuario(nomeUsuario);
    }

    public List<Certificado> buscarPorCurso(String nomeCurso) {
        return certificadoRepository.findByNomeCurso(nomeCurso);
    }

    public void excluirCertificado(Long id) {
        certificadoRepository.deleteById(id);
    }
}
