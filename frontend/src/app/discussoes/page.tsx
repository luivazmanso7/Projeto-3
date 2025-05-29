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
  conteudo: string;
  autor: string;
  data: string;
  curtidas: number;
  comentarios: Comentario[];
};

export default function PaginaDiscussoes() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [conteudo, setConteudo] = useState('');
  const [comentariosTexto, setComentariosTexto] = useState<{ [key: number]: string }>({});
  const [usuarioAtual, setUsuarioAtual] = useState<string>('Você');
  const [editandoPostId, setEditandoPostId] = useState<number | null>(null);
  const [conteudoEditado, setConteudoEditado] = useState<string>('');

  // Carregar posts ao iniciar
  useEffect(() => {
    const user = localStorage.getItem('usuarioAtual');
    if (user) {
      const { nome } = JSON.parse(user);
      setUsuarioAtual(nome);
      const chavePosts = `posts_${nome}`;
      const salvos = localStorage.getItem(chavePosts);
      if (salvos) setPosts(JSON.parse(salvos));
    }
  }, []);

  // Salvar posts sempre que forem atualizados
  useEffect(() => {
    if (usuarioAtual) {
      const chavePosts = `posts_${usuarioAtual}`;
      localStorage.setItem(chavePosts, JSON.stringify(posts));
    }
  }, [posts, usuarioAtual]);

  const criarPost = () => {
    if (!conteudo.trim()) return;
    const novoPost: Post = {
      id: Date.now(),
      conteudo,
      autor: usuarioAtual,
      data: new Date().toLocaleString(),
      curtidas: 0,
      comentarios: [],
    };
    setPosts([novoPost, ...posts]);
    setConteudo('');
  };

  const curtirPost = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id && post.autor !== usuarioAtual
        ? { ...post, curtidas: post.curtidas + 1 }
        : post
    ));
  };

  const comentarPost = (id: number) => {
    const texto = comentariosTexto[id];
    if (!texto.trim()) return;

    setPosts(posts.map(post =>
      post.id === id && post.autor !== usuarioAtual
        ? {
            ...post,
            comentarios: [...post.comentarios, { id: Date.now(), autor: usuarioAtual, texto }],
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
    setPosts(posts.filter(post => post.id !== id));
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
              {post.autor} • {post.data}
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
                    disabled={post.autor === usuarioAtual}
                    onClick={() => curtirPost(post.id)}
                    className={`text-sm ${
                      post.autor === usuarioAtual ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'
                    }`}
                  >
                    Curtir ({post.curtidas})
                  </button>

                  {post.autor === usuarioAtual && (
                    <>
                      <button
                        onClick={() => iniciarEdicao(post.id, post.conteudo)}
                        className="text-sm text-yellow-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirPost(post.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </div>

                <div className="flex-grow mt-2">
                  <input
                    type="text"
                    value={comentariosTexto[post.id] || ''}
                    onChange={(e) =>
                      setComentariosTexto({ ...comentariosTexto, [post.id]: e.target.value })
                    }
                    placeholder="Comentar..."
                    className="border rounded px-2 py-1 w-full"
                    disabled={post.autor === usuarioAtual}
                  />
                  <button
                    onClick={() => comentarPost(post.id)}
                    disabled={post.autor === usuarioAtual}
                    className="mt-1 text-sm text-green-600 hover:underline"
                  >
                    Comentar
                  </button>
                </div>
              </>
            )}

            {post.comentarios.length > 0 && (
              <div className="mt-2 space-y-1">
                {post.comentarios.map(com => (
                  <div key={com.id} className="text-sm border-t pt-1">
                    <strong>{com.autor}:</strong> {com.texto}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}
