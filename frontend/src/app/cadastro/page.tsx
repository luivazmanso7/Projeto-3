<<<<<<< HEAD
import CadastroForm from '../../components/CadastroForm';

export default function CadastroPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CadastroForm />
            </div>
        </div>
    );
=======
// src/app/cadastro/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleCadastro = async () => {
    const corpo = { nome, email, senha };

    try {
      const resposta = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const erro = await resposta.text();
        setMensagem("Erro ao cadastrar: " + erro);
      }
    } catch (erro) {
      console.error("Erro de conexão com o backend:", erro);
      setMensagem("Erro de conexão com o backend");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />
        <button
          onClick={handleCadastro}
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          Cadastrar
        </button>
        {mensagem && <p className="mt-4 text-center">{mensagem}</p>}
      </div>
    </div>
  );
>>>>>>> parent of 1b706c0 (frontend antigo removido)
}
