import Image from "next/image";
import HomeButtons from '../components/HomeButtons';

export default function HomePage() {
    return (
        <div className="text-center mt-16">
            <h1 className="text-4xl font-bold mb-4 text-[#281719]">Bem-vindo à BRASFI!</h1>
            <p className="text-lg mb-8 text-[#281719]">Participe de cursos, webinars e eventos com emissão automática de certificados.<br/>Cadastre-se, faça login e explore nossos recursos.</p>
            <HomeButtons />
        </div>
    );
}
