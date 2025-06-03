'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

type Denuncia = {
  id: number;
  conteudo: string; // O conteúdo aqui será o ID do post, que é um número
  autor: string;
  data: string;
};

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

export default function PaginaDenuncias() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string; administrador: boolean } | null>(null);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [conteudo, setConteudo] = useState('');
  const [erroConteudo, setErroConteudo] = useState(''); // Estado para a mensagem de erro

  // Função interna para verificar se a string contém apenas dígitos
  // Não precisa ser exportada.
  const isStringOnlyDigits = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  //Carregar usuário
  useEffect(() => {
    const userStr = localStorage.getItem('usuarioAtual');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUsuarioAtual(user);
    }
    //Carregar Posts
    const postsSalvos = localStorage.getItem('posts_globais');
    if (postsSalvos) {
      setPosts(JSON.parse(postsSalvos));
    }
    //Carregar denuncias
    const denunciasSalvas = localStorage.getItem('denuncias_globais');
    if (denunciasSalvas) {
      setDenuncias(JSON.parse(denunciasSalvas));
    }
  }, []);

  //Salvar denuncias só com usuario carregado
  useEffect(() => {
    if (usuarioAtual) {
      localStorage.setItem('denuncias_globais', JSON.stringify(denuncias));
    }
  }, [denuncias, usuarioAtual]);

  const criarDenuncia = () => {
    // Primeiro, verifica se o conteúdo está vazio ou se o usuário não está logado
    if (!conteudo.trim() || !usuarioAtual) {
      if (!conteudo.trim()) {
        setErroConteudo('Por favor, insira o ID do post.');
      }
      return;
    }

    // Valida se o conteúdo é composto apenas por dígitos
    if (!isStringOnlyDigits(conteudo)) {
      setErroConteudo('O ID do post deve conter apenas números.');
      return; // Impede a criação da denúncia se a validação falhar
    }

    // Se a validação passou, limpa qualquer erro anterior
    setErroConteudo('');

    // * MODIFICAR APENAS ESSA LINHA
    const novaDenuncia: Denuncia = {
      id: Date.now(),
      conteudo: conteudo, // O conteúdo já foi validado como sendo apenas dígitos
      autor: usuarioAtual.nome,
      data: new Date().toLocaleString(),
    };
    // Adiciona a nova denúncia ao estado
    setDenuncias((prevDenuncias) => [...prevDenuncias, novaDenuncia]);
    // Limpa o campo de input após a criação
    setConteudo('');
    alert('Denúncia criada com sucesso!'); // Feedback ao usuário
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-[#FFFCE5] min-h-screen text-black">
        {usuarioAtual?.email === "admin@admin.com" ? (
          /*Admin recebe denuncias:*/
          /*Problemas: checagem por email funciona, mas por booleana não */
          /* <> É usado para retornar single JSX element */
          <>
            <h1 className="text-2xl font-bold">Denúncias recebidas</h1>
            {denuncias.length === 0 ? (
                <p>Nenhuma denúncia recebida até o momento.</p>
            ) : (
                <div className="space-y-4">
                    {denuncias.map((denuncia) => (
                        <div key={denuncia.id} className="bg-white p-4 rounded shadow">
                            <p><strong>ID do Post Denunciado:</strong> {denuncia.conteudo}</p>
                            <p><strong>Autor da Denúncia:</strong> {denuncia.autor}</p>
                            <p><strong>Data:</strong> {denuncia.data}</p>
                        </div>
                    ))}
                </div>
            )}
          </>
        ) : (
          /*Usuário cria denuncias*/
          /* <> É usado para retornar single JSX element */
          <>
            <h1 className="text-2xl font-bold">Formulário de denúncia</h1>
            <p>Insira o ID do post e especifique o que foi violado</p>
            <div className="bg-white p-4 rounded shadow">
              <textarea
                value={conteudo}
                onChange={(e) => {
                  setConteudo(e.target.value);
                  // Limpa o erro ao digitar novamente
                  if (erroConteudo) setErroConteudo('');
                }}
                className="w-full p-2 border rounded"
                placeholder="Escreva ID do post para denunciar..."
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