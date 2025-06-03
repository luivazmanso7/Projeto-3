'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

type Denuncia = {
  id: number;
  conteudo: string;
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

export default function PaginaDenuncias(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [usuarioAtual, setUsuarioAtual] = useState<{ nome: string; email: string;administrador: boolean } | null>(null);
    const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
    const [conteudo, setConteudo] = useState('');

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
    if (denunciasSalvas){
      setDenuncias(JSON.parse(denunciasSalvas));
    }
    },[]);
    //Salvar denuncias só com usuario carregado
    useEffect(() => {
      if (usuarioAtual){
        localStorage.setItem('denuncias_globais',JSON.stringify(denuncias));
      }
    },[denuncias,usuarioAtual])

    const criarDenuncia = () => {
      if (!conteudo.trim() || !usuarioAtual) return;
      // * MODIFICAR APENAS ESSA LINHA
      const novaDenuncia: Denuncia = {
        id: Date.now(),
        conteudo,
        autor: usuarioAtual.nome,
        data: new Date().toLocaleString(),
      }
    }
    return (
        <SidebarLayout>
            <div className="p-6 space-y-6 bg-[#FFFCE5] min-h-screen text-black">
                {usuarioAtual?.email === "admin@admin.com" ? (
                    /*Admin recebe denuncias:*/
                    /*Problemas: checagem por email funciona, mas por booleana não */
                     /* <> É usado para retornar single JSX element */
                    <> 
                    <h1 className="text-2xl font-bold">Denúncias recebidas</h1>
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
                        onChange={(e) => setConteudo(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Escreva ID do post para denunciar..."
                      />
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
    )
}