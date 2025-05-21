import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/brasfi-logo.jpg" alt="Logo da BRASFI" width={40} height={40} />
          <span className="text-xl font-bold text-blue-800">BRASFI</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <a href="#inicio" className="hover:text-blue-600">Início</a>
          <a href="#sobre" className="hover:text-blue-600">Sobre Nós</a>
          <a href="#servicos" className="hover:text-blue-600">Serviços</a>
          <a href="#contato" className="hover:text-blue-600">Contato</a>
          <a href="#saiba-mais" className="hover:text-blue-600">Saiba Mais</a>
        </nav>
        <a
          href="/login"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm"
        >
          Entrar
        </a>
      </header>

      {/* Hero */}
      <section id="inicio" className="flex flex-col items-center justify-center text-center px-8 py-24 bg-gradient-to-r from-blue-50 to-blue-100">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6">Bem-vindo à BRASFI</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
          Participe de cursos, webinars e eventos com emissão automática de certificados.
        </p>
        <a href="#saiba-mais" className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 text-lg">
          Saiba mais
        </a>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="px-8 py-16 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
          <p className="text-lg">
            A BRASFI é uma plataforma educacional dedicada à capacitação por meio de cursos e eventos online, com foco na excelência e inclusão.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="px-8 py-16 bg-gray-100 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Serviços</h2>
          <ul className="text-lg space-y-2">
            <li>✔️ Cursos online com certificado</li>
            <li>✔️ Webinars e Workshops</li>
            <li>✔️ Espaço de discussão e comunidade</li>
            <li>✔️ Plataforma integrada com emissão automática de certificados</li>
          </ul>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="px-8 py-16 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contato</h2>
          <p className="text-lg mb-4">Entre em contato conosco pelo e-mail: <strong>contato@brasfi.org</strong></p>
        </div>
      </section>

      {/* Saiba Mais */}
      <section id="saiba-mais" className="px-8 py-16 bg-blue-50 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Saiba Mais</h2>
          <p className="text-lg">
            Explore os cursos e eventos disponíveis, inscreva-se e receba certificados de participação automaticamente. Faça parte da comunidade BRASFI!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} BRASFI - Todos os direitos reservados.
      </footer>
    </div>
  );
}
