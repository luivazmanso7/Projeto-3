"use client";
import React, { useEffect, useState } from "react";

interface DashboardAdmin {
  postagensHoje: number;
  atualizacoesPendentes: number;
  mensagensPendentes: number;
  usuariosAtivos: number;
  cursosAtivos: number;
  dataAtualizacao: string;
}

const fetchDashboardAdmin = async (): Promise<DashboardAdmin | null> => {
  try {
    const res = await fetch("http://localhost:8080/dashboard/admin");
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

const cards = [
  { label: "POSTAGENS HOJE", key: "postagensHoje", color: "#0B5C4B" },
  { label: "ATUALIZAÇÕES PENDENTES", key: "atualizacoesPendentes", color: "#1B8C5A" },
  { label: "MENSAGENS PENDENTES", key: "mensagensPendentes", color: "#B6C800" },
  { label: "USUÁRIOS ATIVOS", key: "usuariosAtivos", color: "#F5C400" },
  { label: "CURSOS ATIVOS", key: "cursosAtivos", color: "#2B2323" },
];

export default function DashboardAdminPage() {
  const [dados, setDados] = useState<DashboardAdmin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardAdmin().then((data) => {
      setDados(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ background: "#f8f7ed", minHeight: "100vh", padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>RESUMO DE ATIVIDADES</h2>
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        {cards.map((card) => (
          <div
            key={card.key}
            style={{
              background: card.color,
              color: card.key === "cursosAtivos" ? "#fff" : "#281719",
              borderRadius: 12,
              padding: 24,
              minWidth: 160,
              textAlign: "center",
              flex: 1,
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>
              {loading ? "..." : dados ? (dados[card.key as keyof DashboardAdmin] as number) : "-"}
            </div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{card.label}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>PROJETOS E EXPERIÊNCIAS DOCENTES</h2>
      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px #0001" }}>
        <p style={{ color: "#888" }}>
          Aqui você pode exibir cards de projetos, experiências docentes ou outras informações relevantes para o admin.
        </p>
      </div>
    </div>
  );
} 