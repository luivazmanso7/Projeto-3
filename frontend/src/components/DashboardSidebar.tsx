"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaBook, FaFolderOpen, FaProjectDiagram, FaCog, FaSignOutAlt, FaPen } from 'react-icons/fa';

export default function DashboardSidebar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const pathname = usePathname();
    const isAdminArea = pathname.startsWith('/dashboard/admin');
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAdmin(localStorage.getItem('role') === 'admin');
        }
    }, []);
    return (
        <aside className="bg-[#281719] text-white w-64 min-h-screen flex flex-col fixed left-0 top-0 z-20 shadow-lg">
            <div className="flex items-center gap-2 px-6 py-6 border-b border-[#9BB61B]">
                <img src="/brasfi-logo.jpg" alt="Logo BRASFI" className="w-10 h-10 rounded-full bg-white" />
                <span className="font-bold text-lg tracking-wide">BRASFI</span>
            </div>
            <nav className="flex-1 flex flex-col gap-1 mt-6 px-2">
                <Link href="/dashboard" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                    <FaTachometerAlt /> Dashboard
                </Link>
                <Link href={isAdminArea ? "/dashboard/admin/cursos" : "/dashboard/cursos"} className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                    <FaBook /> Cursos
                </Link>
                <Link href="/dashboard/recursos" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                    <FaFolderOpen /> Recursos
                </Link>
                <Link href="/dashboard/postagens" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                    <FaPen /> Discussões
                </Link>
                {isAdmin && (
                    <>
                        <Link href="/dashboard/admin/cursos" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                            <FaBook /> Administrar Cursos
                        </Link>
                        <Link href="/dashboard/admin/projetos" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                            <FaProjectDiagram /> Projetos
                        </Link>
                    </>
                )}
            </nav>
            <div className="mt-auto mb-6 px-2 flex flex-col gap-1">
                <Link href="/dashboard/configuracoes" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-[#9BB61B] font-semibold transition">
                    <FaCog /> Configurações
                </Link>
                <Link href="/logout" className="flex items-center gap-3 py-3 px-5 rounded-lg hover:bg-red-700 font-semibold transition">
                    <FaSignOutAlt /> Logout
                </Link>
            </div>
        </aside>
    );
} 