'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

type CursoItem = { // Renomeado para evitar conflito com nome do componente/arquivo se houver
  id: number;
  tipo: 'simples' | 'aovivo'; // Alterado
  titulo: string;
  descricao: string;
  conteudo: string;
  material?: { // Alterado de arquivo para material
    nome: string;
    url: string;
  };
  zoomLink?: string;
  zoomDataHora?: string;
  zoomDuracao?: number;
  zoomId?: string;
  zoomSenha?: string;
};

const TIPO_SIMPLES = 'simples';
const TIPO_AOVIVO = 'aovivo';

export default function PaginaCursos() {
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string } | null>(null);
  const [cursos, setCursos] = useState<CursoItem[]>([]);
  const [novoCurso, setNovoCurso] = useState<Omit<CursoItem, 'id'>>({
    tipo: TIPO_SIMPLES,
    titulo: '',
    descricao: '',
    conteudo: '',
    material: undefined,
    zoomLink: '',
    zoomDataHora: '',
    zoomDuracao: 0,
    zoomId: '',
    zoomSenha: '',
  });
  const [cursoEditando, setCursoEditando] = useState<number | null>(null);
  const [edicaoCurso, setEdicaoCurso] = useState<Omit<CursoItem, 'id'>>({
    tipo: TIPO_SIMPLES,
    titulo: '',
    descricao: '',
    conteudo: '',
    material: undefined,
    zoomLink: '',
    zoomDataHora: '',
    zoomDuracao: 0,
    zoomId: '',
    zoomSenha: '',
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

  const resetFormularioNovoCurso = () => {
    setNovoCurso({
      tipo: TIPO_SIMPLES,
      titulo: '',
      descricao: '',
      conteudo: '',
      material: undefined,
      zoomLink: '',
      zoomDataHora: '',
      zoomDuracao: 0,
      zoomId: '',
      zoomSenha: '',
    });
  }

  const criarCurso = () => {
    if (!novoCurso.titulo || !novoCurso.descricao) {
        alert("Título e Descrição são obrigatórios.");
        return;
    }
    if (novoCurso.tipo === TIPO_AOVIVO && (!novoCurso.zoomLink || !novoCurso.zoomDataHora || !novoCurso.zoomDuracao)) {
        alert("Para Cursos ao vivo, o link, data/hora e duração da reunião Zoom são obrigatórios.");
        return;
    }
    const novo: CursoItem = { id: Date.now(), ...novoCurso };
    setCursos([novo, ...cursos]);
    resetFormularioNovoCurso();
  };

  const deletarCurso = (id: number) => {
    setCursos(cursos.filter((c) => c.id !== id));
    if (cursoEditando === id) setCursoEditando(null);
  };

  const editarCurso = (curso: CursoItem) => {
    setCursoEditando(curso.id);
    setEdicaoCurso({
      tipo: curso.tipo,
      titulo: curso.titulo,
      descricao: curso.descricao,
      conteudo: curso.conteudo,
      material: curso.material,
      zoomLink: curso.zoomLink || '',
      zoomDataHora: curso.zoomDataHora || '',
      zoomDuracao: curso.zoomDuracao || 0,
      zoomId: curso.zoomId || '',
      zoomSenha: curso.zoomSenha || '',
    });
  };

  const salvarEdicao = (id: number) => {
    if (!edicaoCurso.titulo || !edicaoCurso.descricao) {
        alert("Título e Descrição são obrigatórios.");
        return;
    }
    if (edicaoCurso.tipo === TIPO_AOVIVO && (!edicaoCurso.zoomLink || !edicaoCurso.zoomDataHora || !edicaoCurso.zoomDuracao)) {
        alert("Para Cursos ao vivo, o link, data/hora e duração da reunião Zoom são obrigatórios.");
        return;
    }
    const atualizados = cursos.map((c) =>
      c.id === id ? { ...c, ...edicaoCurso } : c
    );
    setCursos(atualizados);
    setCursoEditando(null);
  };

  const cancelarEdicao = () => {
    setCursoEditando(null);
  };

  const handleMaterialUpload = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<Omit<CursoItem, 'id'>>>) => {
    const file = e.target.files?.[0];
    if (!file) {
        setState((prev: Omit<CursoItem, 'id'>) => ({
            ...prev,
            material: undefined,
          }));
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setState((prev: Omit<CursoItem, 'id'>) => ({
        ...prev,
        material: {
          nome: file.name,
          url: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const renderFormFields = (state: Omit<CursoItem, 'id'>, setState: React.Dispatch<React.SetStateAction<Omit<CursoItem, 'id'>>>) => (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Tipo:</label>
        <select
          value={state.tipo}
          onChange={(e) => setState({ ...state, tipo: e.target.value as 'simples' | 'aovivo', zoomLink: '', zoomDataHora: '', zoomDuracao: 0, zoomId:'', zoomSenha:'' })}
          className="w-full p-2 border rounded"
        >
          <option value={TIPO_SIMPLES}>Curso simples</option>
          <option value={TIPO_AOVIVO}>Curso ao vivo</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Título*"
        value={state.titulo}
        onChange={(e) => setState({ ...state, titulo: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Descrição*"
        value={state.descricao}
        onChange={(e) => setState({ ...state, descricao: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Conteúdo" // Alterado para ser sempre "Conteúdo"
        value={state.conteudo}
        onChange={(e) => setState({ ...state, conteudo: e.target.value })}
        className="w-full p-2 border rounded"
        rows={5} // Ajuste conforme necessário
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Material (opcional):</label>
        <input
          type="file"
          onChange={(e) => handleMaterialUpload(e, setState)}
          className="w-full p-2 border rounded text-sm"
        />
        {state.material && <p className="text-xs text-gray-500">Atual: {state.material.nome}</p>}
      </div>

      {state.tipo === TIPO_AOVIVO && (
        <div className="p-3 border-t mt-2 space-y-2">
          <h3 className="text-md font-semibold text-gray-700">Detalhes da Reunião Zoom (Curso ao vivo)</h3>
          <input
            type="url"
            placeholder="Link da Reunião Zoom*"
            value={state.zoomLink}
            onChange={(e) => setState({ ...state, zoomLink: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="datetime-local"
              title="Data e Hora da Reunião"
              value={state.zoomDataHora}
              onChange={(e) => setState({ ...state, zoomDataHora: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Duração (minutos)*"
              value={state.zoomDuracao === 0 ? '' : state.zoomDuracao}
              onChange={(e) => setState({ ...state, zoomDuracao: parseInt(e.target.value, 10) || 0 })}
              className="w-full p-2 border rounded"
              min="1"
            />
          </div>
          <input
            type="text"
            placeholder="ID da Reunião (opcional)"
            value={state.zoomId}
            onChange={(e) => setState({ ...state, zoomId: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Senha da Reunião (opcional)"
            value={state.zoomSenha}
            onChange={(e) => setState({ ...state, zoomSenha: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
    </>
  );

  return (
    <SidebarLayout>
      <div className="p-4 md:p-6 space-y-6 bg-[#FFFCE5] min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Cursos e Webinars</h1>

        {usuarioAtual?.email === 'admin@admin.com' && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Publicar Novo Item</h2>
            {renderFormFields(novoCurso, setNovoCurso)}
            <button
              onClick={criarCurso}
              className="bg-[#281719] text-white px-6 py-2 rounded-md hover:brightness-125 transition duration-150"
            >
              Publicar
            </button>
          </div>
        )}

        <div className="space-y-4">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-3 border border-gray-200">
              {cursoEditando === curso.id ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700">Editando: {edicaoCurso.titulo || "Item"}</h3>
                  {renderFormFields(edicaoCurso, setEdicaoCurso)}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => salvarEdicao(curso.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelarEdicao}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-[#281719]">{curso.titulo}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${curso.tipo === TIPO_AOVIVO ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {curso.tipo === TIPO_AOVIVO ? 'Curso ao vivo' : 'Curso simples'}
                  </span>
                  <p className="text-sm text-gray-600">{curso.descricao}</p>
                  
                  {/* Exibição do Conteúdo */}
                  {curso.conteudo && (
                    <div className="prose prose-sm max-w-none mt-2">
                        <h4 className="font-semibold text-gray-700">Conteúdo:</h4>
                        <p className="whitespace-pre-wrap">{curso.conteudo}</p> {/* Adicionado whitespace-pre-wrap para manter formatação */}
                    </div>
                  )}

                  {curso.tipo === TIPO_AOVIVO && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 space-y-2">
                      <h4 className="font-semibold text-gray-700">Detalhes da Reunião (Curso ao vivo):</h4>
                      <p className="text-sm"><strong>Data e Hora:</strong> {curso.zoomDataHora ? new Date(curso.zoomDataHora).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Não definido'}</p>
                      <p className="text-sm"><strong>Duração:</strong> {curso.zoomDuracao ? `${curso.zoomDuracao} minutos` : 'Não definido'}</p>
                      {curso.zoomLink && (
                        <a
                          href={curso.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                        >
                          Entrar na Reunião Zoom
                        </a>
                      )}
                       {curso.zoomId && <p className="text-xs text-gray-500">ID da Reunião: {curso.zoomId}</p>}
                       {curso.zoomSenha && <p className="text-xs text-gray-500">Senha da Reunião: {curso.zoomSenha}</p>}
                    </div>
                  )}
                  
                  {curso.material && ( // Alterado de arquivo para material
                    <div className="mt-3">
                        <a
                        href={curso.material.url}
                        download={curso.material.nome}
                        className="text-blue-600 hover:underline text-sm"
                        >
                        Baixar material: {curso.material.nome} 
                        </a>
                    </div>
                  )}

                  {usuarioAtual?.email === 'admin@admin.com' && (
                    <div className="flex gap-2 mt-4 border-t pt-3">
                      <button
                        onClick={() => editarCurso(curso)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletarCurso(curso.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
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