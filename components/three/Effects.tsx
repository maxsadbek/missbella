"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.2}
        mipmapBlur
        radius={0.75}
      />
      <Vignette offset={0.18} darkness={0.55} />
    </EffectComposer>
  );
}
