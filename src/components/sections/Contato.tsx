"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Contato() {
  const { t } = useLanguage();

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
        <h2 className="text-4xl font-bold mb-6">{t.contact.title}</h2>
        <p className="text-lg leading-relaxed mb-6">{t.contact.description}</p>
        <div className="text-lg space-y-3">
          <p>
            💼 <strong>{t.contact.linkedin}</strong>{" "}
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
            🧠 <strong>{t.contact.github}</strong>{" "}
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
            📧 <strong>{t.contact.email}</strong>{" "}
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
