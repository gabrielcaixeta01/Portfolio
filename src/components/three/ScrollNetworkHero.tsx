"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type NetProject = {
  id: string;
  name: string;
  sub: string;
  href?: string;
  github?: string;
  tech?: string[];
  role?: string;
  problem?: string;
  solution?: string;
  result?: string;
  image?: string;
};

type Labels = {
  eyebrow: string;
  title: string;
  intro: string;
  node: string;
  hint: string;
  cta: string;
};

type Props = {
  projects: NetProject[];
  labels: Labels;
  heightVh?: number;
};

/* Palette — derived from the site's indigo/cyan identity on #0a0a0a */
const BG = 0x0a0a0a;
const NODE = 0x6366f1; // indigo-500
const NODE_SOFT = 0x818cf8; // indigo-400
const AMBIENT = 0x2e2e36; // zinc-ish
const EDGE = 0x4338ca; // indigo-700
const PACKET_A = 0xa5b4fc; // indigo-300
const PACKET_B = 0x22d3ee; // cyan-400

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Scroll-driven 3D network: the camera travels along a curve visiting one
 * glowing node per project while captions fade in sync. A clickable route
 * rail on the right mirrors the journey. Respects prefers-reduced-motion.
 */
export default function ScrollNetworkHero({ projects, labels, heightVh = 340 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railFillRef = useRef<HTMLDivElement>(null);

  const count = projects.length;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || count === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(BG, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.03);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
    const world = new THREE.Group();
    scene.add(world);

    const disposables: { dispose: () => void }[] = [];

    /* ---- main nodes: one per project, alternating sides in depth ---- */
    const mainPositions = Array.from({ length: count }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      return new THREE.Vector3(side * 4.5, (i % 3) * 1.6 - 1.2, -i * 14);
    });

    const mainMeshes: THREE.Mesh[] = [];
    const halos: THREE.Mesh[] = [];

    mainPositions.forEach((pos) => {
      const geo = new THREE.SphereGeometry(0.55, 24, 24);
      const mat = new THREE.MeshBasicMaterial({ color: NODE });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);

      const haloGeo = new THREE.SphereGeometry(0.95, 24, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: NODE_SOFT,
        transparent: true,
        opacity: 0.14,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(halo);

      world.add(mesh);
      mainMeshes.push(mesh);
      halos.push(halo);
      disposables.push(geo, mat, haloGeo, haloMat);
    });

    /* ---- ambient nodes scattered along the route ---- */
    const ambient: { mesh: THREE.Mesh; base: THREE.Vector3; phase: number }[] = [];
    const ambGeo = new THREE.SphereGeometry(0.18, 10, 10);
    const ambMat = new THREE.MeshBasicMaterial({ color: AMBIENT });
    disposables.push(ambGeo, ambMat);

    const depth = (count - 1) * 14 + 10;
    for (let i = 0; i < 70; i++) {
      const mesh = new THREE.Mesh(ambGeo, ambMat);
      const base = new THREE.Vector3(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 14,
        -Math.random() * depth + 4
      );
      mesh.position.copy(base);
      world.add(mesh);
      ambient.push({ mesh, base, phase: Math.random() * Math.PI * 2 });
    }

    /* ---- distant star-dust for depth ---- */
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 60;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 34;
      dustPos[i * 3 + 2] = -Math.random() * (depth + 30) + 8;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: NODE_SOFT,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
    });
    world.add(new THREE.Points(dustGeo, dustMat));
    disposables.push(dustGeo, dustMat);

    /* ---- edges: each node linked to its 2 nearest neighbours ---- */
    const allMeshes = [...mainMeshes, ...ambient.map((a) => a.mesh)];
    const edges: { a: THREE.Mesh; b: THREE.Mesh; line: THREE.Line }[] = [];
    const lineMat = new THREE.LineBasicMaterial({
      color: EDGE,
      transparent: true,
      opacity: 0.32,
    });
    disposables.push(lineMat);

    const connect = (a: THREE.Mesh, b: THREE.Mesh) => {
      const exists = edges.some(
        (e) => (e.a === a && e.b === b) || (e.a === b && e.b === a)
      );
      if (exists) return;
      const geo = new THREE.BufferGeometry().setFromPoints([a.position, b.position]);
      const line = new THREE.Line(geo, lineMat);
      world.add(line);
      edges.push({ a, b, line });
      disposables.push(geo);
    };

    allMeshes.forEach((m) => {
      allMeshes
        .filter((o) => o !== m)
        .map((o) => ({ o, d: m.position.distanceTo(o.position) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 2)
        .forEach((e) => connect(m, e.o));
    });
    for (let i = 0; i < mainMeshes.length - 1; i++) {
      connect(mainMeshes[i], mainMeshes[i + 1]);
    }

    /* ---- packets travelling the edges ---- */
    const pktGeoA = new THREE.SphereGeometry(0.09, 8, 8);
    const pktMatA = new THREE.MeshBasicMaterial({ color: PACKET_A });
    const pktMatB = new THREE.MeshBasicMaterial({ color: PACKET_B });
    disposables.push(pktGeoA, pktMatA, pktMatB);

    const packets = Array.from({ length: reduced ? 6 : 22 }, (_, i) => {
      const mesh = new THREE.Mesh(pktGeoA, i % 3 === 0 ? pktMatB : pktMatA);
      world.add(mesh);
      return {
        mesh,
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
      };
    });

    /* ---- camera route through every main node ---- */
    const camPoints = [
      new THREE.Vector3(0, 1.5, 12),
      ...mainPositions.map((p) => new THREE.Vector3(p.x * -0.6, p.y + 1.2, p.z + 7)),
      new THREE.Vector3(0, 2, -(depth + 4)),
    ];
    const camCurve = new THREE.CatmullRomCurve3(camPoints, false, "catmullrom", 0.4);

    /* ---- scroll progress ---- */
    let progress = 0;
    let smooth = 0;

    const readScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };
    window.addEventListener("scroll", readScroll, { passive: true });
    readScroll();

    /* ---- mouse parallax ---- */
    let mx = 0;
    let my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    /* ---- resize ---- */
    const resize = () => {
      const w = wrap.clientWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    /* ---- render loop ---- */
    const clock = new THREE.Clock();
    const lookTarget = new THREE.Vector3();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      smooth += (progress - smooth) * (reduced ? 1 : 0.07);

      const camPos = camCurve.getPoint(smooth);
      camera.position.copy(camPos);
      camera.position.x += mx * 0.6;
      camera.position.y += -my * 0.4;

      const ahead = camCurve.getPoint(Math.min(1, smooth + 0.04));
      lookTarget.copy(ahead);
      camera.lookAt(lookTarget);

      if (!reduced) {
        ambient.forEach((n) => {
          n.mesh.position.y = n.base.y + Math.sin(t * 0.7 + n.phase) * 0.25;
        });
        edges.forEach((ed) => {
          const pos = ed.line.geometry.attributes.position as THREE.BufferAttribute;
          pos.setXYZ(0, ed.a.position.x, ed.a.position.y, ed.a.position.z);
          pos.setXYZ(1, ed.b.position.x, ed.b.position.y, ed.b.position.z);
          pos.needsUpdate = true;
        });
      }

      packets.forEach((pk) => {
        pk.t += pk.speed;
        if (pk.t >= 1) {
          pk.t = 0;
          pk.edge = edges[Math.floor(Math.random() * edges.length)];
        }
        pk.mesh.position.lerpVectors(pk.edge.a.position, pk.edge.b.position, pk.t);
      });

      halos.forEach((halo, i) => {
        const s = 1 + Math.sin(t * 2 + i * 2.1) * 0.18;
        halo.scale.setScalar(s);
      });

      /* intro + hint fade out as the journey begins */
      if (introRef.current) {
        const o = Math.max(0, 1 - smooth * 7);
        introRef.current.style.opacity = String(o);
        introRef.current.style.transform = `translateY(${(1 - o) * -18}px)`;
        introRef.current.style.pointerEvents = o > 0.5 ? "auto" : "none";
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - smooth * 3));
      }

      /* captions: each project owns a slice of the scroll */
      captionRefs.current.forEach((el, i) => {
        if (!el) return;
        const center = (i + 0.5) / count;
        const dist = Math.abs(smooth - center) * count;
        const opacity = Math.max(0, 1 - dist * 2.2);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 24}px)`;
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });

      /* route rail: fill + active dot */
      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleY(${smooth})`;
      }
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const center = (i + 0.5) / count;
        const active = Math.abs(smooth - center) * count < 0.5;
        dot.style.backgroundColor = active ? "#818cf8" : "#3f3f46";
        dot.style.boxShadow = active ? "0 0 12px 2px rgba(99,102,241,0.55)" : "none";
        dot.style.transform = active ? "scale(1.5)" : "scale(1)";
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [count]);

  /* click on a rail dot → scroll to that node's slice */
  const goToNode = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const top = wrap.offsetTop + ((i + 0.5) / count) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={wrapRef}
      id="projetos"
      style={{ height: `${heightVh}vh` }}
      className="relative"
      aria-label={labels.eyebrow}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* seamless blend into the page background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent"
        />

        {/* intro — fades out as the journey begins */}
        <div
          ref={introRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-indigo-400">
            {labels.eyebrow}
          </span>
          <h2
            className="mt-3 text-4xl sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.05] text-zinc-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {labels.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-md">{labels.intro}</p>
        </div>

        {/* captions — one per project node */}
        {projects.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className="absolute bottom-[16vh] left-[clamp(20px,6vw,72px)] max-w-[440px] opacity-0"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-400 mb-2">
              {labels.node} {pad(i + 1)} / {pad(count)}
            </p>
            <h3
              className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-zinc-100 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {p.name}
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{p.sub}</p>
            {p.tech && (
              <p className="mt-3 font-mono text-[11px] text-zinc-500">
                {p.tech.join(" · ")}
              </p>
            )}
            <div className="flex items-center gap-5 mt-4">
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-indigo-400 border-b border-indigo-400/40 hover:border-indigo-400 transition-colors"
                >
                  {labels.cta} →
                </a>
              )}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-zinc-500 border-b border-zinc-500/30 hover:text-zinc-300 hover:border-zinc-400 transition-colors"
                >
                  github ↗
                </a>
              )}
            </div>
          </div>
        ))}

        {/* route rail — the journey, as a clickable line */}
        <div className="absolute right-[clamp(16px,4vw,48px)] top-1/2 -translate-y-1/2 flex flex-col items-center gap-0">
          <div className="relative w-px h-40 bg-white/10">
            <div
              ref={railFillRef}
              className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-indigo-500 to-cyan-400"
            />
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goToNode(i)}
                aria-label={`${labels.node} ${pad(i + 1)} — ${p.name}`}
                className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-zinc-700 transition-all duration-300 cursor-pointer"
                style={{ top: `${((i + 0.5) / count) * 100}%`, marginTop: -4 }}
              />
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.15em] text-zinc-500"
        >
          {labels.hint}
        </div>
      </div>
    </section>
  );
}
