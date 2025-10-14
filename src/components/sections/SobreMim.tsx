"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import Image from "next/image";
import { useState, useCallback } from "react";

export default function SobreMim() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    const easeOut = (t: number) => 1 - Math.pow(1 - Math.abs(t), 3);
    const easedX = Math.sign(clampedX) * easeOut(clampedX);
    const easedY = Math.sign(clampedY) * easeOut(clampedY);

    const rotateX = easedY * -8;
    const rotateY = easedX * 8;

    setMousePosition({ x: rotateY, y: rotateX });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="sobre"
      className="
        scroll-mt-18 min-h-screen flex items-center justify-center
        px-4
        py-12 sm:py-16
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl w-full mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {/* Imagem — desktop only (mantém seu comportamento atual) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden lg:block flex-shrink-0"
          >
            <div
              className="
                relative w-full aspect-[3/4]
                lg:w-[420px] lg:h-[520px]
                rounded-2xl overflow-hidden shadow-2xl
                bg-gray-100 dark:bg-gray-800
                cursor-pointer
                transition-transform duration-150
                hover:scale-[1.02]
                will-change-transform
              "
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src="/gabriel.jpg"
                alt="Gabriel Caixeta"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="
              flex-1
              text-center lg:text-left
              max-w-2xl lg:max-w-xl
            "
          >
            <h2
              className="
                text-[var(--cc-title)] dark:text-[var(--cc-title)]
                font-bold tracking-tight
                text-4xl sm:text-5xl lg:text-6xl
                leading-[1.1]
                mb-6 sm:mb-8
              "
            >
              {t.about.title}
            </h2>

            <div
              className="
                text-[var(--cc-text)] dark:text-[var(--cc-text)]
                space-y-4 sm:space-y-6
                text-base sm:text-lg
                leading-[1.6]
                text-justify sm:text-left
              "
            >
              <p className="text-lg sm:text-xl">{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}