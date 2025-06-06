// src/app/estudante/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { cursoService, Curso } from "@/services/cursoService";
import { FaTimes } from "react-icons/fa";

export default function DashboardEstudantePage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [cursosAcessados, setCursosAcessados] = useState<number[]>([]);

  // Modal state
  const [modalAberta, setModalAberta] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

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

  // Ao clicar em "Acessar Curso" ou "Já Acessado", abre a modal
  const handleAbrirModal = (curso: Curso) => {
    if (!cursosAcessados.includes(curso.id!)) {
      const novaLista = [...cursosAcessados, curso.id!];
      setCursosAcessados(novaLista);
      localStorage.setItem("cursosAcessados", JSON.stringify(novaLista));
    }
    setCursoSelecionado(curso);
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
    setCursoSelecionado(null);
  };

  const cursosDisponiveis = cursos.filter((c) => !cursosAcessados.includes(c.id!));
  const cursosMatriculados = cursos.filter((c) => cursosAcessados.includes(c.id!));

  const renderCardCurso = (curso: Curso, isDisponivel: boolean) => {
    return (
      <div
        key={curso.id}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200 overflow-hidden"
      >
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
            {curso.tags && (
              <p>
                Tags: <span className="italic">{curso.tags}</span>
              </p>
            )}
          </div>

          <div className="mt-auto pt-3">
            {curso.categoria === "aovivo" ? (
              <a
                href={curso.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#9BB61B] text-[#281719] px-4 py-2 rounded-md hover:brightness-110 transition text-sm font-medium"
              >
                Entrar na Reunião
              </a>
            ) : (
              // Mesmo "Já Acessado" não fica desabilitado. Sempre chama handleAbrirModal
              <button
                onClick={() => handleAbrirModal(curso)}
                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition ${
                  isDisponivel
                    ? "bg-[#281719] text-white hover:brightness-125"
                    : "bg-[#281719] text-white hover:brightness-90"
                }`}
              >
                {isDisponivel ? "Acessar Curso" : "Já Acessado"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Função para concluir curso e redirecionar
  async function concluirCurso(cursoId: number, usuarioId: number) {
    await fetch("http://localhost:8080/certificados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId, cursoId }),
    });
    window.location.href = "/dashboard/cursos";
  }

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
      {/* Seção "O QUE APRENDER EM SEGUIDA" */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-[#281719] mb-1 mt-2">
          O QUE APRENDER EM SEGUIDA
        </h2>
        <p className="text-sm text-gray-600 mb-4">Recomendamos para Você</p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {cursosDisponiveis.length > 0 ? (
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

      {/* Seção "MEUS APRENDIZADOS" */}
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

      {/* Modal de detalhes do curso */}
      {modalAberta && cursoSelecionado && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 max-w-3xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            {/* Cabeçalho da modal */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-xl font-semibold text-[#281719]">
                {cursoSelecionado.titulo}
              </h3>
              <button onClick={fecharModal} className="text-gray-600 hover:text-gray-800">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Corpo com todas as informações */}
            <div className="p-6 space-y-4">
              {/* Imagem de capa, se existir */}
              {cursoSelecionado.capaCurso && (
                <img
                  src={`http://localhost:8080/uploads/${cursoSelecionado.capaCurso}`}
                  alt={`Capa do curso ${cursoSelecionado.titulo}`}
                  className="w-full h-56 object-cover rounded-md"
                />
              )}

              {/* Descrição detalhada */}
              <div>
                <h4 className="text-lg font-medium text-[#281719] mb-1">Descrição do Curso</h4>
                <p className="text-gray-700 whitespace-pre-line">
                  {cursoSelecionado.descricaoConteudo}
                </p>
              </div>

              {/* Informação curta e categoria */}
              <div className="flex flex-wrap gap-4">
                <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {cursoSelecionado.descricaoCurta}
                </span>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    cursoSelecionado.categoria === "aovivo"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {cursoSelecionado.categoria === "aovivo" ? "Ao vivo" : "Básico"}
                </span>
              </div>

              {/* Docente e data de início */}
              <div className="text-sm text-gray-600 space-y-1">
                {cursoSelecionado.docente && <p>Docente: {cursoSelecionado.docente}</p>}
                {cursoSelecionado.dataInicio && (
                  <p>
                    Data de Início:{" "}
                    {new Date(cursoSelecionado.dataInicio!).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                {cursoSelecionado.tags && (
                  <p>
                    Tags: <span className="italic">{cursoSelecionado.tags}</span>
                  </p>
                )}
              </div>

              {/* Material de apoio (link de download), se existir */}
              {cursoSelecionado.materialApoio && (
                <div>
                  <h4 className="text-lg font-medium text-[#281719] mb-1">Material de Apoio</h4>
                  <a
                    href={`http://localhost:8080/uploads/${cursoSelecionado.materialApoio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#281719] hover:underline"
                  >
                    {cursoSelecionado.materialApoio}
                  </a>
                </div>
              )}

              {/* Se for curso ao vivo, detalhes de Zoom */}
              {cursoSelecionado.categoria === "aovivo" && (
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-[#281719] mb-1">Detalhes da Reunião</h4>
                  {cursoSelecionado.zoomLink && (
                    <p>
                      Link:{" "}
                      <a
                        href={cursoSelecionado.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#281719] hover:underline"
                      >
                        Entrar na Reunião
                      </a>
                    </p>
                  )}
                  {cursoSelecionado.zoomDataHora && (
                    <p>
                      Data e Hora:{" "}
                      {new Date(cursoSelecionado.zoomDataHora!).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                  {cursoSelecionado.zoomDuracao && (
                    <p>Duração: {cursoSelecionado.zoomDuracao} minutos</p>
                  )}
                </div>
              )}
            </div>

            {/* Rodapé da modal */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button
                onClick={fecharModal}
                className="bg-[#281719] text-white px-4 py-2 rounded hover:brightness-110 transition"
              >
                Fechar
              </button>
              <button
                onClick={() => concluirCurso(cursoSelecionado.id!, 1)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:brightness-110 transition font-bold"
              >
                Concluir Curso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}