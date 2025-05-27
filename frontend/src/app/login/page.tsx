'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleEntrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    // Salvar o usuário no localStorage
    const novoUsuario = { nome, email, senha };
    localStorage.setItem('usuarioAtual', JSON.stringify(novoUsuario));

    // Simular login
    console.log('Usuário salvo localmente:', novoUsuario);
    router.push('/discussoes'); // ou página pós-login
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFCE5] text-black">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-[#9BB61B]">
        <div className="flex items-center">
          <Image src="/brasfi-logo.jpg" alt="Logo da BRASFI" width={50} height={50} />
        </div>
      </header>

      {/* Conteúdo do Login */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-6">Entrar</h1>
        <form
          onSubmit={handleEntrar}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
        >
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2">Senha</label>
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

      {/* Footer */}
      <footer className="bg-[#9BB61B] text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} BRASFI - Todos os direitos reservados.
      </footer>
    </div>
  );
}
