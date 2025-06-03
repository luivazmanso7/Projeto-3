"use client";

import { useEffect, useState } from "react";

export default function Forum() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // simular fetch de posts locais
    setPosts([
      { id: 1, autor: "Maria", conteudo: "Como funciona a certificação?" },
      { id: 2, autor: "João", conteudo: "Quais são os cursos gratuitos?" },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Discussões</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded bg-white shadow">
            <p className="font-semibold">{post.autor}</p>
            <p>{post.conteudo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
