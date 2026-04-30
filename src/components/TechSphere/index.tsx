"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SphereScene } from "./SphereScene";

interface TechSphereProps {
  className?: string;
}

export function TechSphere({ className }: TechSphereProps) {
  return (
    <div className={className ?? "w-full h-[460px]"}>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <SphereScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default TechSphere;
