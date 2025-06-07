"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Tipos de dados
interface Aula {
  id: number;
  titulo: string;
  duracao: string;
  assistida: boolean;
}

interface Feedback {
  autor: string;
  texto: string;
  data: string;
}

interface CursoDetalhe {
  id: number;
  titulo: string;
  aulas: Aula[];
  feedbacks: Feedback[];
  concluido: boolean;
  percentual: number;
  certificadoDisponivel: boolean;
}

export default function CursoDetalhePage() {
  const { id } = useParams();
  const [curso, setCurso] = useState<CursoDetalhe | null>(null);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    async function fetchCurso() {
      // Substitua pelo endpoint real
      const res = await fetch(`http://localhost:8080/cursos/${id}`);
      const data = await res.json();
      setCurso(data);
    }
    fetchCurso();
  }, [id]);

  const handleComentar = async () => {
    if (!comentario.trim() || !curso) return;
    // Exemplo de envio de feedback (ajuste o endpoint conforme seu backend)
    await fetch(`http://localhost:8080/cursos/${curso.id}/feedbacks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        autor: "Você",
        texto: comentario,
        data: new Date().toLocaleDateString("pt-BR"),
      }),
    });
    setCurso({
      ...curso,
      feedbacks: [
        ...curso.feedbacks,
        { autor: "Você", texto: comentario, data: new Date().toLocaleDateString("pt-BR") },
      ],
    });
    setComentario("");
  };

  if (!curso) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{curso.titulo}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna Esquerda */}
        <div className="flex-1">
          <div className="mb-4">
            <span className="font-semibold">
              {curso.concluido ? "✔️ Curso concluído" : "⏳ Em andamento"}
            </span>
          </div>
          <div className="mb-2 font-bold">{curso.percentual}% concluído</div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-[#9BB61B] h-3 rounded-full"
              style={{ width: `${curso.percentual}%` }}
            ></div>
          </div>
          <div className="mb-2">
            {curso.aulas.filter(a => a.assistida).length} de {curso.aulas.length} aulas assistidas
          </div>
          <div className="mb-6">
            {curso.feedbacks.length > 0 ? "✔️ Todos os feedbacks concluídos" : "Nenhum feedback ainda"}
          </div>

          {/* Feedbacks */}
          <h2 className="text-2xl font-bold mb-2">Feedbacks do Docente</h2>
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border"
                placeholder="Escreva um comentário..."
                value={comentario}
                onChange={e => setComentario(e.target.value)}
              />
              <button
                className="bg-[#9BB61B] text-white px-4 py-2 rounded font-semibold"
                onClick={handleComentar}
              >
                Comentar
              </button>
            </div>
            {curso.feedbacks.map((f, i) => (
              <div key={i} className="bg-white rounded p-3 mb-2 shadow">
                <div className="font-semibold">{f.autor}</div>
                <div className="text-sm text-gray-700">{f.texto}</div>
                <div className="text-xs text-gray-400">{f.data}</div>
              </div>
            ))}
          </div>

          {/* Certificado */}
          <h2 className="text-2xl font-bold mb-2">Certificado</h2>
          <div className="bg-gray-100 rounded-xl p-4 mb-6 flex items-center gap-4">
            <span className="text-3xl">📝</span>
            <div>
              <div className="font-bold">
                {curso.certificadoDisponivel
                  ? <a href={`http://localhost:8080/certificados/${curso.id}/download`} target="_blank" rel="noopener noreferrer" className="text-[#9BB61B] underline">Baixar certificado (PDF)</a>
                  : "Certificado indisponível por enquanto."}
              </div>
              {!curso.certificadoDisponivel && (
                <div className="text-sm text-gray-700">
                  Você precisa concluir 100% do conteúdo para habilitar a emissão do certificado.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="w-full md:w-2/5 flex flex-col gap-6">
          {/* Video */}
          <div className="bg-gray-300 rounded-xl flex items-center justify-center h-64 mb-4">
            <span className="text-6xl text-gray-500">▶️</span>
          </div>
          {/* Lista de Aulas */}
          <div>
            <h2 className="text-xl font-bold mb-2">Aulas</h2>
            <table className="w-full bg-white rounded shadow">
              <tbody>
                {curso.aulas.map((aula, idx) => (
                  <tr key={aula.id} className="border-b last:border-b-0">
                    <td className="px-2 py-2">
                      <span className={aula.assistida ? "text-green-700 font-bold" : "text-gray-400"}>
                        {aula.assistida ? "✔️" : "⏺️"}
                      </span>
                    </td>
                    <td className="px-2 py-2">Aula {String(idx + 1).padStart(2, "0")}</td>
                    <td className="px-2 py-2">{aula.titulo}</td>
                    <td className="px-2 py-2 text-right">{aula.duracao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 