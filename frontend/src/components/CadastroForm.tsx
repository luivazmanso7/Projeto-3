"use client";
import { useState } from 'react';
import { usuarioService, Usuario } from '../services/usuarioService';

export default function CadastroForm() {
    const [formData, setFormData] = useState<Usuario>({
        nome: '',
        email: '',
        senha: '',
        administrador: false
    });
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await usuarioService.criarUsuario(formData);
            setSucesso('Cadastro realizado com sucesso!');
            setErro('');
            // Limpar o formulário
            setFormData({
                nome: '',
                email: '',
                senha: '',
                administrador: false
            });
            // Redirecionar para a página de login após 2 segundos
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            setErro('Erro ao realizar cadastro. Tente novamente.');
            setSucesso('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {erro && <p className="text-red-500 text-sm">{erro}</p>}
                {sucesso && <p className="text-green-500 text-sm">{sucesso}</p>}

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
} 