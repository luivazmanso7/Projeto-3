'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

// ---
// Tipos
// ---
type Denuncia = {
  id: number;
  postId: string; // Renomeado de 'conteudo' para deixar claro que é o ID do post
  conteudoPost: string; // NOVO: Campo para armazenar o conteúdo do post denunciado
  autor: string; // Autor da denúncia
  data: string;
};

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
};

// ---
// Componente PaginaDenuncias
// ---
export default function PaginaDenuncias() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string; administrador: boolean } | null>(null);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [conteudoInput, setConteudoInput] = useState(''); // Renomeado para evitar conflito com 'conteudo' de Denuncia
  const [erroConteudo, setErroConteudo] = useState('');

  // Função interna para verificar se a string contém apenas dígitos
  const isStringOnlyDigits = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  // ---
  // Efeitos de Carregamento e Salvamento
  // ---
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

    const denunciasSalvas = localStorage.getItem('denuncias_globais');
    if (denunciasSalvas) {
      setDenuncias(JSON.parse(denunciasSalvas));
    }
  }, []);

  useEffect(() => {
    if (usuarioAtual) {
      localStorage.setItem('denuncias_globais', JSON.stringify(denuncias));
      localStorage.setItem('posts_globais', JSON.stringify(posts)); // Salva os posts também!
    }
  }, [denuncias, posts, usuarioAtual]); // Adicionado 'posts' à dependência para salvar as alterações

  // ---
  // Função para Criar Denúncia
  // ---
  const criarDenuncia = () => {
    // Primeiro, verifica se o conteúdo do input está vazio ou se o usuário não está logado
    if (!conteudoInput.trim() || !usuarioAtual) {
      if (!conteudoInput.trim()) {
        setErroConteudo('Por favor, insira o ID do post.');
      }
      return;
    }

    // Valida se o conteúdo do input é composto apenas por dígitos (ID do post)
    if (!isStringOnlyDigits(conteudoInput)) {
      setErroConteudo('O ID do post deve conter apenas números.');
      return;
    }

    // Tenta encontrar o post correspondente ao ID digitado
    const postIdNumerico = Number(conteudoInput);
    const postDenunciado = posts.find(post => post.id === postIdNumerico);

    if (!postDenunciado) {
      setErroConteudo('Post com o ID especificado não encontrado.');
      return; // Impede a criação da denúncia se o post não for encontrado
    }

    // Se todas as validações passaram, limpa qualquer erro anterior
    setErroConteudo('');

    const novaDenuncia: Denuncia = {
      id: Date.now(),
      postId: conteudoInput, // Salvando o ID do post denunciado (como string)
      conteudoPost: postDenunciado.conteudo, // Salvando o conteúdo original do post!
      autor: usuarioAtual.nome, // Autor da denúncia é o usuário logado
      data: new Date().toLocaleString(),
    };
    // Adiciona a nova denúncia ao estado
    setDenuncias((prevDenuncias) => [...prevDenuncias, novaDenuncia]);
    // Limpa o campo de input após a criação
    setConteudoInput('');
    alert('Denúncia enviada com sucesso!'); // Feedback ao usuário
  };

  // FUNÇAO EXCLUIR O POST
  const excluirPost = (id: number) => {
    // Pergunta de confirmação antes de excluir
    if (window.confirm("Tem certeza que deseja excluir este post? Esta ação é irreversível.")) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      // Opcional: Se um post for excluído, você também pode querer remover as denúncias relacionadas a ele.
      setDenuncias(prevDenuncias => prevDenuncias.filter(denuncia => Number(denuncia.postId) !== id));
      alert('Post excluído com sucesso!');
    }
  };

  // ---
  // Renderização do Componente
  // ---
  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-[#FFFCE5] min-h-screen text-black">
        {usuarioAtual?.email === "admin@admin.com" ? (
          <>
            <h1 className="text-2xl font-bold">Denúncias recebidas</h1>
            {denuncias.length === 0 ? (
              <p>Nenhuma denúncia recebida até o momento.</p>
            ) : (
              <div className="space-y-4">
                {denuncias.map((denuncia) => (
                  <div key={denuncia.id} className="bg-white p-4 rounded shadow">
                    <p><strong>ID do Post Denunciado:</strong> {denuncia.postId}</p>
                    <p><strong>Conteúdo do Post:</strong> "{denuncia.conteudoPost}"</p>
                    <p><strong>Autor da Denúncia:</strong> {denuncia.autor}</p>
                    <p><strong>Data da Denúncia:</strong> {denuncia.data}</p>
                    {/* Botão para excluir o post denunciado */}
                    <button
                      onClick={() => excluirPost(Number(denuncia.postId))}
                      className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Excluir Post
                    </button>
                    {/* Opcional: Botão para "resolver" a denúncia sem excluir o post, apenas a denúncia */}
                    <button
                      onClick={() => setDenuncias(prev => prev.filter(d => d.id !== denuncia.id))}
                      className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Ignorar Denúncia
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Formulário de denúncia</h1>
            <p>Insira o ID do post que deseja denunciar.</p>
            <div className="bg-white p-4 rounded shadow">
              <textarea
                value={conteudoInput}
                onChange={(e) => {
                  setConteudoInput(e.target.value);
                  if (erroConteudo) setErroConteudo('');
                }}
                className="w-full p-2 border rounded"
                placeholder="Escreva o ID do post para denunciar (apenas números)..."
              />
              {erroConteudo && <p className="text-red-500 text-sm mt-1">{erroConteudo}</p>}
              <button
                onClick={criarDenuncia}
                className="mt-2 bg-[#281719] text-white px-4 py-2 rounded hover:brightness-125"
              >
                Denunciar
              </button>
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
}