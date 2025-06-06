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
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h2>Configurações da Conta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Senha atual:</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Nova senha:</label>
          <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 8 }}>Salvar Alterações</button>
      </form>
    </div>
  );
} 