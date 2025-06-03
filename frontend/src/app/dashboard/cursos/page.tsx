"use client";
import { useEffect, useState } from 'react';
import CursoCard from '../../../components/CursoCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cursoService, Curso } from '../../../services/cursoService';

export default function CursosPage() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        cursoService.listarCursos()
            .then(setCursos)
            .catch(() => setErro('Erro ao carregar cursos.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-[#281719] mb-4 mt-2">MEUS CURSOS ATIVOS</h2>
                {loading ? (
                    <p>Carregando cursos...</p>
                ) : erro ? (
                    <p className="text-red-500">{erro}</p>
                ) : (
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300"><FaChevronLeft /></button>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {cursos.map((curso, idx) => (
                                <CursoCard key={curso.id || idx} titulo={curso.nomeCurso} />
                            ))}
                        </div>
                        <button className="p-2 bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300"><FaChevronRight /></button>
                    </div>
                )}
            </section>
        </div>
    );
} 