"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Projeto {
  id: number;
  nome: string;
  status: string;
  categoria: string;
}

export default function ProjetosAdminPage() {
  const router = useRouter();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/dashboard");
    }
    fetch("http://localhost:8080/projetos")
      .then((res) => res.json())
      .then(setProjetos);
  }, [router]);

  const projetosFiltrados = projetos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) &&
    (statusFiltro ? p.status === statusFiltro : true) &&
    (categoriaFiltro ? p.categoria === categoriaFiltro : true)
  );

  const statusUnicos = Array.from(new Set(projetos.map(p => p.status)));
  const categoriasUnicas = Array.from(new Set(projetos.map(p => p.categoria)));

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#281719]">MEUS PROJETOS</h2>
      <div className="flex gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Buscar..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={statusFiltro}
          onChange={e => setStatusFiltro(e.target.value)}
        >
          <option value="">Status</option>
          {statusUnicos.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2"
          value={categoriaFiltro}
          onChange={e => setCategoriaFiltro(e.target.value)}
        >
          <option value="">Categoria</option>
          {categoriasUnicas.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Nome do Projeto</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {projetosFiltrados.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">Nenhum projeto encontrado.</td>
            </tr>
          ) : (
            projetosFiltrados.map((projeto) => (
              <tr key={projeto.id} className="border-b">
                <td className="p-3">{projeto.nome}</td>
                <td className="p-3">{projeto.status}</td>
                <td className="p-3">{projeto.categoria}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 