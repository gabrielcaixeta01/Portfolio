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

    // Normalize coordinates to -1 to 1 range
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    // Clamp values to prevent extreme rotations at edges
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    // Apply easing function for smoother transitions
    const easeOut = (t: number) => 1 - Math.pow(1 - Math.abs(t), 3);
    const easedX = Math.sign(clampedX) * easeOut(clampedX);
    const easedY = Math.sign(clampedY) * easeOut(clampedY);

    // Calculate rotation with reduced intensity for smoother effect
    const rotateX = easedY * -8; // Reduced from -10 to -8
    const rotateY = easedX * 8; // Reduced from 10 to 8

    setMousePosition({ x: rotateY, y: rotateX });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="sobre"
      className="scroll-mt-18 min-h-screen flex items-center justify-center px-4 py-12 sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl w-full mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {/* Profile Image - Desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-image-container flex-shrink-0 hidden lg:block"
          >
            <div
              className="about-image relative w-full aspect-[3/4] lg:w-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transformStyle: "preserve-3d",
                transition:
                  "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "transform",
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

          {/* Content - Centered on mobile, left-aligned on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="about-content flex-1 text-center lg:text-left max-w-2xl lg:max-w-xl"
          >
            <h2 className="about-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">
              {t.about.title}
            </h2>
            <div className="about-text space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
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
