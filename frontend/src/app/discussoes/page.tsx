'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

type Comentario = {
  id: number;
  autor: string;
  texto: string;
};

type Post = {
  id: number;
  conteudo: string; // Conteúdo do post
  autor: string;
  data: string;
  curtidas: number;
  comentarios: Comentario[];
  curtidoPor: string[]
};

export default function PaginaDiscussoes() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [conteudo, setConteudo] = useState('');
  const [comentariosTexto, setComentariosTexto] = useState<{ [key: number]: string }>({});
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string } | null>(null);
  const [editandoPostId, setEditandoPostId] = useState<number | null>(null);
  const [conteudoEditado, setConteudoEditado] = useState<string>('');

  // Carregar usuário e posts
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

  // Salvar posts SOMENTE quando o usuário já foi carregado
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
      data: new Date().toLocaleString(),
      curtidas: 0,
      comentarios: [],
      curtidoPor: [],
    };
    setPosts([novoPost, ...posts]);
    setConteudo('');
  };

  const curtirPost = (id: number) => {
    if (!usuarioAtual) return;
    setPosts(posts.map(post =>
      post.id === id && post.autor !== usuarioAtual.nome && !post.curtidoPor.includes(usuarioAtual.nome)
        ? { ...post, curtidas: post.curtidas + 1, curtidoPor: [...post.curtidoPor, usuarioAtual.nome] }
        : post
    ));
  };

  const comentarPost = (id: number) => {
    if (!usuarioAtual) return;
    const texto = comentariosTexto[id];
    if (!texto || texto.trim().length === 0) return; // Alterado para verificar se o texto está vazio ou só com espaços

    setPosts(posts.map(post =>
      post.id === id && post.autor !== usuarioAtual.nome
        ? {
            ...post,
            comentarios: [...post.comentarios, { id: Date.now(), autor: usuarioAtual.nome, texto: texto.trim() }], // Trim para remover espaços extras
          }
        : post
    ));
    setComentariosTexto({ ...comentariosTexto, [id]: '' });
  };

  const iniciarEdicao = (id: number, conteudoAtual: string) => {
    setEditandoPostId(id);
    setConteudoEditado(conteudoAtual);
  };

  const salvarEdicao = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, conteudo: conteudoEditado } : post
    ));
    setEditandoPostId(null);
    setConteudoEditado('');
  };

  const excluirPost = (id: number) => {
    // Adicionando confirmação para excluir post
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      setPosts(posts.filter(post => post.id !== id));
      alert('Post excluído com sucesso!');
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-[#FFFCE5] min-h-screen text-black">
        <h1 className="text-2xl font-bold">Discussões</h1>

        <div className="bg-white p-4 rounded shadow">
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Escreva sua postagem..."
          />
          <button
            onClick={criarPost}
            className="mt-2 bg-[#281719] text-white px-4 py-2 rounded hover:brightness-125"
          >
            Postar
          </button>
        </div>

        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500 mb-1">
              {post.autor} • {post.data} • ID do post:{post.id}
            </p>

            {editandoPostId === post.id ? (
              <>
                <textarea
                  value={conteudoEditado}
                  onChange={(e) => setConteudoEditado(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={() => salvarEdicao(post.id)}
                  className="mr-2 text-sm text-green-600 hover:underline"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditandoPostId(null)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p className="mb-2">{post.conteudo}</p>

                <div className="flex items-center gap-4">
                  <button
                    disabled={usuarioAtual?.nome === post.autor}
                    onClick={() => curtirPost(post.id)}
                    className={`text-sm ${
                      usuarioAtual?.nome === post.autor ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'
                    }`}
                  >
                    Curtir ({post.curtidas})
                  </button>

                  {usuarioAtual?.nome === post.autor && (
                    <button
                      onClick={() => iniciarEdicao(post.id, post.conteudo)}
                      className="text-sm text-yellow-600 hover:underline"
                    >
                      Editar
                    </button>
                  )}
                  { (usuarioAtual?.nome === post.autor || usuarioAtual?.email === "admin@admin.com") && (
                    <button
                      onClick={() => excluirPost(post.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  )} 
                </div>

                {/* INÍCIO DA SEÇÃO DE COMENTÁRIOS ESTILIZADA */}
                <div className="flex-grow mt-4"> {/* Aumentei mt-2 para mt-4 para mais espaçamento */}
                  <div className="flex items-center space-x-2"> {/* Container para input e botão */}
                    <input
                      type="text"
                      value={comentariosTexto[post.id] || ''}
                      onChange={(e) =>
                        setComentariosTexto({ ...comentariosTexto, [post.id]: e.target.value })
                      }
                      placeholder="Comentar..."
                      className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition duration-200 ease-in-out"
                      disabled={usuarioAtual?.nome === post.autor}
                    />
                    <button
                      onClick={() => comentarPost(post.id)}
                      disabled={usuarioAtual?.nome === post.autor}
                      className="bg-[#281719] text-white px-4 py-2 rounded-full text-sm font-semibold hover:brightness-125 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
                    >
                      Comentar
                    </button>
                  </div>
                </div>

                {post.comentarios.length > 0 && (
                  <div className="mt-4 space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200"> {/* Contêiner de todos os comentários */}
                    <h4 className="text-md font-semibold text-gray-700 mb-2">Comentários:</h4>
                    {post.comentarios.map(com => (
                      <div key={com.id} className="text-sm p-2 rounded-md bg-white border border-gray-100 shadow-sm"> {/* Estilo para cada comentário individual */}
                        <p className="font-medium text-gray-900">
                          <strong>{com.autor}:</strong>
                        </p>
                        <p className="text-gray-800 break-words">{com.texto}</p> {/* break-words para quebrar texto longo */}
                      </div>
                    ))}
                  </div>
                )}
                {/* FIM DA SEÇÃO DE COMENTÁRIOS ESTILIZADA */}
              </>
            )}
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}