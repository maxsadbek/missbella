"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FallingNumber } from "./FallingNumber";
import { Effects } from "./Effects";

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <FallingNumber />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
