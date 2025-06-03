// components/SidebarLayout.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Discussões', path: '/discussoes' },
    { name: 'Denúncias', path: '/denuncias' },
    { name: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <div className="flex min-h-screen bg-[#281719] text-white">
      <aside className="w-64 p-4 flex flex-col items-start">
        <div className="mb-6">
          <Image src="/brasfi-logo.jpg" alt="Logo" width={50} height={50} />
        </div>
        <nav className="flex flex-col w-full gap-2">
          {menuItems.map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className="px-4 py-2 rounded text-white hover:bg-[#9BB61B] hover:text-black transition-colors duration-200"

            >
              {name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-grow bg-[#FFFCE5] p-6 text-black">{children}</main>
    </div>
  );
};

export default SidebarLayout;
