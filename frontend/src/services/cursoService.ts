// src/services/cursoService.ts
import api from "@/services/api"; // axios instanciado em api.ts (baseURL: http://localhost:8080)

export interface Curso {
  id: number;
  titulo: string;
  capaCurso?: string;
  descricaoConteudo?: string;
  descricaoCurta?: string;
  categoria: "basico" | "aovivo";
  docente?: string;
  materialApoio?: string;
  tags?: string;
  dataInicio?: string; // ex.: "2025-06-10"
  zoomLink?: string; // caso o back-end retorne
  zoomDataHora?: string;
  zoomDuracao?: number;
}

export const cursoService = {
  async listarCursos(): Promise<Curso[]> {
    try {
      const response = await api.get<Curso[]>("/cursos");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      throw error;
    }
  },
  // Caso você queira mais métodos para criar, editar, deletar, adicione aqui.
};
