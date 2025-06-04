"use client";
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-[#9BB61B] p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-[#281719] font-bold text-xl">BRASFI</Link>
                <div className="space-x-4">
                    <Link href="/" className="text-[#281719] hover:text-white">Início</Link>
                    <Link href="/login" className="text-[#281719] hover:text-white">Entrar</Link>
                    <Link href="/cadastro" className="text-[#281719] hover:text-white">Cadastro</Link>
                    <Link href="/dashboard" className="text-[#281719] hover:text-white">Painel</Link>
                    <Link href="/dashboard/perfil" className="text-[#281719] hover:text-white">Perfil</Link>
                </div>
            </div>
        </nav>
    );
} 