export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>BRASFI</div>
      <nav style={styles.nav}>
        <a href="#sobre">Sobre Nós</a>
        <a href="#servicos">Serviços</a>
        <a href="#contato">Contatos</a>
        <button style={styles.button}>Entrar</button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc'
  },
  logo: { fontWeight: 'bold', fontSize: '1.5em' },
  nav: { display: 'flex', gap: '15px', alignItems: 'center' },
  button: { padding: '5px 10px', border: '1px solid #000', background: '#fff' }
};
