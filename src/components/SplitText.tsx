"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  delay?: number;
}

/**
 * Splits text by words and reveals each one sliding up from below
 * when the element enters the viewport. Wrap inside your semantic tag:
 *   <h2 className="..."><SplitText text={t.title} /></h2>
 *
 * O whileInView fica no wrapper (não clipado) e propaga a variant pro
 * filho: observar o span interno não funciona — ele começa 110% pra
 * baixo, totalmente cortado pelo overflow-hidden, e o IntersectionObserver
 * clipa por ancestrais, então o ratio é 0 e a animação nunca dispararia.
 */
export default function SplitText({ text, delay = 0 }: Props) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] mr-[0.22em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}
