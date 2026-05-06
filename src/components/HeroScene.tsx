"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const N = 1600;

function ParticleMesh() {
  const mouse = useRef({ x: 0, y: 0 });

  // base: immutable reference positions
  // pts: Three.js Points object with its own mutable position buffer
  const { pts, base } = useMemo(() => {
    const base = new Float32Array(N * 3);
    const pos  = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      base[i*3]=pos[i*3]=x; base[i*3+1]=pos[i*3+1]=y; base[i*3+2]=pos[i*3+2]=z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    return { pts: new THREE.Points(geo, mat), base };
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((state) => {
    const t   = state.clock.elapsedTime;
    const pos = pts.geometry.attributes.position.array as Float32Array;
    const mx  = mouse.current.x * 6;
    const my  = mouse.current.y * 4;

    for (let i = 0; i < N; i++) {
      const bx = base[i*3], by = base[i*3+1], bz = base[i*3+2];
      const dx = bx - mx,   dy = by - my;
      const d2 = dx*dx + dy*dy;

      if (d2 < 25) {
        const dist = Math.sqrt(d2) + 0.001;
        const infl = Math.max(0, 1 - dist / 5);
        const wave = Math.sin(dist * 1.6 - t * 2) * 0.45 * infl;
        pos[i*3]   = bx + (dx / dist) * wave;
        pos[i*3+1] = by + (dy / dist) * wave;
      } else {
        pos[i*3]   = bx;
        pos[i*3+1] = by;
      }
      pos[i*3+2] = bz + Math.sin(t * 0.35 + i * 0.008) * 0.07;
    }

    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = t * 0.022;

    // Camera parallax
    state.camera.position.x += (mouse.current.x * 1.2 - state.camera.position.x) * 0.04;
    state.camera.position.y += (mouse.current.y * 0.7 - state.camera.position.y) * 0.04;
  });

  return <primitive object={pts} />;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <ParticleMesh />
    </Canvas>
  );
}
