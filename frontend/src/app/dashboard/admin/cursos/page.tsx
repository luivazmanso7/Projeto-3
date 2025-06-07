'use client';
import { useEffect, useState } from 'react';
import { cursoAdminService, Curso, CursoForm } from '@/services/cursoAdminService';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaSave } from 'react-icons/fa';
import SidebarLayout from '@/components/SidebarLayout';

export default function AdminCursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);
  const [formData, setFormData] = useState<Curso>({
    titulo: '',
    descricaoConteudo: '',
    descricaoCurta: '',
    categoria: 'BASICO',
    docente: '',
    tags: '',
    dataInicio: ''
  });
  const [arquivos, setArquivos] = useState<{
    capaCurso?: File;
    materialApoio?: File;
  }>({});

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    try {
      setLoading(true);
      const cursosData = await cursoAdminService.listarCursos();
      setCursos(cursosData);
    } catch (err) {
      setError('Erro ao carregar cursos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cursosFiltrados = cursos.filter(curso =>
    curso.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
    curso.docente?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
    curso.categoria.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const abrirModal = (curso?: Curso) => {
    if (curso) {
      setEditingCurso(curso);
      setFormData(curso);
    } else {
      setEditingCurso(null);
      setFormData({
        titulo: '',
        descricaoConteudo: '',
        descricaoCurta: '',
        categoria: 'BASICO',
        docente: '',
        tags: '',
        dataInicio: ''
      });
    }
    setArquivos({});
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setEditingCurso(null);
    setFormData({
      titulo: '',
      descricaoConteudo: '',
      descricaoCurta: '',
      categoria: 'BASICO',
      docente: '',
      tags: '',
      dataInicio: ''
    });
    setArquivos({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cursoForm: CursoForm = {
        curso: formData,
        capaCurso: arquivos.capaCurso,
        materialApoio: arquivos.materialApoio
      };

      if (editingCurso) {
        await cursoAdminService.atualizarCurso(editingCurso.id!, cursoForm);
      } else {
        await cursoAdminService.criarCurso(cursoForm);
      }

      await carregarCursos();
      fecharModal();
    } catch (err) {
      setError('Erro ao salvar curso');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await cursoAdminService.excluirCurso(id);
        await carregarCursos();
      } catch (err) {
        setError('Erro ao excluir curso');
        console.error(err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setArquivos(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Carregando cursos...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#281719]">Administrar Cursos</h1>
          <button
            onClick={() => abrirModal()}
            className="bg-[#9BB61B] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8BA019] transition"
          >
            <FaPlus /> Novo Curso
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Barra de pesquisa */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar cursos..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
            />
          </div>
        </div>

        {/* Lista de cursos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Docente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Início
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cursosFiltrados.map((curso) => (
                <tr key={curso.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{curso.titulo}</div>
                    <div className="text-sm text-gray-500">{curso.descricaoCurta}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      curso.categoria === 'BASICO' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {curso.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {curso.docente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {curso.dataInicio ? new Date(curso.dataInicio).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => abrirModal(curso)}
                      className="text-[#9BB61B] hover:text-[#8BA019] mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(curso.id!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {cursosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum curso encontrado
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#281719]">
                  {editingCurso ? 'Editar Curso' : 'Novo Curso'}
                </h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição Curta
                  </label>
                  <input
                    type="text"
                    name="descricaoCurta"
                    value={formData.descricaoCurta}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição do Conteúdo
                  </label>
                  <textarea
                    name="descricaoConteudo"
                    value={formData.descricaoConteudo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    >
                      <option value="BASICO">Básico</option>
                      <option value="AO_VIVO">Ao Vivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Docente
                    </label>
                    <input
                      type="text"
                      name="docente"
                      value={formData.docente}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="Ex: investimento, sustentabilidade"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      name="dataInicio"
                      value={formData.dataInicio}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capa do Curso
                    </label>
                    <input
                      type="file"
                      name="capaCurso"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material de Apoio
                    </label>
                    <input
                      type="file"
                      name="materialApoio"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#9BB61B] text-white rounded-lg hover:bg-[#8BA019] flex items-center gap-2"
                  >
                    <FaSave /> Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
}
