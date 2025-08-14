"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface CursorRocketProps {
  size?: number;
  zIndex?: number;
  spriteSrc?: string;
  hideNativeCursor?: boolean;
  hotspotX?: number;
  hotspotY?: number;
  repelParticles?: boolean;
  enabled?: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface ParticleSystem {
  interactivity?: {
    mouse?: {
      position?: Position;
      pos_x?: number;
      pos_y?: number;
    };
  };
}

declare global {
  interface Window {
    pJSDom?: { pJS: ParticleSystem }[];
  }
}

/**
 * CursorRocket - A smooth-following rocket cursor component
 *
 * Place your rocket SVG at: /public/images/rocket.svg
 * Recommended size: 24x24px to 48x48px for best visual results
 *
 * Example usage:
 * <CursorRocket size={40} spriteSrc="/images/rocket.svg" zIndex={60} repelParticles />
 */
const CursorRocket: React.FC<CursorRocketProps> = ({
  size = 36,
  zIndex = 50,
  spriteSrc = "/images/rocket.svg",
  hideNativeCursor = true,
  hotspotX = 0,
  hotspotY = 0,
  repelParticles = false,
  enabled = false,
}) => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mousePositionRef = useRef<Position>({ x: 0, y: 0 });
  const currentPositionRef = useRef<Position>({ x: 0, y: 0 });
  const previousPositionRef = useRef<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isOverEditableElement, setIsOverEditableElement] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check for mobile/small screens (disable rocket on mobile)
  useEffect(() => {
    const checkMobile = () => {
      // Consider mobile if screen width is less than 768px (md breakpoint) or if it's a touch device
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    // Check initially
    checkMobile();

    // Check on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Linear interpolation function
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // Calculate angle between two points (corrected for proper rocket direction)
  const calculateAngle = (from: Position, to: Position): number => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    // Add 90 degrees to point the rocket nose in the direction of movement
    return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  };

  // Check if element is editable
  const isEditableElement = (element: Element): boolean => {
    const tagName = element.tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea") return true;
    if (element.getAttribute("contenteditable") === "true") return true;
    return false;
  };

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over editable element
      const target = e.target as Element;
      setIsOverEditableElement(target ? isEditableElement(target) : false);

      if (!isVisible) {
        setIsVisible(true);
        currentPositionRef.current = { x: e.clientX, y: e.clientY };
        previousPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    },
    [isVisible]
  );

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // tsParticles interaction
  const updateParticleInteraction = useCallback(
    (position: Position) => {
      if (!repelParticles) return;

      try {
        // Fallback to particles.js (older version)
        if (window.pJSDom && window.pJSDom.length > 0) {
          const pJS = window.pJSDom[0].pJS;
          if (pJS?.interactivity?.mouse) {
            pJS.interactivity.mouse.pos_x = position.x;
            pJS.interactivity.mouse.pos_y = position.y;
          }
        }
      } catch (error) {
        // Silently handle any particle interaction errors
        console.debug("Particle interaction not available:", error);
      }
    },
    [repelParticles]
  );

  // Animation loop
  const animate = useCallback(() => {
    if (!rocketRef.current || prefersReducedMotion) return;

    const rocket = rocketRef.current;
    const target = mousePositionRef.current;
    const current = currentPositionRef.current;

    // Store previous position for rotation calculation
    previousPositionRef.current = { ...current };

    // Much slower, more dramatic trailing effect
    const easing = 0.04; // Reduced from 0.08 for much slower following
    current.x = lerp(current.x, target.x, easing);
    current.y = lerp(current.y, target.y, easing);

    // Calculate rotation based on movement direction (use mouse position vs current for better direction)
    const angle = calculateAngle(current, target);

    // Apply transform with hotspot offset
    const translateX = current.x - size / 2 + hotspotX;
    const translateY = current.y - size / 2 + hotspotY;

    rocket.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;

    // Update particle interaction
    updateParticleInteraction(current);

    animationRef.current = requestAnimationFrame(animate);
  }, [
    size,
    hotspotX,
    hotspotY,
    prefersReducedMotion,
    updateParticleInteraction,
  ]);

  // Setup event listeners and animation
  useEffect(() => {
    if (prefersReducedMotion || isMobile || !enabled) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    handleMouseMove,
    handleMouseLeave,
    animate,
    prefersReducedMotion,
    isMobile,
    enabled,
  ]);

  // Handle native cursor visibility
  useEffect(() => {
    if (prefersReducedMotion || !hideNativeCursor || isMobile || !enabled)
      return;

    const shouldHideCursor = isVisible && !isOverEditableElement;

    if (shouldHideCursor) {
      document.body.classList.add("hide-native-cursor");
    } else {
      document.body.classList.remove("hide-native-cursor");
    }

    return () => {
      document.body.classList.remove("hide-native-cursor");
    };
  }, [
    hideNativeCursor,
    isVisible,
    isOverEditableElement,
    prefersReducedMotion,
    isMobile,
    enabled,
  ]);

  // Don't render if reduced motion is preferred, on mobile, or if disabled
  if (prefersReducedMotion || isMobile || !enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex,
        overflow: "hidden",
      }}
    >
      <div
        ref={rocketRef}
        className="rocket-cursor"
        style={{
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          pointerEvents: "none",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-out",
          willChange: "transform",
        }}
      >
        <Image
          src={spriteSrc}
          alt=""
          width={size}
          height={size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            animation: "rocketThrust 0.1s ease-in-out infinite alternate",
          }}
          draggable={false}
          priority
        />
      </div>

      <style jsx>{`
        @keyframes rocketThrust {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-1px);
          }
        }

        .rocket-cursor img {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
      `}</style>
    </div>
  );
};

export default CursorRocket;

/**
 * Usage Examples:
 *
 * // Basic usage
 * <CursorRocket />
 *
 * // Custom configuration
 * <CursorRocket
 *   size={40}
 *   spriteSrc="/images/rocket.svg"
 *   zIndex={60}
 *   repelParticles
 * />
 *
 * // With custom hotspot (for precise cursor positioning)
 * <CursorRocket
 *   size={32}
 *   hotspotX={2}
 *   hotspotY={-4}
 *   spriteSrc="/images/custom-rocket.png"
 * />
 */
