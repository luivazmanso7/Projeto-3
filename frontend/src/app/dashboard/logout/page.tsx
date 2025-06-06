"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Remove o token de autenticação (ajuste conforme seu sistema)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    // Redireciona para a tela de login
    router.push('/login');
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h2>Saindo...</h2>
    </div>
  );
} 