"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Conhecimentos() {
  const { t } = useLanguage();

  return (
    <section
      id="conhecimentos"
      className="scroll-mt-24 flex items-center justify-center h-screen px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl"
      >
        <h2 className="text-4xl font-bold mb-6">{t.skills.title}</h2>
        <p className="text-lg leading-relaxed">
          {t.skills.description}
          <br />
          <br />
          <strong>{t.skills.frontend}</strong> {t.skills.frontendSkills}
          <br />
          <strong>{t.skills.backend}</strong> {t.skills.backendSkills}
          <br />
          <strong>{t.skills.machineLearning}</strong> {t.skills.mlSkills}
          <br />
          <strong>{t.skills.others}</strong> {t.skills.otherSkills}
          <br />
          <br />
          {t.skills.conclusion}
        </p>
      </motion.div>
    </section>
  );
}
