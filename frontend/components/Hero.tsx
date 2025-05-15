export default function Hero() {
  return (
    <section style={styles.hero}>
      <blockquote style={styles.quote}>
        “Lorem ipsum dolor sit amet. <br />
        Qui voluptatem rerum et quam voluptatem”
      </blockquote>
      <p style={styles.text}>Breve descrição do propósito do site.</p>
      <button style={styles.cta}>Saiba mais</button>
    </section>
  );
}

const styles = {
  hero: {
    padding: '60px 20px', textAlign: 'center'
  },
  quote: {
    fontStyle: 'italic', fontSize: '1.5em', marginBottom: '20px'
  },
  text: {
    maxWidth: '600px', margin: '0 auto 20px', fontSize: '1em'
  },
  cta: {
    padding: '10px 20px', border: '1px solid #000', backgroundColor: '#fff'
  }
};
