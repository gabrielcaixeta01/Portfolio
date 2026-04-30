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
 */
export default function SplitText({ text, delay = 0 }: Props) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] mr-[0.22em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}
