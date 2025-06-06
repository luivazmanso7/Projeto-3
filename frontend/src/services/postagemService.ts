export interface Postagem {
  idPost?: number;
  titulo: string;
  conteudo: string;
  dataPostagem?: string;
  curtidas?: number;
  autor?: {
    id: number;
    nome: string;
    email: string;
  };
  forum?: {
    idForum: number;
    titulo: string;
  };
  comentarios?: Comentario[];
}

export interface Comentario {
  idComentario?: number;
  texto: string;
  dataComentario?: string;
  autor?: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface Forum {
  idForum: number;
  titulo: string;
}

export interface NovaPostagem {
  titulo: string;
  conteudo: string;
  forumId: number;
  autorId: number;
}

const API_URL = 'http://localhost:8080';

export const postagemService = {
  // Listar todas as postagens
  async listarPostagens(): Promise<Postagem[]> {
    try {
      const response = await fetch(`${API_URL}/postagens`);
      if (!response.ok) {
        throw new Error('Erro ao buscar postagens');
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao listar postagens:', error);
      throw error;
    }
  },

  // Buscar postagem por ID
  async buscarPorId(id: number): Promise<Postagem> {
    try {
      const response = await fetch(`${API_URL}/postagens/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar postagem');
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar postagem:', error);
      throw error;
    }
  },

  // Criar nova postagem
  async criarPostagem(postagem: NovaPostagem): Promise<Postagem> {
    try {
      const postagemCompleta = {
        titulo: postagem.titulo,
        conteudo: postagem.conteudo,
        dataPostagem: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        autor: { id: postagem.autorId },
        forum: { idForum: postagem.forumId },
        curtidas: 0
      };

      const response = await fetch(`${API_URL}/postagens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postagemCompleta),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar postagem');
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      throw error;
    }
  },

  // Curtir postagem
  async curtirPostagem(id: number): Promise<Postagem> {
    try {
      const response = await fetch(`${API_URL}/postagens/${id}/curtir`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Erro ao curtir postagem');
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao curtir postagem:', error);
      throw error;
    }
  },

  // Excluir postagem
  async excluirPostagem(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/postagens/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir postagem');
      }
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
      throw error;
    }
  },

  // Listar fóruns disponíveis
  async listarForuns(): Promise<Forum[]> {
    try {
      const response = await fetch(`${API_URL}/foruns`);
      if (!response.ok) {
        throw new Error('Erro ao buscar fóruns');
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao listar fóruns:', error);
      throw error;
    }
  }
};
