"use client";
import { useState } from 'react';
import { usuarioService } from '../services/usuarioService';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await usuarioService.login(email, senha);
            // Aqui você pode salvar o token ou dados do usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(response));
            // Redirecionar para a página principal ou dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            setErro('Email ou senha inválidos');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                    Senha
                </label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Entrar
            </button>
        </form>
    );
} 