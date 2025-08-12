'use client';

import { motion } from 'framer-motion';

export default function Contato() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 h-screen flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl"
      >
        <h2 className="text-4xl font-bold mb-6">Contato</h2>
        <p className="text-lg leading-relaxed mb-6">
          Ficarei feliz em conversar com você sobre oportunidades, ideias ou qualquer projeto interessante.
          Sinta-se à vontade para entrar em contato pelas redes abaixo ou por e-mail.
        </p>
        <div className="text-lg space-y-3">
          <p>
            💼 <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              className="text-cyan-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              gabriel-caixeta-romero
            </a>
          </p>
          <p>
            🧠 <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/gabrielcaixeta01"
              className="text-cyan-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              gabrielcaixeta01
            </a>
          </p>
          <p>
            📧 <strong>E-mail:</strong>{' '}
            <a
              href="mailto:gabrielcaixetaromero@gmail.com"
              className="text-cyan-500 hover:underline"
            >
              gabrielcaixetaromero@gmail.com
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}