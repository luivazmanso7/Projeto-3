"use client";

export default function Footer() {
    return (
        <footer className="bg-[#9BB61B] text-[#281719] text-center py-4 mt-8">
            <p>&copy; {new Date().getFullYear()} BRASFI. Todos os direitos reservados. | <a href="mailto:contato@brasfi.org" className="underline">Contato</a></p>
        </footer>
    );
} 