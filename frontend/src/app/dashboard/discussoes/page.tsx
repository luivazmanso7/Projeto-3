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

// Ícone simples de lixeira para excluir comentários
const TrashIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

type Discussao = {
  id: number;
  texto: string;
  likes: number;
  dislikes: number;
};

export default function PaginaDiscussoes() {
  const [comentario, setComentario] = useState("");
  const [discussoes, setDiscussoes] = useState<Discussao[]>([]);

  // Carregar discussões do localStorage ao iniciar
  useEffect(() => {
    const salvas = localStorage.getItem("discussoes");
    if (salvas) setDiscussoes(JSON.parse(salvas));
  }, []);

  // Salvar discussões no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("discussoes", JSON.stringify(discussoes));
  }, [discussoes]);

  const handlePostar = () => {
    if (!comentario.trim()) return;
    setDiscussoes([
      { id: Date.now(), texto: comentario, likes: 0, dislikes: 0 },
      ...discussoes,
    ]);
    setComentario("");
  };

  const handleLike = (id: number) => {
    setDiscussoes(discussoes.map(d =>
      d.id === id ? { ...d, likes: d.likes + 1 } : d
    ));
  };

  const handleDislike = (id: number) => {
    setDiscussoes(discussoes.map(d =>
      d.id === id ? { ...d, dislikes: d.dislikes + 1 } : d
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Discussões</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <textarea
          className="w-full p-4 rounded border mb-4"
          rows={4}
          placeholder="No que você está pensando?"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        />
        <button
          className="bg-[#281719] text-white px-6 py-2 rounded font-bold"
          onClick={handlePostar}
        >
          Postar
        </button>
      </div>
      <div className="space-y-4">
        {discussoes.map(d => (
          <div key={d.id} className="bg-white rounded shadow p-4 flex flex-col">
            <span className="mb-2">{d.texto}</span>
            <div className="flex gap-4">
              <button
                className="text-green-700 font-bold"
                onClick={() => handleLike(d.id)}
              >
                👍 {d.likes}
              </button>
              <button
                className="text-red-700 font-bold"
                onClick={() => handleDislike(d.id)}
              >
                👎 {d.dislikes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}