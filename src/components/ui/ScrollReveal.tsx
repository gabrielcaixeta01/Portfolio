"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Delay in seconds before the reveal starts */
  delay?: number;
  /** Distance in px the element travels while revealing */
  distance?: number;
  className?: string;
}

/**
 * Reveals children with a fade + rise when they enter the viewport.
 * Uses IntersectionObserver + CSS transitions (no re-renders) and
 * respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  distance = 36,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${distance}px)`;
    el.style.transition = [
      `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    ].join(", ");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
