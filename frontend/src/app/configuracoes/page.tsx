"use client";

import React, { useState } from 'react';

export default function Configuracoes() {
  const [nome, setNome] = useState('Nome do Usuário');
  const [email, setEmail] = useState('usuario@email.com');
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Configurações da Conta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Nome</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Senha atual</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Nova senha</label>
          <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, background: '#281719', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(40,23,25,0.08)' }}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
} 