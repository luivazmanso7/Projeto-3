import Image from "next/image";
import HomeButtons from '../components/HomeButtons';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F6DE] px-4">
            <div className="max-w-2xl w-full text-center mt-12 mb-8">
                <h1 className="text-4xl font-bold mb-4 text-[#281719]">Bem-vindo à BRASFI!</h1>
                <p className="text-lg mb-8 text-[#281719]">
                    Participe de cursos, webinars e eventos com emissão automática de certificados.<br />
                    Cadastre-se, faça login e explore nossos recursos.
                </p>
                <HomeButtons />
            </div>
            <div className="flex flex-col items-center w-full">
                <Image src="/DesenvSustSemFundo.png" alt="Logo" width={220} height={220} className="mb-6" />
                <h2 className="text-2xl font-bold mb-2 text-[#281719]">Sobre Nós</h2>
                <p className="text-base mb-4 text-[#281719]">
                    A BRASFI, ou Aliança Brasileira de Finanças e Investimentos Sustentáveis, é uma organização que busca conectar especialistas e acadêmicos.<br />
                    Nosso objetivo é desenvolver soluções e formar líderes no campo das finanças e investimentos sustentáveis no Brasil.
                </p>
                <p className="text-base mb-4 text-[#281719]">
                    Atuamos como um hub, capacitando pessoas, disseminando conhecimento e formando profissionais no país e exterior. Nosso foco principal é promover o impacto positivo, integrando práticas de sustentabilidade no setor financeiro e de investimentos.
                </p>
                <h2 className="text-2xl font-bold mb-2 text-[#281719]">Como a BRASFI atua?</h2>
                <p className="text-base mb-4 text-[#281719]">
                    Operamos principalmente através da criação e fortalecimento de uma rede de profissionais e acadêmicos, reunindo pessoas ligadas às áreas de Finanças, Investimentos Sustentáveis e Sustentabilidade Corporativa.
                </p>
                <p className="text-base mb-4 text-[#281719]">
                    Somos um ator importante no cenário brasileiro de finanças sustentáveis, sempre buscando alinhar os fluxos financeiros aos objetivos do Acordo de Paris e aos Objetivos de Desenvolvimento Sustentável.
                </p>
                <Image src="/InvestSustSemFundo.png" alt="Logo" width={220} height={220} className="mb-6" />
                <h2 className="text-2xl font-bold mb-2 text-[#281719]">Serviços</h2>
                <ul className="text-base space-y-2 mb-8 text-[#281719]">
                    <li>✔️ Cursos online com certificado</li>
                    <li>✔️ Webinars e Workshops</li>
                    <li>✔️ Espaço de discussão e comunidade</li>
                    <li>✔️ Plataforma integrada com emissão automática de certificados</li>
                </ul>
            </div>
        </div>
    );
}
