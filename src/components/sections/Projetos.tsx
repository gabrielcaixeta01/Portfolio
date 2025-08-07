'use client';

import { motion } from 'framer-motion';

export default function Projetos() {
  return (
    <section
      id="projetos"
      className="scroll-mt-24 h-screen flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Projetos</h2>
        <p className="text-lg leading-relaxed mb-6">
          Aqui estão alguns dos projetos que desenvolvi, aplicando tecnologias modernas e boas práticas de engenharia de software:
        </p>
        <ul className="text-left list-disc list-inside text-lg space-y-4">
          <li>
            <strong>Smart Ticker</strong> — Plataforma de previsão de ações com modelo Random Forest e análise de sentimento de notícias, integrando Next.js e Python.
          </li>
          <li>
            <strong>Agenda Acadêmica UnB</strong> — Organizador visual de grades horárias com Tailwind CSS, upload de imagem e extração automática das matérias.
          </li>
          <li>
            <strong>Conta Palavras</strong> — Aplicação de linha de comando (CLI) em C++ orientada a testes com Catch2, criada para a disciplina de Técnicas de Programação.
          </li>
          <li>
            <strong>Marketplace Odontológico</strong> — Projeto em desenvolvimento voltado para venda rápida e segura de produtos odontológicos, com foco na experiência do usuário.
          </li>
        </ul>
      </motion.div>
    </section>
  );
}