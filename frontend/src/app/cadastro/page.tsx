"use client";

import { useState } from "react";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async () => {
    try {
      const resposta = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
      } else {
        const erro = await resposta.text();
        setMensagem("Erro ao cadastrar: " + erro);
      }
    } catch (erro) {
      setMensagem("Erro de conexão com o backend");
      console.error(erro);
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
}
