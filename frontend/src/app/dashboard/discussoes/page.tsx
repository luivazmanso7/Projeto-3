'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

// Componente SVG para o ícone de Coração (Curtir)
const HeartIcon = ({ filled, className }: { filled: boolean; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Componente SVG para o ícone de Balão de Comentário
const CommentIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);


type Comentario = {
  id: number;
  autor: string;
  texto: string;
};

type Post = {
  id: number;
  conteudo: string;
  autor: string;
  data: string;
  curtidas: number;
  comentarios: Comentario[];
  curtidoPor: string[];
};

export default function PaginaDiscussoes() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [conteudo, setConteudo] = useState('');
  const [comentariosTexto, setComentariosTexto] = useState<{ [key: number]: string }>({});
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string } | null>(null);
  const [editandoPostId, setEditandoPostId] = useState<number | null>(null);
  const [conteudoEditado, setConteudoEditado] = useState<string>('');
  const [menuAbertoPostId, setMenuAbertoPostId] = useState<number | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('usuarioAtual');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUsuarioAtual(user);
    }
    const postsSalvos = localStorage.getItem('posts_globais');
    if (postsSalvos) {
      setPosts(JSON.parse(postsSalvos));
    }
  }, []);

  useEffect(() => {
    if (usuarioAtual) {
      localStorage.setItem('posts_globais', JSON.stringify(posts));
    }
  }, [posts, usuarioAtual]);

  const criarPost = () => {
    if (!conteudo.trim() || !usuarioAtual) return;
    const novoPost: Post = {
      id: Date.now(),
      conteudo,
      autor: usuarioAtual.nome,
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      curtidas: 0,
      comentarios: [],
      curtidoPor: [],
    };
    setPosts([novoPost, ...posts]);
    setConteudo('');
  };

  const curtirPost = (id: number) => {
    if (!usuarioAtual) return;
    setPosts(posts.map(post => {
      if (post.id === id && post.autor !== usuarioAtual.nome) {
        const jaCurtiu = post.curtidoPor.includes(usuarioAtual.nome);
        if (jaCurtiu) {
          // Descurtir (opcional, se quiser implementar)
          // return { ...post, curtidas: post.curtidas - 1, curtidoPor: post.curtidoPor.filter(nome => nome !== usuarioAtual.nome) };
          return post; // Por enquanto, não permite descurtir com um clique
        } else {
          return { ...post, curtidas: post.curtidas + 1, curtidoPor: [...post.curtidoPor, usuarioAtual.nome] };
        }
      }
      return post;
    }));
  };

  const comentarPost = (id: number) => {
    if (!usuarioAtual) return;
    const texto = comentariosTexto[id];
    if (!texto || texto.trim().length === 0) return;
    setPosts(posts.map(post =>
      post.id === id && post.autor !== usuarioAtual.nome
        ? {
            ...post,
            comentarios: [...post.comentarios, { id: Date.now(), autor: usuarioAtual.nome, texto: texto.trim() }],
          }
        : post
    ));
    setComentariosTexto({ ...comentariosTexto, [id]: '' });
  };

  const iniciarEdicao = (id: number, conteudoAtual: string) => {
    setEditandoPostId(id);
    setConteudoEditado(conteudoAtual);
    setMenuAbertoPostId(null);
  };

  const salvarEdicao = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, conteudo: conteudoEditado } : post
    ));
    setEditandoPostId(null);
    setConteudoEditado('');
  };

  const excluirPost = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      setPosts(posts.filter(post => post.id !== id));
      alert('Post excluído com sucesso!');
    }
    setMenuAbertoPostId(null);
  };

  const toggleMenuPost = (postId: number) => {
    setMenuAbertoPostId(menuAbertoPostId === postId ? null : postId);
  };

  return (
    
      <div className="p-6 space-y-6 bg-[#FFFCE5] min-h-screen text-black">
        <h1 className="text-3xl font-bold text-gray-800">Discussões</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent transition duration-150 ease-in-out"
            placeholder="No que você está pensando?"
            rows={4}
          />
          <button
            onClick={criarPost}
            className="mt-4 bg-[#281719] text-white px-6 py-2 rounded-md hover:brightness-125 transition duration-150 ease-in-out font-semibold"
            disabled={!conteudo.trim() || !usuarioAtual}
          >
            Postar
          </button>
        </div>

        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#9BB61B] flex items-center justify-center text-white font-semibold mr-3">
                  {post.autor.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{post.autor}</p>
                  <p className="text-xs text-gray-500">{post.data}</p>
                  <p className="text-xs text-gray-500">ID do post:{post.id}</p>
                </div>
              </div>
              {(usuarioAtual?.nome === post.autor || usuarioAtual?.email === "admin@admin.com") && (
                <div className="relative">
                  <button
                    onClick={() => toggleMenuPost(post.id)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label="Opções do post"
                  >
                    &#x2026;
                  </button>
                  {menuAbertoPostId === post.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      {usuarioAtual?.nome === post.autor && (
                        <button
                          onClick={() => iniciarEdicao(post.id, post.conteudo)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-2">✏️</span> Editar
                        </button>
                      )}
                      <button
                        onClick={() => excluirPost(post.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                         <span className="mr-2">🗑️</span> Excluir
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {editandoPostId === post.id ? (
              <div className="mb-4">
                <textarea
                  value={conteudoEditado}
                  onChange={(e) => setConteudoEditado(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent transition duration-150 ease-in-out"
                  rows={3}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => salvarEdicao(post.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditandoPostId(null)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.conteudo}</p>
            )}

            {!editandoPostId && (
             <>
                <div className="flex items-center space-x-4 border-t border-gray-200 pt-4">
                    <button
                        onClick={() => curtirPost(post.id)}
                        disabled={usuarioAtual?.nome === post.autor}
                        className={`p-1.5 rounded-full transition-colors duration-150 ease-in-out 
                                    disabled:text-gray-300 disabled:cursor-not-allowed
                                    ${post.curtidoPor.includes(usuarioAtual?.nome || '') 
                                        ? 'text-red-500 hover:bg-red-100' 
                                        : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                                    }`}
                        title="Curtir"
                    >
                        <HeartIcon 
                            filled={post.curtidoPor.includes(usuarioAtual?.nome || '')} 
                            className="w-5 h-5" // Ajuste o tamanho conforme necessário
                        />
                    </button>
                     {/* Exibindo a contagem de curtidas ao lado do botão, mas não dentro dele */}
                    <span className="text-sm text-gray-600">{post.curtidas > 0 ? post.curtidas : ''}</span>

                    <button
                        className="p-1.5 rounded-full text-gray-500 hover:text-[#9BB61B] hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                        title="Comentar"
                        onClick={() => document.getElementById(`comment-input-${post.id}`)?.focus()}
                    >
                        <CommentIcon className="w-5 h-5" /> {/* Ajuste o tamanho */}
                    </button>
                    {/* Exibindo a contagem de comentários ao lado do botão */}
                    <span className="text-sm text-gray-600">{post.comentarios.length > 0 ? post.comentarios.length : ''}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                    <input
                        id={`comment-input-${post.id}`}
                        type="text"
                        value={comentariosTexto[post.id] || ''}
                        onChange={(e) =>
                        setComentariosTexto({ ...comentariosTexto, [post.id]: e.target.value })
                        }
                        placeholder="Adicione um comentário..."
                        className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9BB61B] focus:border-transparent transition duration-200 ease-in-out"
                        disabled={usuarioAtual?.nome === post.autor || !usuarioAtual}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            comentarPost(post.id);
                            }
                        }}
                    />
                    <button
                        onClick={() => comentarPost(post.id)}
                        disabled={usuarioAtual?.nome === post.autor || !comentariosTexto[post.id]?.trim() || !usuarioAtual}
                        className="bg-[#281719] text-white px-5 py-2 rounded-full text-sm font-semibold hover:brightness-125 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
                    >
                        Enviar
                    </button>
                    </div>

                    {post.comentarios.length > 0 && (
                    <div className="space-y-3">
                        {post.comentarios.map(com => (
                        <div key={com.id} className="p-3 rounded-md bg-gray-50 border border-gray-100 shadow-sm">
                            <p className="text-sm">
                            <strong className="text-gray-800">{com.autor}:</strong>
                            <span className="text-gray-700 ml-1 break-words">{com.texto}</span>
                            </p>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    
  );
}