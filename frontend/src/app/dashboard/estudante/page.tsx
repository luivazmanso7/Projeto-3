"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";    // <<< IMPORTAR AQUI
import { cursoService, Curso } from "@/services/cursoService";

export default function DashboardEstudantePage() {
  const router = useRouter();                   // <<< USAR O USE ROUTER
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [cursosAcessados, setCursosAcessados] = useState<number[]>([]);

  useEffect(() => {
    cursoService
      .listarCursos()
      .then((lista) => {
        setCursos(lista);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar cursos:", err);
        setErro("Não foi possível carregar os cursos no momento.");
        setCarregando(false);
      });

    const armazenados = localStorage.getItem("cursosAcessados");
    if (armazenados) {
      try {
        setCursosAcessados(JSON.parse(armazenados) as number[]);
      } catch {
        localStorage.removeItem("cursosAcessados");
      }
    }
  }, []);

  const handleAcessarCurso = (cursoId: number) => {
    // 1) se já estiver acessado, só redireciona
    if (cursosAcessados.includes(cursoId)) {
      router.push("/cursos");        // <<< IR PARA PaginaCursos
      return;
    }

    // 2) adiciona ao array de acessados e persisti
    const novaLista = [...cursosAcessados, cursoId];
    setCursosAcessados(novaLista);
    localStorage.setItem("cursosAcessados", JSON.stringify(novaLista));

    // 3) redireciona para a rota de Cursos
    router.push("/cursos");          // <<< IR PARA PaginaCursos
  };

  // 4) Dividir a lista de cursos entre:
  //    - cursosDisponiveis: todos os cursos que ainda NÃO foram acessados
  //    - cursosMatriculados: só os cursos cujos IDs estão em cursosAcessados
  const cursosDisponiveis = cursos.filter((c) => !cursosAcessados.includes(c.id!));
  const cursosMatriculados = cursos.filter((c) => cursosAcessados.includes(c.id!));

  // Função auxiliar para renderizar um card de curso
  const renderCardCurso = (curso: Curso, isDisponivel: boolean) => {
    return (
      <div
        key={curso.id}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200 overflow-hidden"
      >
        {/* Imagem de capa ou Placeholder */}
        {curso.capaCurso ? (
          <img
            src={`http://localhost:8080/uploads/${curso.capaCurso}`}
            alt={`Capa do curso ${curso.titulo}`}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#281719] leading-tight">
              {curso.titulo}
            </h3>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                curso.categoria === "aovivo"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {curso.categoria === "aovivo" ? "Ao vivo" : "Básico"}
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed flex-grow line-clamp-3">
            {curso.descricaoCurta}
          </p>

          <div className="text-xs text-gray-500 space-y-0.5">
            {curso.docente && <p>Docente: {curso.docente}</p>}
            {curso.dataInicio && (
              <p>
                Início:{" "}
                {new Date(curso.dataInicio!).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
            {curso.tags && <p>Tags: <span className="italic">{curso.tags}</span></p>}
          </div>

          <div className="mt-auto pt-3">
            {curso.categoria === "aovivo" /* && curso.zoomLink */ ? (
              // Se você tiver zoomLink no back-end:
              // reposicione aqui: curso.zoomLink
              <a
                href={curso.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#9BB61B] text-[#281719] px-4 py-2 rounded-md hover:brightness-110 transition text-sm font-medium"
              >
                Entrar na Reunião
              </a>
            ) : (
              // Se for curso básico (ou não há Zoom), mostramos "Acessar Curso"
              <button
                onClick={() => {
                  if (isDisponivel) {
                    handleAcessarCurso(curso.id!);
                  } else {
                    // Já está acessado: você pode navegar para a página
                    // detalhada do curso, por exemplo:
                    // router.push(`/cursos/${curso.id}`)
                  }
                }}
                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition ${
                  isDisponivel
                    ? "bg-[#281719] text-white hover:brightness-125"
                    : "bg-gray-300 text-gray-600 cursor-default"
                }`}
                disabled={!isDisponivel}
              >
                {isDisponivel ? "Acessar Curso" : "Já Acessado"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Exibe Loading ou Mensagem de Erro, se necessário
  if (carregando) {
    return (
      <p className="text-gray-600 text-center mt-8">Carregando cursos...</p>
    );
  }
  if (erro) {
    return <p className="text-red-500 text-center mt-8">{erro}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* ============== A seção “O QUE APRENDER EM SEGUIDA” ============== */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-[#281719] mb-1 mt-2">
          O QUE APRENDER EM SEGUIDA
        </h2>
        <p className="text-sm text-gray-600 mb-4">Recomendamos para Você</p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {cursosDisponiveis.length > 0 ? (
            // Exibe todos os cursos disponíveis (ou apenas os primeiros 3, se preferir)
            cursosDisponiveis.slice(0, 3).map((c) => (
              <div key={c.id} className="w-60 flex-shrink-0">
                {renderCardCurso(c, true)}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center p-8 border rounded bg-white w-full">
              Nenhuma recomendação disponível no momento.
            </div>
          )}
        </div>
      </section>

      {/* ============== A seção “MEUS APRENDIZADOS” ============== */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-[#281719]">MEUS APRENDIZADOS</h2>
          <div className="flex gap-2">{/* Se quiser filtros, coloque aqui */}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {cursosMatriculados.length > 0 ? (
            cursosMatriculados.map((c) => (
              <div key={c.id}>{renderCardCurso(c, false)}</div>
            ))
          ) : (
            <div className="text-gray-400 text-center p-8 border rounded bg-white w-full">
              Nenhum aprendizado encontrado.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
