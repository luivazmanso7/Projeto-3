import api from './api';

export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    administrador: boolean;
}

export const usuarioService = {
    // Listar todos os usuários
    listarUsuarios: async () => {
        const response = await api.get('/usuarios');
        return response.data;
    },

    // Buscar usuário por ID
    buscarUsuario: async (id: number) => {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    },

    // Criar novo usuário
    criarUsuario: async (usuario: Usuario) => {
        const response = await api.post('/usuarios', usuario);
        return response.data;
    },

    // Fazer login
    login: async (email: string, senha: string) => {
        const response = await api.post('/usuarios/login', { email, senha });
        return response.data;
    },

    // Deletar usuário
    deletarUsuario: async (id: number) => {
        await api.delete(`/usuarios/${id}`);
    }
}; 