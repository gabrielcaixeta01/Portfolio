"use client";
import { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/macbook.glb");

// Screen center in viewport % — adjust these if the terminal drifts off the screen
const SCREEN_X = 50;   // horizontal center
const SCREEN_Y = 34;   // vertical: measured from top

// ── Background particles ───────────────────────────────────────────────────────
const PN = 700;

function Particles() {
  const mouse = useRef({ x: 0, y: 0 });

  const { pts, base } = useMemo(() => {
    const base = new Float32Array(PN * 3);
    const pos  = new Float32Array(PN * 3);
    for (let i = 0; i < PN; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 10;
      base[i*3]=pos[i*3]=x; base[i*3+1]=pos[i*3+1]=y; base[i*3+2]=pos[i*3+2]=z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return {
      pts: new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0x818cf8, size: 0.022, sizeAttenuation: true,
        transparent: true, opacity: 0.35, depthWrite: false,
      })),
      base,
    };
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
    const pos = pts.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < PN; i++) {
      pos[i*3+2] = base[i*3+2] + Math.sin(t * 0.3 + i * 0.009) * 0.06;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = t * 0.018;
    state.camera.position.x += (mouse.current.x * 0.4 - state.camera.position.x) * 0.025;
    state.camera.position.y += (mouse.current.y * 0.2 + 0.3 - state.camera.position.y) * 0.025;
  });

  return <primitive object={pts} />;
}

// ── MacBook model ─────────────────────────────────────────────────────────────
interface MacBookProps {
  onFront: (pos: { x: number; y: number }) => void;
}

function MacBookModel({ onFront }: MacBookProps) {
  const { scene }  = useGLTF("/macbook.glb");
  const groupRef   = useRef<THREE.Group>(null);
  const yCurrent    = useRef(Math.PI);
  const yTarget     = useRef(Math.PI);
  const notified    = useRef(false);
  const normalized  = useRef(false);

  useEffect(() => {
    if (normalized.current) return;
    normalized.current = true;

    // Fit model into ~2.6 units, centered
    const box  = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const ctr  = box.getCenter(new THREE.Vector3());
    const sc   = 2.6 / Math.max(size.x, size.y, size.z);
    scene.scale.setScalar(sc);
    scene.position.set(-ctr.x * sc, -ctr.y * sc, -ctr.z * sc);

    setTimeout(() => { yTarget.current = 0; }, 600);
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    yCurrent.current += (yTarget.current - yCurrent.current) * 0.028;
    groupRef.current.rotation.y = yCurrent.current;

    if (!notified.current && Math.abs(yCurrent.current) < 0.12) {
      notified.current = true;

      // Screen center position in viewport %.
      // Camera is fixed at [0, 0.3, 4.5] fov=45, model normalized to 2.6 units.
      // Measured from screenshot: screen center ≈ X=50%, Y=34%.
      const screenPos = { x: SCREEN_X, y: SCREEN_Y };
      onFront(screenPos);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// ── Scene lights (no Environment — avoids external HDR fetch) ─────────────────
function Lights() {
  return (
    <>
      {/* Sky/ground ambient */}
      <hemisphereLight args={["#ddeeff", "#112233", 0.9]} />
      {/* Key light — front top right */}
      <directionalLight position={[3, 5, 4]}  intensity={2.2} />
      {/* Fill light — front left */}
      <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#c8d8ff" />
      {/* Rim light — back */}
      <directionalLight position={[0, 2, -6]} intensity={0.6} color="#6080ff" />
    </>
  );
}

// ── Canvas export ─────────────────────────────────────────────────────────────
export default function LaptopScene({ onFront }: MacBookProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Lights />
      <Particles />
      <Suspense fallback={null}>
        <MacBookModel onFront={onFront} />
      </Suspense>
    </Canvas>
  );
}
