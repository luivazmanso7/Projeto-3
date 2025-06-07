'use client';
import { useEffect, useState } from 'react';
import { postagemService, Postagem, Forum, NovaPostagem } from '@/services/postagemService';
import { FaHeart, FaComment, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

export default function PostagensPage() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [foruns, setForuns] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [novaPostagem, setNovaPostagem] = useState<NovaPostagem>({
    titulo: '',
    conteudo: '',
    forumId: 0,
    autorId: 0
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Buscar ID do usuário logado
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
      if (usuarioLogado.id) {
        setNovaPostagem(prev => ({ ...prev, autorId: usuarioLogado.id }));
      }

      const [postagensData, forunsData] = await Promise.all([
        postagemService.listarPostagens(),
        postagemService.listarForuns()
      ]);

      setPostagens(postagensData);
      setForuns(forunsData);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaPostagem.titulo.trim() || !novaPostagem.conteudo.trim() || !novaPostagem.forumId) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      await postagemService.criarPostagem(novaPostagem);
      await carregarDados();
      setShowModal(false);
      setNovaPostagem({
        titulo: '',
        conteudo: '',
        forumId: 0,
        autorId: novaPostagem.autorId
      });
      setError(null);
    } catch (err) {
      setError('Erro ao criar postagem');
      console.error(err);
    }
  };

  const handleCurtir = async (id: number) => {
    try {
      await postagemService.curtirPostagem(id);
      await carregarDados();
    } catch (err) {
      setError('Erro ao curtir postagem');
      console.error(err);
    }
  };

  const handleExcluir = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta postagem?')) {
      try {
        await postagemService.excluirPostagem(id);
        await carregarDados();
      } catch (err) {
        setError('Erro ao excluir postagem');
        console.error(err);
      }
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Carregando postagens...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#281719]">Postagens</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#9BB61B] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#8BA019] transition"
        >
          <FaPlus /> Nova Postagem
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Lista de postagens */}
      <div className="space-y-4">
        {postagens.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma postagem encontrada.</p>
          </div>
        ) : (
          postagens.map((postagem) => (
            <div key={postagem.idPost} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#281719]">
                    {postagem.autor?.nome || 'Usuário Desconhecido'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {postagem.forum?.titulo} • {postagem.dataPostagem && formatarData(postagem.dataPostagem)}
                  </p>
                </div>
                {/* Mostrar botão de excluir apenas para postagens do usuário logado */}
                {postagem.autor?.id === novaPostagem.autorId && (
                  <button
                    onClick={() => handleExcluir(postagem.idPost!)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>

              <h4 className="font-bold text-xl text-[#281719] mb-2">{postagem.titulo}</h4>
              <p className="text-gray-700 mb-4">{postagem.conteudo}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleCurtir(postagem.idPost!)}
                  className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
                >
                  <FaHeart /> {postagem.curtidas || 0}
                </button>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaComment /> {postagem.comentarios?.length || 0}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para nova postagem */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#281719]">Nova Postagem</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fórum
                </label>
                <select
                  value={novaPostagem.forumId}
                  onChange={(e) => setNovaPostagem({ ...novaPostagem, forumId: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                  required
                >
                  <option value={0}>Selecione um fórum</option>
                  {foruns.map((forum) => (
                    <option key={forum.idForum} value={forum.idForum}>
                      {forum.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={novaPostagem.titulo}
                  onChange={(e) => setNovaPostagem({ ...novaPostagem, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent"
                  placeholder="Digite o título da postagem..."
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conteúdo
                </label>
                <textarea
                  value={novaPostagem.conteudo}
                  onChange={(e) => setNovaPostagem({ ...novaPostagem, conteudo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent h-32 resize-none"
                  placeholder="Escreva sua postagem..."
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#9BB61B] text-white py-2 px-4 rounded-lg hover:bg-[#8BA019] transition"
                >
                  Publicar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 