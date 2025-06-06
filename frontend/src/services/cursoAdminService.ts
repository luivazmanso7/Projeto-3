const API_URL = 'http://localhost:8080';

export interface Curso {
  id?: number;
  titulo: string;
  descricaoConteudo: string;
  descricaoCurta: string;
  categoria: string;
  docente: string;
  tags: string;
  dataInicio: string;
  capaCurso?: string;
  materialApoio?: string;
}

export interface CursoForm {
  curso: Curso;
  capaCurso?: File;
  materialApoio?: File;
}

class CursoAdminService {
  async listarCursos(): Promise<Curso[]> {
    try {
      const response = await fetch(`${API_URL}/cursos`);
      if (!response.ok) {
        throw new Error('Erro ao buscar cursos');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      throw error;
    }
  }

  async buscarCursoPorId(id: number): Promise<Curso> {
    try {
      const response = await fetch(`${API_URL}/cursos/${id}`);
      if (!response.ok) {
        throw new Error('Curso não encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar curso:', error);
      throw error;
    }
  }

  async criarCurso(cursoForm: CursoForm): Promise<Curso> {
    try {
      const formData = new FormData();
      formData.append('curso', JSON.stringify(cursoForm.curso));
      
      if (cursoForm.capaCurso) {
        formData.append('capaCurso', cursoForm.capaCurso);
      }
      
      if (cursoForm.materialApoio) {
        formData.append('materialApoio', cursoForm.materialApoio);
      }

      const response = await fetch(`${API_URL}/cursos`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao criar curso: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      throw error;
    }
  }

  async atualizarCurso(id: number, cursoForm: CursoForm): Promise<Curso> {
    try {
      const formData = new FormData();
      formData.append('curso', JSON.stringify(cursoForm.curso));
      
      if (cursoForm.capaCurso) {
        formData.append('capaCurso', cursoForm.capaCurso);
      }
      
      if (cursoForm.materialApoio) {
        formData.append('materialApoio', cursoForm.materialApoio);
      }

      const response = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar curso: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      throw error;
    }
  }

  async excluirCurso(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir curso');
      }
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      throw error;
    }
  }
}

export const cursoAdminService = new CursoAdminService();
