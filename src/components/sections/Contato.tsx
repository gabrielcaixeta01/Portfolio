export default function Contato() {
  return (
    <section id="contato" className="scroll-mt-24 text-center max-w-2xl">
      <h2 className="text-4xl font-bold mb-4">Contato</h2>
      <p className="text-lg leading-relaxed mb-4">
        Ficarei feliz em conversar com você sobre oportunidades, ideias ou qualquer projeto interessante. 
        Sinta-se à vontade para entrar em contato pelas redes abaixo ou por e-mail.
      </p>
      <p className="text-lg">
        💼 <strong>LinkedIn:</strong>{' '}
        <a
          href="https://www.linkedin.com/in/gabrielcaixetahomero"
          className="text-cyan-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          gabrielcaixetahomero
        </a>
        <br />
        🧠 <strong>GitHub:</strong>{' '}
        <a
          href="https://github.com/gabrielcaixeta01"
          className="text-cyan-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          gabrielcaixeta01
        </a>
        <br />
        📧 <strong>E-mail:</strong>{' '}
        <a
          href="mailto:gabrielcaixetahomero.com"
          className="text-cyan-500 hover:underline"
        >
          gabrielcaixetahomero.com
        </a>
      </p>
    </section>
  );
}