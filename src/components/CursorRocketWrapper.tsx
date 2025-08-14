"use client";

import CursorRocket from "./CursorRocket";
import { useRocket } from "../contexts/RocketContext";

export default function CursorRocketWrapper() {
  const { isRocketEnabled } = useRocket();

  return <CursorRocket size={40} repelParticles enabled={isRocketEnabled} />;
}
