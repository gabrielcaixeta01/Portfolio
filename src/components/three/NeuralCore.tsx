"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Palette — same vocabulary as the project network */
const NODE_SOFT = 0x818cf8; // indigo-400
const EDGE = 0x4338ca; // indigo-700
const PULSE_A = 0xa5b4fc; // indigo-300
const PULSE_B = 0x22d3ee; // cyan-400

const NODE_COUNT = 420;
const MAX_EDGES = 720;
const EDGE_DIST = 0.95;
const PULSE_COUNT = 14;

/**
 * Núcleo neural abstrato: nós em casca dupla (fibonacci sphere), arestas
 * entre vizinhos próximos e pulsos de luz viajando pelas conexões — o mesmo
 * vocabulário visual da rede de projetos. Rotação lenta + parallax de mouse;
 * com prefers-reduced-motion renderiza um frame estático.
 */
export default function NeuralCore({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const core = new THREE.Group();
    scene.add(core);

    /* — nodes: outer shell + inner cluster (fibonacci distribution) — */
    const pts: THREE.Vector3[] = [];
    const positions = new Float32Array(NODE_COUNT * 3);
    const golden = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const shell = i % 5 === 0 ? 1.5 : 2.4;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = golden * i;
      const r = shell + (Math.random() - 0.5) * 0.35;
      const v = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      pts.push(v);
      positions.set([v.x, v.y, v.z], i * 3);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: NODE_SOFT,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    core.add(new THREE.Points(nodeGeo, nodeMat));

    /* — edges: nearest neighbours below threshold — */
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    outer: for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < EDGE_DIST) {
          edges.push([pts[i], pts[j]]);
          if (edges.length >= MAX_EDGES) break outer;
        }
      }
    }
    const edgePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      edgePos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePos, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: EDGE,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    core.add(new THREE.LineSegments(edgeGeo, edgeMat));

    /* — pulses: bright packets travelling along random edges — */
    type Pulse = { edge: [THREE.Vector3, THREE.Vector3]; t: number; speed: number };
    const pulses: Pulse[] = [];
    const pulsePos = new Float32Array(PULSE_COUNT * 3);
    const pulseColors = new Float32Array(PULSE_COUNT * 3);
    const colA = new THREE.Color(PULSE_A);
    const colB = new THREE.Color(PULSE_B);
    for (let i = 0; i < PULSE_COUNT; i++) {
      pulses.push({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.5 + Math.random() * 0.7,
      });
      const c = i % 2 === 0 ? colA : colB;
      pulseColors.set([c.r, c.g, c.b], i * 3);
    }
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    core.add(pulsePoints);

    const tmp = new THREE.Vector3();
    const updatePulses = (dt: number) => {
      for (let i = 0; i < PULSE_COUNT; i++) {
        const p = pulses[i];
        p.t += dt * p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.edge = edges[Math.floor(Math.random() * edges.length)];
        }
        tmp.lerpVectors(p.edge[0], p.edge[1], p.t);
        pulsePos.set([tmp.x, tmp.y, tmp.z], i * 3);
      }
      pulseGeo.attributes.position.needsUpdate = true;
    };

    /* — sizing — */
    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* — mouse parallax — */
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetY = (e.clientX / window.innerWidth - 0.5) * 0.45;
      targetX = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    updatePulses(0);
    core.rotation.x = 0.18;

    if (reduced) {
      renderer.render(scene, camera);
      return () => {
        ro.disconnect();
        [nodeGeo, edgeGeo, pulseGeo].forEach((g) => g.dispose());
        [nodeMat, edgeMat, pulseMat].forEach((m) => m.dispose());
        renderer.dispose();
      };
    }

    window.addEventListener("pointermove", onPointer);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      core.rotation.y += dt * 0.12;
      core.rotation.x += (0.18 + targetX - core.rotation.x) * 0.04;
      core.rotation.z += (targetY - core.rotation.z) * 0.04;
      nodeMat.size = 0.05 * (1 + 0.1 * Math.sin(t * 1.4));

      updatePulses(dt);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      [nodeGeo, edgeGeo, pulseGeo].forEach((g) => g.dispose());
      [nodeMat, edgeMat, pulseMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
