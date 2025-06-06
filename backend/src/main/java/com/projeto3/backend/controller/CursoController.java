package com.projeto3.backend.controller;

import com.projeto3.backend.model.Curso;
import com.projeto3.backend.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "http://localhost:3000")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public List<Curso> listarCursos() {
        return cursoService.listarCursos();
    }

    @PostMapping
    public ResponseEntity<?> salvarCurso(
            @RequestPart("curso") String cursoJson,
            @RequestPart(value = "capaCurso", required = false) MultipartFile capaCurso,
            @RequestPart(value = "materialApoio", required = false) MultipartFile materialApoio
    ) {
        try {
            // Converter JSON para objeto Curso
            Curso curso = objectMapper.readValue(cursoJson, Curso.class);
            
            // Processar capa do curso
            if (capaCurso != null && !capaCurso.isEmpty()) {
                String caminhoCapa = salvarArquivo(capaCurso);
                curso.setCapaCurso(caminhoCapa);
            }
            
            // Processar material de apoio
            if (materialApoio != null && !materialApoio.isEmpty()) {
                String caminhoMaterial = salvarArquivo(materialApoio);
                curso.setMaterialApoio(caminhoMaterial);
            }
            
            // Salvar curso
            Curso cursoSalvo = cursoService.salvarCurso(curso);
            return ResponseEntity.ok(cursoSalvo);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar curso: " + e.getMessage());
        }
    }

    private String salvarArquivo(MultipartFile file) throws IOException {
        String pasta = System.getProperty("user.dir") + "/uploads/";
        File dir = new File(pasta);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String nomeArquivo = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String caminho = pasta + nomeArquivo;
        File destino = new File(caminho);
        file.transferTo(destino);
        return nomeArquivo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscarCursoPorId(@PathVariable Integer id) {
        return cursoService.buscarPorId(id)
            .map(curso -> ResponseEntity.ok().body(curso))
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarCurso(
            @PathVariable Integer id,
            @RequestPart("curso") String cursoJson,
            @RequestPart(value = "capaCurso", required = false) MultipartFile capaCurso,
            @RequestPart(value = "materialApoio", required = false) MultipartFile materialApoio
    ) {
        try {
            // Verificar se o curso existe
            if (!cursoService.buscarPorId(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            // Converter JSON para objeto Curso
            Curso curso = objectMapper.readValue(cursoJson, Curso.class);
            curso.setId(id); // Garantir que o ID seja mantido
            
            // Processar capa do curso
            if (capaCurso != null && !capaCurso.isEmpty()) {
                String caminhoCapa = salvarArquivo(capaCurso);
                curso.setCapaCurso(caminhoCapa);
            }
            
            // Processar material de apoio
            if (materialApoio != null && !materialApoio.isEmpty()) {
                String caminhoMaterial = salvarArquivo(materialApoio);
                curso.setMaterialApoio(caminhoMaterial);
            }
            
            // Salvar curso atualizado
            Curso cursoAtualizado = cursoService.salvarCurso(curso);
            return ResponseEntity.ok(cursoAtualizado);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar curso: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCurso(@PathVariable Integer id) {
        cursoService.excluirCurso(id);
        return ResponseEntity.ok().build();
    }
}
