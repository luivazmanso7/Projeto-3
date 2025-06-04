<<<<<<< HEAD
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    );
=======
// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleEntrar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    const corpo = { email, senha };

    try {
      const resposta = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (resposta.ok) {
        const usuarioLogado = await resposta.json();
        localStorage.setItem('usuarioAtual', JSON.stringify(usuarioLogado));
        router.push('/discussoes');
      } else if (resposta.status === 401) {
        setErro('Senha incorreta');
      } else if (resposta.status === 404) {
        setErro('Usuário não encontrado');
      } else {
        const textoErro = await resposta.text();
        setErro("Erro: " + textoErro);
      }
    } catch (erroFetch) {
      console.error("Erro de conexão com o backend:", erroFetch);
      setErro('Erro de conexão com o backend');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFCE5] text-black">
      <header className="flex justify-between items-center p-6 bg-[#9BB61B]">
        <div className="flex items-center"></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-6">Entrar</h1>
        <form
          onSubmit={handleEntrar}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
        >
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
              required
            />
          </div>

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

          <button
            type="submit"
            className="bg-[#281719] text-white font-bold py-2 px-4 rounded w-full hover:brightness-125"
          >
            Entrar
          </button>
        </form>
      </main>

      <footer className="bg-[#9BB61B] text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} BRASFI - Todos os direitos reservados.
      </footer>
    </div>
  );
>>>>>>> parent of 1b706c0 (frontend antigo removido)
}
