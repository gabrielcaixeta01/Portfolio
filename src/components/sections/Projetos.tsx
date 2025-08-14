"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Projetos() {
  const { t } = useLanguage();

  return (
    <section
      id="projetos"
      className="scroll-mt-18 h-screen flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-4xl font-bold mb-6">{t.projects.title}</h2>
        <p className="text-lg leading-relaxed mb-6">{t.projects.description}</p>
        <ul className="text-left list-disc list-inside text-lg space-y-4">
          <li>
            <strong>{t.projects.smartTicker.title}</strong> —{" "}
            {t.projects.smartTicker.description}
          </li>
          <li>
            <strong>{t.projects.agendaUnb.title}</strong> —{" "}
            {t.projects.agendaUnb.description}
          </li>
          <li>
            <strong>{t.projects.contaPalavras.title}</strong> —{" "}
            {t.projects.contaPalavras.description}
          </li>
          <li>
            <strong>{t.projects.marketplace.title}</strong> —{" "}
            {t.projects.marketplace.description}
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
