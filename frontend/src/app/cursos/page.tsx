'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import { useRouter } from 'next/navigation'; // Para navegação

// Ícone simples de pesquisa (SVG embutido)
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

type CursoItem = {
  id: number;
  titulo: string;
  capa?: string;
  descricao: string;
  conteudo: string;
  categoria: 'basico' | 'aovivo';
  docente?: string;
  tags?: string;
  dataInicio?: string;
  materialApoio: { // Tornando obrigatório (removido '?')
    nome: string;
    url: string;
  };
  zoomLink?: string;
  zoomDataHora?: string;
  zoomDuracao?: number;
  zoomId?: string;
  zoomSenha?: string;
};

const CATEGORIA_BASICO = 'basico';
const CATEGORIA_AOVIVO = 'aovivo';

export default function PaginaCursos() {
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string } | null>(null);
  const [cursos, setCursos] = useState<CursoItem[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<CursoItem[]>([]); // Para a pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState(''); // Para a pesquisa
  const router = useRouter();

  const [novoCurso, setNovoCurso] = useState<Omit<CursoItem, 'id'>>({
    titulo: '',
    capa: undefined,
    descricao: '',
    conteudo: '',
    categoria: CATEGORIA_BASICO,
    docente: '',
    tags: '',
    dataInicio: '',
    materialApoio: { nome: '', url: '' }, // Inicializar para obrigatório
    zoomLink: '',
    zoomDataHora: '',
    zoomDuracao: 0,
    zoomId: '',
    zoomSenha: '',
  });
  const [cursoEditando, setCursoEditando] = useState<number | null>(null);
  const [edicaoCurso, setEdicaoCurso] = useState<Omit<CursoItem, 'id'>>({
    titulo: '',
    capa: undefined,
    descricao: '',
    conteudo: '',
    categoria: CATEGORIA_BASICO,
    docente: '',
    tags: '',
    dataInicio: '',
    materialApoio: { nome: '', url: '' }, // Inicializar para obrigatório
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
    if (cursosSalvos) {
        try {
            const parsedCursos = JSON.parse(cursosSalvos);
            setCursos(parsedCursos);
            setCursosFiltrados(parsedCursos); // Inicializa filtrados com todos os cursos
        } catch (error) {
            console.error("Erro ao carregar cursos do localStorage:", error);
            localStorage.removeItem('cursos_globais');
        }
    }
  }, []);

  useEffect(() => {
    if (usuarioAtual) {
        localStorage.setItem('cursos_globais', JSON.stringify(cursos));
        // Atualiza a lista filtrada quando os cursos principais mudam
        const filtrados = cursos.filter(curso =>
            curso.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            curso.descricao.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            (curso.tags && curso.tags.toLowerCase().includes(termoPesquisa.toLowerCase()))
        );
        setCursosFiltrados(filtrados);
    }
  }, [cursos, usuarioAtual, termoPesquisa]);


  // Filtrar cursos com base no termo de pesquisa
  useEffect(() => {
    if (!termoPesquisa) {
      setCursosFiltrados(cursos);
      return;
    }
    const filtrados = cursos.filter(curso =>
      curso.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      curso.descricao.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      (curso.docente && curso.docente.toLowerCase().includes(termoPesquisa.toLowerCase())) ||
      (curso.tags && curso.tags.toLowerCase().includes(termoPesquisa.toLowerCase()))
    );
    setCursosFiltrados(filtrados);
  }, [termoPesquisa, cursos]);


  const resetFormularioNovoCurso = () => {
    setNovoCurso({
      titulo: '',
      capa: undefined,
      descricao: '',
      conteudo: '',
      categoria: CATEGORIA_BASICO,
      docente: '',
      tags: '',
      dataInicio: '',
      materialApoio: { nome: '', url: '' },
      zoomLink: '',
      zoomDataHora: '',
      zoomDuracao: 0,
      zoomId: '',
      zoomSenha: '',
    });
  };

  const validarCurso = (curso: Omit<CursoItem, 'id'>) => {
    if (!curso.titulo || !curso.descricao) {
        alert("Título e Descrição Curta são obrigatórios.");
        return false;
    }
    if (!curso.materialApoio || !curso.materialApoio.nome || !curso.materialApoio.url) { // Validação para Material de Apoio
        alert("Material de Apoio é obrigatório.");
        return false;
    }
    if (curso.categoria === CATEGORIA_AOVIVO && (!curso.zoomLink || !curso.zoomDataHora || (curso.zoomDuracao !== undefined && curso.zoomDuracao <= 0) )) {
        alert("Para Cursos ao vivo, o link, data/hora e duração (maior que zero) da reunião Zoom são obrigatórios.");
        return false;
    }
    return true;
  }

  const criarCurso = () => {
    if (!validarCurso(novoCurso)) return;
    const novo: CursoItem = { id: Date.now(), ...novoCurso };
    setCursos([novo, ...cursos]);
    resetFormularioNovoCurso();
  };

  const deletarCurso = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
        setCursos(cursos.filter((c) => c.id !== id));
        if (cursoEditando === id) setCursoEditando(null);
    }
  };

  const editarCursoHandle = (curso: CursoItem) => {
    setCursoEditando(curso.id);
    setEdicaoCurso({
      titulo: curso.titulo,
      capa: curso.capa,
      descricao: curso.descricao,
      conteudo: curso.conteudo,
      categoria: curso.categoria,
      docente: curso.docente || '',
      tags: curso.tags || '',
      dataInicio: curso.dataInicio || '',
      materialApoio: curso.materialApoio || { nome: '', url: '' }, // Garantir que materialApoio exista
      zoomLink: curso.zoomLink || '',
      zoomDataHora: curso.zoomDataHora || '',
      zoomDuracao: curso.zoomDuracao || 0,
      zoomId: curso.zoomId || '',
      zoomSenha: curso.zoomSenha || '',
    });
  };

  const salvarEdicao = (id: number) => {
    if (!validarCurso(edicaoCurso)) return;
    const atualizados = cursos.map((c) =>
      c.id === id ? { ...edicaoCurso, id: c.id } : c
    );
    setCursos(atualizados);
    setCursoEditando(null);
  };

  const cancelarEdicao = () => {
    setCursoEditando(null);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<Omit<CursoItem, 'id'>>>,
    fieldName: 'capa' | 'materialApoio'
  ) => {
    const file = e.target.files?.[0];
    const currentTarget = e.currentTarget; // Salva a referência para usar no setState

    if (!file) {
      if (fieldName === 'materialApoio') {
        setState((prev) => ({ ...prev, materialApoio: { nome: '', url: ''} })); // Reset se obrigatório
      } else if (fieldName === 'capa') {
        setState((prev) => ({ ...prev, capa: undefined }));
      }
      if (currentTarget) currentTarget.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (fieldName === 'materialApoio') {
        setState((prev) => ({
          ...prev,
          materialApoio: { nome: file.name, url: result },
        }));
      } else if (fieldName === 'capa') {
        setState((prev) => ({ ...prev, capa: result }));
      }
    };
    reader.readAsDataURL(file);
  };
  
  const renderFormFields = (state: Omit<CursoItem, 'id'>, setState: React.Dispatch<React.SetStateAction<Omit<CursoItem, 'id'>>>, isEditing: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
      {/* Coluna Esquerda */}
      <div className="md:col-span-2 space-y-4">
        <div>
          <label htmlFor={isEditing ? "edit-titulo" : "novo-titulo"} className="block text-sm font-medium text-gray-700 mb-1">TÍTULO*</label>
          <input
            id={isEditing ? "edit-titulo" : "novo-titulo"}
            type="text"
            value={state.titulo}
            onChange={(e) => setState({ ...state, titulo: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
          />
        </div>

        <div>
          <label htmlFor={isEditing ? "edit-capa" : "novo-capa"} className="block text-sm font-medium text-gray-700 mb-1">Capa do Curso (opcional)</label>
          <input
            id={isEditing ? "edit-capa" : "novo-capa"}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setState, 'capa')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E8E8D7] file:text-[#281719] hover:file:bg-[#D8D8C7]"
          />
          {state.capa && (
            <div className="mt-2">
              <img src={state.capa} alt="Pré-visualização da capa" className="max-h-40 rounded-md border" />
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor={isEditing ? "edit-conteudo" : "novo-conteudo"} className="block text-sm font-medium text-gray-700 mb-1">Descrição do conteúdo*</label>
          <textarea
            id={isEditing ? "edit-conteudo" : "novo-conteudo"}
            placeholder="Descreva o conteúdo detalhado do curso..."
            value={state.conteudo}
            onChange={(e) => setState({ ...state, conteudo: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
            rows={7}
          />
        </div>
         <div>
          <label htmlFor={isEditing ? "edit-desc-curta" : "novo-desc-curta"} className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta (para listagem)*</label>
          <textarea
            id={isEditing ? "edit-desc-curta" : "novo-desc-curta"}
            placeholder="Uma breve descrição que aparecerá na listagem de cursos."
            value={state.descricao}
            onChange={(e) => setState({ ...state, descricao: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
            rows={3}
          />
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="space-y-4">
        <div>
          <label htmlFor={isEditing ? "edit-categoria" : "novo-categoria"} className="block text-sm font-medium text-gray-700 mb-1">Categoria*</label>
          <select
            id={isEditing ? "edit-categoria" : "novo-categoria"}
            value={state.categoria}
            onChange={(e) => {
                const newCategoria = e.target.value as 'basico' | 'aovivo';
                setState({ 
                    ...state, 
                    categoria: newCategoria, 
                    zoomLink: newCategoria === CATEGORIA_BASICO ? '' : state.zoomLink, 
                    zoomDataHora: newCategoria === CATEGORIA_BASICO ? '' : state.zoomDataHora, 
                    zoomDuracao: newCategoria === CATEGORIA_BASICO ? 0 : state.zoomDuracao, 
                    zoomId: newCategoria === CATEGORIA_BASICO ? '' : state.zoomId, 
                    zoomSenha: newCategoria === CATEGORIA_BASICO ? '' : state.zoomSenha 
                });
            }}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
          >
            <option value={CATEGORIA_BASICO}>Básico</option>
            <option value={CATEGORIA_AOVIVO}>Ao vivo</option>
          </select>
        </div>

        <div>
          <label htmlFor={isEditing ? "edit-docente" : "novo-docente"} className="block text-sm font-medium text-gray-700 mb-1">Registrar Docente</label>
          <input
            id={isEditing ? "edit-docente" : "novo-docente"}
            type="text"
            placeholder="Nome do docente"
            value={state.docente}
            onChange={(e) => setState({ ...state, docente: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
          />
        </div>

        <div>
          <label htmlFor={isEditing ? "edit-material" : "novo-material"} className="block text-sm font-medium text-gray-700 mb-1">Material de Apoio*</label>
          <input
            id={isEditing ? "edit-material" : "novo-material"}
            type="file"
            onChange={(e) => handleFileUpload(e, setState, 'materialApoio')}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E8E8D7] file:text-[#281719] hover:file:bg-[#D8D8C7]"
          />
          {state.materialApoio?.nome && <p className="text-xs text-gray-500 mt-1">Atual: {state.materialApoio.nome}</p>}
        </div>
        
        <div>
          <label htmlFor={isEditing ? "edit-tags" : "novo-tags"} className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            id={isEditing ? "edit-tags" : "novo-tags"}
            type="text"
            placeholder="Ex: Sustentabilidade, Finanças, ESG"
            value={state.tags}
            onChange={(e) => setState({ ...state, tags: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
          />
           <p className="text-xs text-gray-500 mt-1">Separe as tags por vírgula.</p>
        </div>

        <div>
            <label htmlFor={isEditing ? "edit-dataInicio" : "novo-dataInicio"} className="block text-sm font-medium text-gray-700 mb-1">Data de início</label>
            <input
                id={isEditing ? "edit-dataInicio" : "novo-dataInicio"}
                type="date"
                value={state.dataInicio}
                onChange={(e) => setState({ ...state, dataInicio: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
            />
        </div>

        {state.categoria === CATEGORIA_AOVIVO && (
          <div className="p-3 border-t mt-4 space-y-3 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700">Detalhes da Reunião Zoom (Curso ao vivo)</h3>
            <div>
              <label htmlFor={isEditing ? "edit-zoomLink" : "novo-zoomLink"} className="block text-xs font-medium text-gray-600 mb-1">Link da Reunião*</label>
              <input
                id={isEditing ? "edit-zoomLink" : "novo-zoomLink"}
                type="url"
                placeholder="https://zoom.us/j/..."
                value={state.zoomLink}
                onChange={(e) => setState({ ...state, zoomLink: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                  <label htmlFor={isEditing ? "edit-zoomDataHora" : "novo-zoomDataHora"} className="block text-xs font-medium text-gray-600 mb-1">Data e Hora*</label>
                  <input
                    id={isEditing ? "edit-zoomDataHora" : "novo-zoomDataHora"}
                    type="datetime-local"
                    value={state.zoomDataHora}
                    onChange={(e) => setState({ ...state, zoomDataHora: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
                  />
              </div>
              <div>
                  <label htmlFor={isEditing ? "edit-zoomDuracao" : "novo-zoomDuracao"} className="block text-xs font-medium text-gray-600 mb-1">Duração (min)*</label>
                  <input
                    id={isEditing ? "edit-zoomDuracao" : "novo-zoomDuracao"}
                    type="number"
                    placeholder="Ex: 60"
                    value={state.zoomDuracao === 0 ? '' : state.zoomDuracao}
                    onChange={(e) => setState({ ...state, zoomDuracao: parseInt(e.target.value, 10) || 0 })}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
                    min="1"
                  />
              </div>
            </div>
            <div>
              <label htmlFor={isEditing ? "edit-zoomId" : "novo-zoomId"} className="block text-xs font-medium text-gray-600 mb-1">ID da Reunião (opcional)</label>
              <input
                id={isEditing ? "edit-zoomId" : "novo-zoomId"}
                type="text"
                value={state.zoomId}
                onChange={(e) => setState({ ...state, zoomId: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
              />
            </div>
            <div>
              <label htmlFor={isEditing ? "edit-zoomSenha" : "novo-zoomSenha"} className="block text-xs font-medium text-gray-600 mb-1">Senha da Reunião (opcional)</label>
              <input
                id={isEditing ? "edit-zoomSenha" : "novo-zoomSenha"}
                type="text"
                value={state.zoomSenha}
                onChange={(e) => setState({ ...state, zoomSenha: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const handleAcessarCurso = (cursoId: number) => {
    // Navegar para uma página de detalhes do curso
    // Esta página precisa ser criada (ex: src/app/cursos/[id]/page.tsx)
    router.push(`/cursos/${cursoId}`);
  };

  return (
    <SidebarLayout>
      <div className="p-4 md:p-6 space-y-8 bg-[#FFFCE5] min-h-screen">
        {/* Barra de Pesquisa e Título */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#281719]">Cursos e Webinars</h1>
            <div className="relative w-full sm:w-72 md:w-96">
                <input
                type="text"
                placeholder="Pesquisar cursos..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9BB61B] focus:border-[#9BB61B]"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>


        {usuarioAtual?.email === 'admin@admin.com' && (
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#281719] border-b pb-3">
              {cursoEditando !== null ? `Editando Curso: ${edicaoCurso.titulo}` : "Criação de novo curso"}
            </h2>
            {cursoEditando !== null ? 
                renderFormFields(edicaoCurso, setEdicaoCurso, true) : 
                renderFormFields(novoCurso, setNovoCurso, false)
            }
            <div className="flex gap-3 pt-4 justify-end mt-6">
              {cursoEditando !== null ? (
                <>
                  <button
                    onClick={() => salvarEdicao(cursoEditando)}
                    className="bg-[#9BB61B] text-[#281719] px-5 py-2.5 rounded-lg hover:brightness-110 transition duration-150 font-semibold"
                  >
                    Salvar curso
                  </button>
                  <button
                    onClick={cancelarEdicao}
                    className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition duration-150 font-semibold"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={criarCurso}
                  className="bg-[#281719] text-white px-6 py-3 rounded-lg hover:brightness-125 transition duration-150 font-semibold"
                >
                  Publicar
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursosFiltrados.length === 0 && <p className="text-gray-600 md:col-span-full">Nenhum curso ou webinar encontrado.</p>}
          {cursosFiltrados.map((curso) => (
            <div key={curso.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200 overflow-hidden">
              {/* Imagem da Capa ou Placeholder */}
              {curso.capa ? (
                <img src={curso.capa} alt={`Capa do curso ${curso.titulo}`} className="w-full h-48 object-cover"/>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>
              )}
              
              <div className="p-5 flex flex-col flex-grow space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#281719] leading-tight">{curso.titulo}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${curso.categoria === CATEGORIA_AOVIVO ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {curso.categoria === CATEGORIA_AOVIVO ? 'Ao vivo' : 'Básico'}
                    </span>
                </div>
              
                <p className="text-sm text-gray-600 leading-relaxed flex-grow line-clamp-3">{curso.descricao}</p>
                
                {/* Informações Adicionais */}
                <div className="text-xs text-gray-500 space-y-0.5">
                    {curso.docente && <p>Docente: {curso.docente}</p>}
                    {curso.dataInicio && <p>Início: {new Date(curso.dataInicio + 'T00:00:00').toLocaleDateString('pt-BR')}</p>}
                    {curso.tags && <p>Tags: <span className="italic">{curso.tags}</span></p>}
                </div>

                {/* Conteúdo detalhado não será mostrado aqui para manter card conciso */}

                {curso.categoria === CATEGORIA_AOVIVO && curso.zoomLink && (
                <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                    <p className="text-xs text-gray-500"><strong>Reunião:</strong> {curso.zoomDataHora ? new Date(curso.zoomDataHora).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Não definido'}{curso.zoomDuracao ? ` (${curso.zoomDuracao} min)` : ''}</p>
                </div>
                )}
              
                {/* Botão para Acessar o Curso (para todos os usuários) */}
                 <div className="mt-auto pt-3">
                    {/* Se for admin, mostra link para Zoom diretamente se for ao vivo, caso contrário botão de acessar */}
                    {usuarioAtual?.email === 'admin@admin.com' || curso.categoria === CATEGORIA_BASICO || (curso.categoria === CATEGORIA_AOVIVO && !curso.zoomLink) ? (
                        <button
                            onClick={() => handleAcessarCurso(curso.id)}
                            className="w-full bg-[#281719] text-white px-4 py-2 rounded-md hover:brightness-125 transition text-sm font-medium"
                        >
                            Acessar Curso
                        </button>
                    ) : null}
                     {curso.categoria === CATEGORIA_AOVIVO && curso.zoomLink && (
                        <a
                            href={curso.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-[#9BB61B] text-[#281719] px-4 py-2 rounded-md hover:brightness-110 transition text-sm font-medium"
                        >
                            Entrar na Reunião
                        </a>
                    )}
                </div>


                {/* Ações de Admin */}
                {usuarioAtual?.email === 'admin@admin.com' && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100 justify-end">
                    <button
                        onClick={() => editarCursoHandle(curso)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs hover:bg-yellow-600 font-semibold"
                    >
                    Editar
                    </button>
                    <button
                        onClick={() => deletarCurso(curso.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700 font-semibold"
                    >
                    Excluir
                    </button>
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}