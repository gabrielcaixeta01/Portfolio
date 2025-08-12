"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function SobreMim() {
  const { t } = useLanguage();

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
        <h2 className="text-4xl font-bold mb-6">{t.about.title}</h2>
        <p className="text-lg leading-relaxed mb-4">{t.about.paragraph1}</p>
        <p className="text-lg leading-relaxed mb-4">{t.about.paragraph2}</p>
        <p className="text-lg leading-relaxed">{t.about.paragraph3}</p>
      </motion.div>
    </section>
  );
}
