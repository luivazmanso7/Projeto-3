'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  conteudo: string;
  arquivo?: {
    nome: string;
    url: string;
  };
};

export default function PaginaCursos() {
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string } | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [novoCurso, setNovoCurso] = useState({
    titulo: '',
    descricao: '',
    conteudo: '',
    arquivo: undefined as Curso['arquivo'] | undefined,
  });
  const [cursoEditando, setCursoEditando] = useState<number | null>(null);
  const [edicaoCurso, setEdicaoCurso] = useState({
    titulo: '',
    descricao: '',
    conteudo: '',
    arquivo: undefined as Curso['arquivo'] | undefined,
  });

  useEffect(() => {
    const userStr = localStorage.getItem('usuarioAtual');
    if (userStr) setUsuarioAtual(JSON.parse(userStr));

    const cursosSalvos = localStorage.getItem('cursos_globais');
    if (cursosSalvos) setCursos(JSON.parse(cursosSalvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('cursos_globais', JSON.stringify(cursos));
  }, [cursos]);

  const criarCurso = () => {
    if (!novoCurso.titulo || !novoCurso.descricao || !novoCurso.conteudo) return;
    const novo: Curso = { id: Date.now(), ...novoCurso };
    setCursos([novo, ...cursos]);
    setNovoCurso({ titulo: '', descricao: '', conteudo: '', arquivo: undefined });
  };

  const deletarCurso = (id: number) => {
    setCursos(cursos.filter((c) => c.id !== id));
    if (cursoEditando === id) setCursoEditando(null);
  };

  const editarCurso = (curso: Curso) => {
    setCursoEditando(curso.id);
    setEdicaoCurso({
      titulo: curso.titulo,
      descricao: curso.descricao,
      conteudo: curso.conteudo,
      arquivo: curso.arquivo,
    });
  };

  const salvarEdicao = (id: number) => {
    const atualizados = cursos.map((c) =>
      c.id === id ? { ...c, ...edicaoCurso } : c
    );
    setCursos(atualizados);
    setCursoEditando(null);
  };

  const cancelarEdicao = () => {
    setCursoEditando(null);
  };

  const handleArquivo = (e: React.ChangeEvent<HTMLInputElement>, setState: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setState((prev: any) => ({
        ...prev,
        arquivo: {
          nome: file.name,
          url: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Cursos e Webinars</h1>

        {usuarioAtual?.email === 'admin@admin.com' && (
          <div className="bg-white p-4 rounded shadow space-y-2">
            <h2 className="text-xl font-semibold">Publicar Novo Curso</h2>
            <input
              type="text"
              placeholder="Título"
              value={novoCurso.titulo}
              onChange={(e) => setNovoCurso({ ...novoCurso, titulo: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={novoCurso.descricao}
              onChange={(e) => setNovoCurso({ ...novoCurso, descricao: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Conteúdo"
              value={novoCurso.conteudo}
              onChange={(e) => setNovoCurso({ ...novoCurso, conteudo: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              onChange={(e) => handleArquivo(e, setNovoCurso)}
              className="w-full p-2"
            />
            <button
              onClick={criarCurso}
              className="bg-[#281719] text-white px-4 py-2 rounded hover:brightness-125"
            >
              Publicar Curso
            </button>
          </div>
        )}

        <div className="space-y-4">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white p-4 rounded shadow space-y-2">
              {cursoEditando === curso.id ? (
                <>
                  <input
                    type="text"
                    value={edicaoCurso.titulo}
                    onChange={(e) => setEdicaoCurso({ ...edicaoCurso, titulo: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={edicaoCurso.descricao}
                    onChange={(e) => setEdicaoCurso({ ...edicaoCurso, descricao: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={edicaoCurso.conteudo}
                    onChange={(e) => setEdicaoCurso({ ...edicaoCurso, conteudo: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleArquivo(e, setEdicaoCurso)}
                    className="w-full p-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => salvarEdicao(curso.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelarEdicao}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{curso.titulo}</h3>
                  <p className="text-sm text-gray-600">{curso.descricao}</p>
                  <p>{curso.conteudo}</p>
                  {curso.arquivo && (
                    <a
                      href={curso.arquivo.url}
                      download={curso.arquivo.nome}
                      className="text-blue-600 underline"
                    >
                      Baixar arquivo: {curso.arquivo.nome}
                    </a>
                  )}
                  {usuarioAtual?.email === 'admin@admin.com' && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => editarCurso(curso)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletarCurso(curso.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
