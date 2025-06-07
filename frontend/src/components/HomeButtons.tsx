"use client";

export default function HomeButtons() {
    return (
        <div className="flex justify-center gap-4 mt-6">
            <a
                href="/login"
                className="px-8 py-2 rounded-md font-bold text-base transition-colors duration-200 bg-[#9BB61B] text-white border-2 border-[#9BB61B] hover:bg-[#281719] hover:text-[#9BB61B] hover:border-[#281719] focus:outline-none focus:ring-2 focus:ring-[#9BB61B]"
            >
                Entrar
            </a>
            <a
                href="/cadastro"
                className="px-8 py-2 rounded-md font-bold text-base transition-colors duration-200 bg-white text-[#281719] border-2 border-[#9BB61B] hover:bg-[#9BB61B] hover:text-white hover:border-[#281719] focus:outline-none focus:ring-2 focus:ring-[#9BB61B]"
            >
                Cadastro
            </a>
        </div>
    );
} 