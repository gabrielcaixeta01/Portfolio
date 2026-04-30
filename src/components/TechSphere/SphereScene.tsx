"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SKILLS } from "./skills";
import {
  generateSpherePoints,
  getIconQuaternion,
  createIconTexture,
  createLabelTexture,
} from "./utils";

const SPHERE_RADIUS = 2.3;
const ICON_PLANE_SIZE = 0.8;
const LABEL_PLANE_WIDTH = 0.9;
const LABEL_PLANE_HEIGHT = 0.22;
const LABEL_OFFSET_Y = -(ICON_PLANE_SIZE / 2 + LABEL_PLANE_HEIGHT / 2 + 0.04);
const MIN_OPACITY = 0.12;
const MAX_OPACITY = 1.0;
const LERP_SPEED = 6;
const AUTO_ROTATE_Y = 0.06;
const AUTO_ROTATE_X = 0.02;
const DRAG_ROTATE_SPEED = 0.008;

function AutoRotator({ groupRef }: { groupRef: { current: THREE.Group | null } }) {
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * AUTO_ROTATE_Y;
    groupRef.current.rotation.x += delta * AUTO_ROTATE_X;
  });
  return null;
}

export function SphereScene() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const labelRefs = useRef<THREE.Mesh[]>([]);
  const opacityRefs = useRef<number[]>(SKILLS.map(() => MIN_OPACITY));
  const hoveredRef = useRef<number>(-1);

  const { camera, gl } = useThree();

  const positions = useMemo(() => generateSpherePoints(SKILLS.length, SPHERE_RADIUS), []);
  const quaternions = useMemo(() => positions.map(getIconQuaternion), [positions]);

  // Apply textures after mount
  useEffect(() => {
    SKILLS.forEach((skill, i) => {
      const labelMesh = labelRefs.current[i];
      if (labelMesh) {
        const tex = createLabelTexture(skill.name, skill.color);
        (labelMesh.material as THREE.MeshBasicMaterial).map = tex;
        (labelMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    });

    SKILLS.forEach(async (skill, i) => {
      try {
        const tex = await createIconTexture(skill.slug, skill.color);
        const mesh = meshRefs.current[i];
        if (mesh) {
          (mesh.material as THREE.MeshBasicMaterial).map = tex;
          (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
        }
      } catch {
        // icon unavailable, keep transparent
      }
    });
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseNDC = useMemo(() => new THREE.Vector2(), []);

  // Mouse hover
  useEffect(() => {
    const domEl = gl.domElement;

    const onMouseMove = (e: MouseEvent) => {
      const rect = domEl.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObjects(meshRefs.current.filter(Boolean), false);
      if (hits.length > 0) {
        hoveredRef.current = meshRefs.current.indexOf(hits[0].object as THREE.Mesh);
        domEl.style.cursor = "pointer";
      } else {
        hoveredRef.current = -1;
        domEl.style.cursor = "default";
      }
    };

    domEl.addEventListener("mousemove", onMouseMove);
    return () => domEl.removeEventListener("mousemove", onMouseMove);
  }, [camera, gl, raycaster, mouseNDC]);

  // Mouse + touch drag rotation
  useEffect(() => {
    const domEl = gl.domElement;
    let dragging = false;
    let lastX = 0;

    const onDown = (e: MouseEvent) => { dragging = true; lastX = e.clientX; };
    const onUp = () => { dragging = false; };
    const onDrag = (e: MouseEvent) => {
      if (!dragging || !groupRef.current) return;
      groupRef.current.rotation.y += (e.clientX - lastX) * DRAG_ROTATE_SPEED;
      lastX = e.clientX;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) { dragging = true; lastX = e.touches[0].clientX; }
    };
    const onTouchEnd = () => { dragging = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || !groupRef.current || e.touches.length !== 1) return;
      groupRef.current.rotation.y += (e.touches[0].clientX - lastX) * DRAG_ROTATE_SPEED;
      lastX = e.touches[0].clientX;
    };

    domEl.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    domEl.addEventListener("mousemove", onDrag);
    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    domEl.addEventListener("touchend", onTouchEnd);
    domEl.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      domEl.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      domEl.removeEventListener("mousemove", onDrag);
      domEl.removeEventListener("touchstart", onTouchStart);
      domEl.removeEventListener("touchend", onTouchEnd);
      domEl.removeEventListener("touchmove", onTouchMove);
    };
  }, [gl]);

  // Animation loop — interpolate opacities
  useFrame((_, delta) => {
    SKILLS.forEach((_, i) => {
      const iconMesh = meshRefs.current[i];
      const labelMesh = labelRefs.current[i];
      if (!iconMesh || !labelMesh) return;

      const isHovered = hoveredRef.current === i;
      const iconMat = iconMesh.material as THREE.MeshBasicMaterial;
      const labelMat = labelMesh.material as THREE.MeshBasicMaterial;

      const t = Math.min(1, delta * LERP_SPEED);
      const targetIcon = isHovered ? MAX_OPACITY : MIN_OPACITY;
      opacityRefs.current[i] += (targetIcon - opacityRefs.current[i]) * t;
      iconMat.opacity = opacityRefs.current[i];

      const targetLabel = isHovered ? 1 : 0;
      labelMat.opacity += (targetLabel - labelMat.opacity) * t;
    });
  });

  return (
    <>
      <AutoRotator groupRef={groupRef} />
      <group ref={groupRef}>
        {SKILLS.map((skill, i) => (
          <group key={skill.slug}>
            <mesh
              ref={(el) => { if (el) meshRefs.current[i] = el; }}
              position={positions[i]}
              quaternion={quaternions[i]}
              renderOrder={1}
            >
              <planeGeometry args={[ICON_PLANE_SIZE, ICON_PLANE_SIZE]} />
              <meshBasicMaterial
                transparent
                depthTest={false}
                depthWrite={false}
                side={THREE.DoubleSide}
                opacity={MIN_OPACITY}
              />
            </mesh>

            <mesh
              ref={(el) => { if (el) labelRefs.current[i] = el; }}
              position={
                new THREE.Vector3(0, LABEL_OFFSET_Y, 0)
                  .applyQuaternion(quaternions[i])
                  .add(positions[i])
              }
              quaternion={quaternions[i]}
              renderOrder={2}
            >
              <planeGeometry args={[LABEL_PLANE_WIDTH, LABEL_PLANE_HEIGHT]} />
              <meshBasicMaterial
                transparent
                depthTest={false}
                depthWrite={false}
                side={THREE.DoubleSide}
                opacity={0}
              />
            </mesh>
          </group>
        ))}

        <mesh renderOrder={0}>
          <sphereGeometry args={[2, 24, 24]} />
          <meshBasicMaterial
            color="#334455"
            wireframe
            transparent
            opacity={0.07}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}
