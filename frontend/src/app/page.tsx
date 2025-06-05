import Image from "next/image";
import HomeButtons from '../components/HomeButtons';

export default function HomePage() {
    return (
        <div className="text-center mt-16">
            <h1 className="text-4xl font-bold mb-4 text-[#281719]">Bem-vindo à BRASFI!</h1>
            <p className="text-lg mb-8 text-[#281719]">Participe de cursos, webinars e eventos com emissão
                 automática de certificados.<br/>Cadastre-se, faça login e explore nossos recursos.</p>
            <HomeButtons />
            <br/> <br/> <br/>
            <div className="flex justify-center">
            <Image src="/DesenvSustSemFundo.png" alt="Logo" width={300} height={300} />
            </div>
            <h6 className="text-3xl font-bold mb-4 text-[#281719]">Sobre Nós</h6>

            <p className="text-lg mb-8 text-[#281719]">A BRASFI, ou Aliança Brasileira de Finanças e Investimentos
                 Sustentáveis, é <br/>uma organização que busca conectar especialistas e acadêmicos.</p>


            <p className="text-lg mb-8 text-[#281719]">O objetivo é desenvolver soluções e formar líderes no campo
                 das finanças e investimentos  <br/>sustentáveis no Brasil</p>

            <p className="text-lg mb-8 text-[#281719]">Atuamos como um hub, capacitando pessoas, disseminando 
                conhecimento e profissionais no país e exterior.</p>

            <p className="text-lg mb-8 text-[#281719]">Nosso foco principal é promover o impacto positivo, 
                integrando práticas de sustentabilidade no setor financeiro e de investimentos.</p>

            <h6 className="text-3xl font-bold mb-4 text-[#281719]">Como a BRASFI atua?</h6>

            <p className="text-lg mb-8 text-[#281719]">Operamos principalmente através da criação e fortalecimento
                 de uma rede de profissionais e acadêmicos, reunindo<br/> pessoas ligadas às áreas de Finanças, Investimentos Sustentáveis e Sustentabilidade Corporativa.</p>

            <p className="text-lg mb-8 text-[#281719]"></p>
            
            <p className="text-lg mb-8 text-[#281719]">Somos um ator importante no cenário brasileiro de finanças sustentáveis, sempre buscando alinhar os fluxos
                 financeiros aos objetivos<br/> do Acordo de Paris e aos Objetivos de Desenvolvimento Sustentável</p>

            <div className="flex justify-center">
            <Image src="/InvestSustSemFundo.png" alt="Logo" width={300} height={300} />
            </div>
            <h6 className="text-3xl font-bold mb-4 text-[#281719]">Serviços</h6>

            <ul className="text-lg space-y-2">
            <li>✔️ Cursos online com certificado</li>
            <li>✔️ Webinars e Workshops</li>
            <li>✔️ Espaço de discussão e comunidade</li>
            <li>✔️ Plataforma integrada com emissão automática de certificados</li>
          </ul>
          <p className="text-lg mb-8 text-[#281719]"></p>
        </div>
    );
}
