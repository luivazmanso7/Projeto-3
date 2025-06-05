import api from './api';

export interface Curso {
    id?: number;
    titulo: string;
    capaCurso?: string;
    descricaoConteudo: string;
    descricaoCurta: string;
    categoria: string;
    docente?: string;
    materialApoio?: string;
    tags?: string;
    dataInicio?: string;
}

export const cursoService = {
    listarCursos: async (): Promise<Curso[]> => {
        const response = await api.get('/cursos');
        return response.data;
    },

    buscarCursoPorId: async (id: number): Promise<Curso> => {
        const response = await api.get(`/cursos/${id}`);
        return response.data;
    },

    buscarCursosPorNome: async (nome: string): Promise<Curso[]> => {
        const response = await api.get(`/cursos/buscar?nome=${encodeURIComponent(nome)}`);
        return response.data;
    },

    criarCurso: async (curso: FormData, emailUsuario: string): Promise<Curso> => {
        const response = await api.post(`/cursos?emailUsuario=${encodeURIComponent(emailUsuario)}`, curso, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    atualizarCurso: async (id: number, curso: FormData, emailUsuario: string): Promise<Curso> => {
        const response = await api.put(`/cursos/${id}?emailUsuario=${encodeURIComponent(emailUsuario)}`, curso, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    excluirCurso: async (id: number, emailUsuario: string): Promise<void> => {
        await api.delete(`/cursos/${id}?emailUsuario=${encodeURIComponent(emailUsuario)}`);
    },
}; 