// app/discussoes/page.tsx
'use client';
import SidebarLayout from '@/components/SidebarLayout';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
};

export default function PaginaDiscussoes() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const salvos = localStorage.getItem('posts');
    if (salvos) setPosts(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const criarOuEditarPost = () => {
    if (!titulo || !conteudo) return;

    if (editandoId !== null) {
      setPosts(posts.map(p => p.id === editandoId ? { ...p, titulo, conteudo } : p));
      setEditandoId(null);
    } else {
      setPosts([...posts, { id: Date.now(), titulo, conteudo }]);
    }

    setTitulo('');
    setConteudo('');
  };

  const deletarPost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const editarPost = (post: Post) => {
    setEditandoId(post.id);
    setTitulo(post.titulo);
    setConteudo(post.conteudo);
  };

  return (
    <SidebarLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Discussões</h1>

        <div className="mb-6">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Conteúdo"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={criarOuEditarPost}
            className="bg-[#281719] text-white px-4 py-2 rounded"
          >
            {editandoId ? 'Atualizar' : 'Criar'}
          </button>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold">{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editarPost(post)}
                className="text-blue-600 underline"
              >
                Editar
              </button>
              <button
                onClick={() => deletarPost(post.id)}
                className="text-red-600 underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}
