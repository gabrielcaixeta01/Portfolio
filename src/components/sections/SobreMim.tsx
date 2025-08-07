'use client';

import { motion } from 'framer-motion';

export default function SobreMim() {
  return (
    <section
      id="sobre"
      className="scroll-mt-32 h-screen flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl"
      >
        <h2 className="text-4xl font-bold mb-6">Sobre mim</h2>
        <p className="text-lg leading-relaxed mb-4">
          Olá! Sou Gabriel, estudante de Engenharia de Computação na Universidade de Brasília (UnB). 
          Tenho grande interesse por tecnologia, com foco em desenvolvimento web full stack e inteligência artificial.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ao longo da minha jornada acadêmica e profissional, busquei combinar habilidades técnicas com criatividade,
          contribuindo para soluções eficientes, intuitivas e modernas. 
        </p>
        <p className="text-lg leading-relaxed">
          Atualmente, estou aprofundando meus conhecimentos em frameworks como Next.js e NestJS, além de explorar áreas como aprendizado de máquina e sistemas embarcados. 
          Acredito no poder da tecnologia para transformar o mundo, e estou sempre em busca de novos desafios e oportunidades de aprendizado.
        </p>
      </motion.div>
    </section>
  );
}