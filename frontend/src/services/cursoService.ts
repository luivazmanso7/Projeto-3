import api from './api';

export interface Curso {
    id?: number;
    nomeCurso: string;
    // Adicione outros campos conforme o backend
}

export const cursoService = {
    listarCursos: async (): Promise<Curso[]> => {
        const response = await api.get('/cursos');
        return response.data;
    },
    // Outros métodos (criar, editar, deletar) podem ser adicionados aqui
}; 