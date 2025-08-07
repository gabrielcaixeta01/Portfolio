'use client';
import { motion } from 'framer-motion';

export default function Conhecimentos() {
  return (
    <section
      id="conhecimentos"
      className="scroll-mt-24 flex items-center justify-center h-screen px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-3xl"
      >
        <h2 className="text-4xl font-bold mb-6">Conhecimentos</h2>
        <p className="text-lg leading-relaxed">
          Tenho sólida experiência nas principais tecnologias de desenvolvimento web, além de uma base forte em algoritmos e sistemas digitais.
          <br /><br />
          <strong>Front-end:</strong> React, Next.js, Tailwind CSS, TypeScript<br />
          <strong>Back-end:</strong> Node.js, NestJS, REST APIs<br />
          <strong>Machine Learning:</strong> Python (scikit-learn, pandas, matplotlib), Random Forest, regressão linear e MLP<br />
          <strong>Outros:</strong> Git, GitHub, VHDL, C++, testes automatizados, Figma
          <br /><br />
          Estou constantemente estudando para me manter atualizado com o mercado e as inovações da área.
        </p>
      </motion.div>
    </section>
  );
}