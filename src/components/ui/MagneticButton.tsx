"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  /** Renders an <a> when provided, otherwise a <button> */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  /** How strongly the element is attracted to the cursor (0–1) */
  strength?: number;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * Button/link that is magnetically attracted to the cursor on hover,
 * with spring physics. Renders a real <a> or <button> (no wrapper div).
 * Respects prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  strength = 0.28,
  target,
  rel,
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.12 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.12 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      x.set((e.clientX - (left + width / 2)) * strength);
      y.set((e.clientY - (top + height / 2)) * strength);
    },
    [x, y, strength]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const style = { x: sx, y: sy };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`inline-flex ${className}`}
        style={style}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      aria-label={ariaLabel}
      className={`inline-flex ${className}`}
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.button>
  );
}
