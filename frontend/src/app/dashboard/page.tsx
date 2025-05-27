'use client';
import Image from 'next/image';

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
}
