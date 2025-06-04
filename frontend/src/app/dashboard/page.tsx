'use client';
import Image from 'next/image';
<<<<<<< HEAD
import Link from 'next/link';
import CursoCard from '../../components/CursoCard';

const cursosRecomendados = [
    { titulo: 'FUNDAMENTOS DE ESG', autor: 'João da Barro Carvalho', destaque: true },
    { titulo: 'ESG NA PRÁTICA CORPORATIVA', autor: 'Marina de Freitas' },
    { titulo: 'GOVERNANÇA SUSTENTÁVEL', autor: 'Joana Bendita' },
    { titulo: 'NEGÓCIOS SUSTENTÁVEIS', autor: 'Giovanni Santos' },
    { titulo: 'GESTÃO AMBIENTAL', autor: 'Valéria Bastos Alves, Bianca Pedrosa' },
];

const aprendizados = [
    { titulo: 'FUNDAMENTOS DE ESG', autor: 'João da Barro Carvalho', status: 'EM ANDAMENTO', descricao: 'Um curso de João da Barro Carvalho', alunos: 1260, aulas: 12, certificados: 6 },
    { titulo: 'MÉTRICAS E INDICADORES ESG', autor: 'Bruna Queiroz', status: 'EM BREVE', descricao: 'Um curso de Bruna Queiroz', alunos: 0, aulas: 0, certificados: 0 },
    { titulo: 'IMPLEMENTANDO ESTRATÉGIAS', autor: 'Maria Eduardo Seixas', status: 'EM BREVE', descricao: 'Um curso de Maria Eduardo Seixas', alunos: 0, aulas: 0, certificados: 0 },
    { titulo: 'ESG NA PRÁTICA CORPORATIVA', autor: 'Marina de Freitas', status: 'ARQUIVADO', descricao: 'Um curso de Marina de Freitas', alunos: 1260, aulas: 12, certificados: 6 },
    { titulo: 'FINANÇAS VERDES', autor: 'Bianca Pedrosa', status: 'EM ANDAMENTO', descricao: 'Um curso de Bianca Pedrosa', alunos: 1260, aulas: 12, certificados: 6 },
    { titulo: 'MUDANÇAS CLIMÁTICAS', autor: 'Giovanni Santos', status: 'EM ANDAMENTO', descricao: 'Um curso de Giovanni Santos', alunos: 1260, aulas: 12, certificados: 6 },
];

const statusFiltro = ['TODOS OS CURSOS', 'ANDAMENTO', 'EM BREVE', 'ARQUIVADO'];

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#281719] mb-1 mt-2">O QUE APRENDER EM SEGUIDA</h2>
                <p className="text-sm text-gray-600 mb-4">Recomendamos para Você</p>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {cursosRecomendados.map((curso, idx) => (
                        <CursoCard key={idx} {...curso} />
                    ))}
                </div>
            </section>
            <section>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-[#281719]">MEUS APRENDIZADOS</h2>
                    <div className="flex gap-2">
                        {statusFiltro.map((status, idx) => (
                            <button key={status} className={`px-3 py-1 rounded border font-semibold text-xs ${idx === 1 ? 'bg-[#9BB61B] text-[#281719] border-[#9BB61B]' : 'bg-white text-[#281719] border-[#9BB61B] hover:bg-[#9BB61B] hover:text-[#281719]'}`}>{status}</button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {aprendizados.map((curso, idx) => (
                        <div key={idx} className="flex gap-4 bg-white rounded-xl shadow p-4 items-center border border-gray-200">
                            <div className="flex-shrink-0">
                                <div className="flex justify-center items-center h-20 w-20 bg-gray-100 rounded">
                                    <span className="text-3xl text-gray-400">📚</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-[#281719] text-base leading-tight">{curso.titulo}</div>
                                <div className="text-xs text-gray-500 mb-1">{curso.autor}</div>
                                <div className="text-xs text-gray-700 mb-1">{curso.descricao}</div>
                                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-1">
                                    <span>👥 {curso.alunos} alunos</span>
                                    <span>📚 {curso.aulas} aulas</span>
                                    <span>🎓 {curso.certificados} certificados</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-xs font-semibold px-2 py-1 rounded bg-[#9BB61B] text-[#281719] w-fit">{curso.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
=======

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFCE5] text-black">
      {/* Navbar */}
      <header className="flex justify-center items-center p-6 bg-[#9BB61B]">
        <Image src="/brasfi-logo.jpg" alt="Logo da BRASFI" width={60} height={60} />
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exemplo de Card */}
          <div className="bg-white rounded shadow p-6 w-64">
            <h2 className="text-xl font-semibold mb-2">T</h2>
            <p className="text-gray-700">Descrição ou conteúdo relevante.</p>
          </div>
          {/* Adicione mais cards conforme necessário */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#9BB61B] text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} BRASFI - Todos os direitos reservados.
      </footer>
    </div>
  );
>>>>>>> parent of 1b706c0 (frontend antigo removido)
}
