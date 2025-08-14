"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

export default function ParticlesBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Use resolvedTheme for better theme detection, fallback to theme
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: {
            value: isDark ? "#0a0a0a" : "#ffffff",
          },
        },
        particles: {
          number: {
            value: 80,
          },
          color: {
            value: isDark ? "#ffffff" : "#000000",
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          links: {
            enable: true,
            color: isDark ? "#ffffff" : "#000000",
            distance: 150,
            opacity: 0.5,
            width: 1,
            opacityAnimation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: "bounce",
          },
          size: {
            value: 2,
          },
          opacity: {
            value: 0.6,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.3,
              sync: false,
            },
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 1,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            bubble: {
              distance: 200,
              size: 10,
              duration: 2,
              opacity: 0.8,
            },
          },
        },
      }}
    />
  );
}
