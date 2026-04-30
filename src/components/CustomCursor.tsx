"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const rx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    setActive(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setHovering(!!t.closest("a,button,input,textarea,select,label,[role='button']"));
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Ring — lags behind cursor */}
      <motion.div
        style={{ left: rx, top: ry }}
        animate={{
          width:  hovering ? 44 : clicking ? 18 : 28,
          height: hovering ? 44 : clicking ? 18 : 28,
          borderColor: hovering
            ? "rgba(167,139,250,0.65)"
            : "rgba(99,102,241,0.45)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border z-[9999]"
      />
      {/* Dot — instant, mix-blend-difference so it adapts to bg */}
      <motion.div
        style={{ left: x, top: y }}
        animate={{ scale: hovering ? 0 : clicking ? 0.4 : 1 }}
        transition={{ duration: 0.1 }}
        className="fixed w-[6px] h-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference z-[9999]"
      />
    </div>
  );
}
