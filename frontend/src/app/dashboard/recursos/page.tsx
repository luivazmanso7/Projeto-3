"use client";
import React, { useEffect, useState } from "react";

interface Recurso {
  id: number;
  nomeArquivo: string;
  tipoArquivo: string;
  urlArquivo: string;
  docente: string;
  cursoId: number;
}

const fetchRecursos = async (): Promise<Recurso[]> => {
  const res = await fetch("http://localhost:8080/recursos");
  if (!res.ok) throw new Error("Erro ao buscar recursos");
  return res.json();
};

const iconeArquivo = (tipo: string) => {
  if (tipo.toLowerCase().includes("pdf")) return "📄";
  if (tipo.toLowerCase().includes("doc")) return "📝";
  return "📁";
};

export default function RecursosPage() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [busca, setBusca] = useState("");
  const [docente, setDocente] = useState("");
  const [curso, setCurso] = useState("");

  useEffect(() => {
    fetchRecursos().then(setRecursos);
  }, []);

  // Filtros simples
  const recursosFiltrados = recursos.filter(r =>
    r.nomeArquivo.toLowerCase().includes(busca.toLowerCase()) &&
    (docente ? r.docente === docente : true) &&
    (curso ? String(r.cursoId) === curso : true)
  );

  // Listar docentes e cursos únicos para os filtros
  const docentes = Array.from(new Set(recursos.map(r => r.docente))).filter(Boolean);
  const cursos = Array.from(new Set(recursos.map(r => r.cursoId))).filter(Boolean);

  return (
    <div style={{ background: "#f8f7ed", minHeight: "100vh", padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>RECURSOS DIDÁTICOS</h2>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <select value={curso} onChange={e => setCurso(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
          <option value="">Curso / Disciplina</option>
          {cursos.map(cid => (
            <option key={cid} value={cid}>{cid}</option>
          ))}
        </select>
        <select value={docente} onChange={e => setDocente(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
          <option value="">Docente / Professor</option>
          {docentes.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <table style={{ width: "100%", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
            <th style={{ textAlign: "left", padding: 12 }}> </th>
            <th style={{ textAlign: "left", padding: 12 }}>Nome do Arquivo</th>
            <th style={{ textAlign: "left", padding: 12 }}>Docente / Professor</th>
            <th style={{ textAlign: "left", padding: 12 }}>Curso / Turma</th>
            <th style={{ textAlign: "center", padding: 12 }}>Download</th>
            <th style={{ textAlign: "center", padding: 12 }}>Visualizar</th>
          </tr>
        </thead>
        <tbody>
          {recursosFiltrados.map(recurso => (
            <tr key={recurso.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ textAlign: "center", fontSize: 24 }}>{iconeArquivo(recurso.tipoArquivo)}</td>
              <td style={{ padding: 12 }}>{recurso.nomeArquivo}</td>
              <td style={{ padding: 12 }}>{recurso.docente}</td>
              <td style={{ padding: 12 }}>{recurso.cursoId}</td>
              <td style={{ textAlign: "center" }}>
                <a href={recurso.urlArquivo} download target="_blank" rel="noopener noreferrer">Download</a>
              </td>
              <td style={{ textAlign: "center" }}>
                <a href={recurso.urlArquivo} target="_blank" rel="noopener noreferrer">Visualizar</a>
              </td>
            </tr>
          ))}
          {recursosFiltrados.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 32, color: "#888" }}>
                Nenhum recurso encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 