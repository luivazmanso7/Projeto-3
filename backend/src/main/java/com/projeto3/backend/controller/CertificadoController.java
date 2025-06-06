package com.projeto3.backend.controller;

import com.projeto3.backend.model.Certificado;
import com.projeto3.backend.model.Curso;
import com.projeto3.backend.model.Usuario;
import com.projeto3.backend.repository.CertificadoRepository;
import com.projeto3.backend.repository.CursoRepository;
import com.projeto3.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/certificados")
@CrossOrigin(origins = "http://localhost:3000")
public class CertificadoController {

    @Autowired
    private CertificadoRepository certificadoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private CursoRepository cursoRepository;

    // Endpoint para criar certificado ao concluir curso
    @PostMapping
    public Certificado concluirCurso(@RequestBody ConcluirCursoRequest req) {
        Usuario usuario = usuarioRepository.findById(req.usuarioId()).orElseThrow();
        Curso curso = cursoRepository.findById(req.cursoId()).orElseThrow();
        Certificado certificado = new Certificado();
        certificado.setUsuario(usuario);
        certificado.setCurso(curso);
        certificado.setDataEmissao(LocalDate.now());
        return certificadoRepository.save(certificado);
    }

    // Endpoint para listar certificados do usuário
    @GetMapping("/usuario/{usuarioId}")
    public List<CertificadoDTO> listarCertificadosUsuario(@PathVariable int usuarioId) {
        List<Certificado> lista = certificadoRepository.findByUsuario_Id(usuarioId);
        return lista.stream().map(cert -> new CertificadoDTO(
                cert.getId(),
                cert.getCurso().getTitulo(),
                cert.getCurso().getDocente(),
                cert.getDataEmissao().toString(),
                "http://localhost:8080/certificados/" + cert.getId() + "/download"
        )).toList();
    }

    // Endpoint para baixar certificado (simulação)
    @GetMapping("/{id}/download")
    public String downloadCertificado(@PathVariable int id) {
        // Aqui você pode gerar e retornar o PDF real
        return "PDF do certificado " + id;
    }

    // DTOs
    public record ConcluirCursoRequest(int usuarioId, int cursoId) {}
    public record CertificadoDTO(int id, String titulo, String docente, String dataConclusao, String certificadoUrl) {}
}
