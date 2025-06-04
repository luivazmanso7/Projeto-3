import { FaRegImage } from 'react-icons/fa';

interface CursoCardProps {
    titulo: string;
    autor?: string;
    status?: string;
    descricao?: string;
    alunos?: number;
    aulas?: number;
    certificados?: number;
    destaque?: boolean;
}

export default function CursoCard({ titulo, autor, status, descricao, alunos, aulas, certificados, destaque }: CursoCardProps) {
    return (
        <div className={`bg-white rounded-xl shadow p-4 flex flex-col gap-2 border ${destaque ? 'border-[#9BB61B]' : 'border-gray-200'}`} style={{ minWidth: 220, maxWidth: 260 }}>
            <div className="flex justify-center items-center h-28 bg-gray-100 rounded mb-2">
                <FaRegImage size={48} className="text-gray-400" />
            </div>
            <div className="font-bold text-[#281719] text-base leading-tight">{titulo}</div>
            {autor && <div className="text-xs text-gray-500">{autor}</div>}
            {descricao && <div className="text-xs text-gray-700 mb-1">{descricao}</div>}
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                {aulas !== undefined && <span>📚 {aulas} aulas</span>}
                {alunos !== undefined && <span>👥 {alunos} alunos</span>}
                {certificados !== undefined && <span>🎓 {certificados} certificados</span>}
            </div>
            {status && <span className="text-xs font-semibold px-2 py-1 rounded bg-[#9BB61B] text-[#281719] w-fit">{status}</span>}
        </div>
    );
} 