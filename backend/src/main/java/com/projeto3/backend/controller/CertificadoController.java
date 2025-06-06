package com.projeto3.backend.controller;

import com.projeto3.backend.model.Certificado;
import com.projeto3.backend.service.CertificadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/certificados")
@CrossOrigin(origins = "*")
public class CertificadoController {

    @Autowired
    private CertificadoService certificadoService;

    @GetMapping
    public List<Certificado> listarTodos() {
        return certificadoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Certificado> buscarPorId(@PathVariable Integer id) {
        return certificadoService.buscarPorId(id);
    }

    @GetMapping("/usuario/{nomeUsuario}")
    public List<Certificado> buscarPorUsuario(@PathVariable String nomeUsuario) {
        return certificadoService.buscarPorUsuario(nomeUsuario);
    }

    @GetMapping("/curso/{nomeCurso}")
    public List<Certificado> buscarPorCurso(@PathVariable String nomeCurso) {
        return certificadoService.buscarPorCurso(nomeCurso);
    }

    @PostMapping
    public Certificado salvar(@RequestBody Certificado certificado) {
        return certificadoService.salvarCertificado(certificado);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id) {
        certificadoService.excluirCertificado(id);
    }
}
