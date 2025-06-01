'use client';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

// type Denuncia = {
//   id: number;
//   conteudo: string;
//   autor: string;
//   data: string;
// };

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
    },[]);

    return (
        <SidebarLayout>
            <div className="p-6 space-y-6 bg-[#FFFCE5] min-h-screen text-black">
                {usuarioAtual?.email === "admin@admin.com" ? (
                    /*Admin recebe denuncias:*/
                    /*Problemas: checagem por email funciona, mas por booleana não */
                    <h1>Teste é admin</h1>
                    
                ) : (
                    /*Usuário cria denuncias*/ 
                    <h2>Teste é usuario</h2>
                )}
            </div>
        </SidebarLayout>
    )
}