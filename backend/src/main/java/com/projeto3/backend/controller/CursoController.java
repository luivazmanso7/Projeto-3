package com.projeto3.backend.controller;

import com.projeto3.backend.model.Curso;
import com.projeto3.backend.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "http://localhost:3000")
public class CursoController {

    private static final Logger logger = Logger.getLogger(CursoController.class.getName());

    @Autowired
    private CursoService cursoService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<Curso>> listarCursos() {
        try {
            List<Curso> cursos = cursoService.listarCursos();
            return ResponseEntity.ok(cursos);
        } catch (Exception e) {
            logger.severe("Erro ao listar cursos: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscarCursoPorId(@PathVariable Long id) {
        try {
            Optional<Curso> curso = cursoService.buscarPorId(id);
            if (curso.isPresent()) {
                return ResponseEntity.ok(curso.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.severe("Erro ao buscar curso por ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Curso>> buscarCursosPorNome(@RequestParam String nome) {
        try {
            List<Curso> cursos = cursoService.buscarPorNome(nome);
            return ResponseEntity.ok(cursos);
        } catch (Exception e) {
            logger.severe("Erro ao buscar cursos por nome: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> salvarCurso(
            @RequestPart("curso") String cursoJson,
            @RequestPart(value = "capaCurso", required = false) MultipartFile capaCurso,
            @RequestPart(value = "materialApoio", required = false) MultipartFile materialApoio,
            @RequestParam("emailUsuario") String emailUsuario
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
            
            // Salvar curso com validação de administrador
            Curso cursoSalvo = cursoService.salvarCurso(curso, emailUsuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(cursoSalvo);
            
        } catch (SecurityException e) {
            logger.warning("Tentativa de acesso não autorizado: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Erro: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warning("Erro de validação ao salvar curso: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (DataIntegrityViolationException e) {
            logger.warning("Erro de integridade de dados ao salvar curso: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: Violação de integridade dos dados");
        } catch (Exception e) {
            logger.severe("Erro interno ao salvar curso: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno do servidor");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarCurso(
            @PathVariable Long id,
            @RequestPart("curso") String cursoJson,
            @RequestPart(value = "capaCurso", required = false) MultipartFile capaCurso,
            @RequestPart(value = "materialApoio", required = false) MultipartFile materialApoio,
            @RequestParam("emailUsuario") String emailUsuario
    ) {
        try {
            // Converter JSON para objeto Curso
            Curso cursoAtualizado = objectMapper.readValue(cursoJson, Curso.class);
            
            // Processar capa do curso
            if (capaCurso != null && !capaCurso.isEmpty()) {
                String caminhoCapa = salvarArquivo(capaCurso);
                cursoAtualizado.setCapaCurso(caminhoCapa);
            }
            
            // Processar material de apoio
            if (materialApoio != null && !materialApoio.isEmpty()) {
                String caminhoMaterial = salvarArquivo(materialApoio);
                cursoAtualizado.setMaterialApoio(caminhoMaterial);
            }
            
            // Atualizar curso com validação de administrador
            Curso curso = cursoService.atualizarCurso(id, cursoAtualizado, emailUsuario);
            return ResponseEntity.ok(curso);
            
        } catch (SecurityException e) {
            logger.warning("Tentativa de acesso não autorizado: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Erro: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warning("Erro de validação ao atualizar curso: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (DataIntegrityViolationException e) {
            logger.warning("Erro de integridade de dados ao atualizar curso: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: Violação de integridade dos dados");
        } catch (Exception e) {
            logger.severe("Erro interno ao atualizar curso: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno do servidor");
        }
    }

    private String salvarArquivo(MultipartFile file) throws IOException {
        String pasta = "uploads/";
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirCurso(
            @PathVariable Long id,
            @RequestParam("emailUsuario") String emailUsuario
    ) {
        try {
            cursoService.excluirCurso(id, emailUsuario);
            return ResponseEntity.ok().body("Curso excluído com sucesso");
        } catch (SecurityException e) {
            logger.warning("Tentativa de acesso não autorizado: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Erro: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warning("Erro de validação ao excluir curso: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (DataIntegrityViolationException e) {
            logger.warning("Erro de integridade de dados ao excluir curso: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: Não é possível excluir curso com dependências");
        } catch (Exception e) {
            logger.severe("Erro interno ao excluir curso: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno do servidor");
        }
    }
}
