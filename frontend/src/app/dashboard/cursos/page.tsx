"use client";
import { useEffect, useState } from "react";

type CertificadoCurso = {
  id: number;
  titulo: string;
  docente: string;
  dataConclusao: string;
  certificadoUrl: string; // URL para baixar o PDF
};

export default function CertificadosUsuarioPage() {
  const [cursosConcluidos, setCursosConcluidos] = useState<CertificadoCurso[]>([]);

  useEffect(() => {
    async function fetchCertificados() {
      const res = await fetch("http://localhost:8080/certificados/usuario/1"); // ajuste o endpoint!
      const data = await res.json();
      // Se vier um objeto, transforme em array:
      const lista = Array.isArray(data) ? data : Object.values(data);
      setCursosConcluidos(lista);
    }
    fetchCertificados();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Meus Certificados</h2>
      <div className="flex flex-wrap gap-6">
        {cursosConcluidos.length === 0 && (
          <span className="text-gray-500">Nenhum certificado disponível ainda.</span>
        )}
        {cursosConcluidos.map((curso) => (
          <div key={curso.id} className="bg-gray-100 rounded-lg shadow p-4 w-64 flex flex-col justify-between items-center">
            <div>
              <div className="font-bold text-lg mb-1">{curso.titulo}</div>
              <div className="text-xs text-gray-600 mb-1">Docente: {curso.docente}</div>
              <div className="text-xs text-gray-500 mb-2">Concluído em: {curso.dataConclusao}</div>
            </div>
            <a
              href="/certificado.png"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-[#9BB61B] text-white px-4 py-2 rounded text-center font-semibold hover:brightness-110 transition"
            >
              Visualizar Certificado
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
