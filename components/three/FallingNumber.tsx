"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

const FLOOR_Y = -2.35;
const COUNT = 500;

export function FallingNumber() {
  const ring = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Points>(null);

  // --- particle buffers ---
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) arr[i * 3 + 1] = -999;
    return arr;
  }, []);
  const velocities = useMemo(() => new Float32Array(COUNT * 3), []);
  const life = useMemo(() => new Float32Array(COUNT), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (ring.current) {
      ring.current.rotation.z += delta * 0.5;
      ring.current.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.08;
    }

    // -------- camera parallax --------
    const cam = state.camera;
    cam.position.x += ((state.pointer.x ?? 0) * 0.35 - cam.position.x) * 0.045;
    cam.position.y += ((state.pointer.y ?? 0) * 0.22 - cam.position.y) * 0.045;
    cam.lookAt(0, 0, 0);

    // -------- ambient rising particles --------
    const pts = points.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      if (life[i] > 0) {
        life[i] -= delta;
        arr[i3] += velocities[i3] * delta;
        arr[i3 + 1] += velocities[i3 + 1] * delta;
        arr[i3 + 2] += velocities[i3 + 2] * delta;
        if (life[i] <= 0) arr[i3 + 1] = -999;
      } else if (Math.random() < 0.5) {
        arr[i3] = (Math.random() - 0.5) * 2.6;
        arr[i3 + 1] = FLOOR_Y + Math.random() * 1.8;
        arr[i3 + 2] = (Math.random() - 0.5) * 1.5;
        velocities[i3] = (Math.random() - 0.5) * 0.7;
        velocities[i3 + 1] = 0.35 + Math.random() * 1.1;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.7;
        life[i] = 0.7 + Math.random() * 0.7;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <>
      <mesh ref={ring} position={[0, 0, -0.9]}>
        <torusGeometry args={[2.15, 0.028, 12, 110]} />
        <meshBasicMaterial color="#2f9bff" transparent opacity={0.5} />
      </mesh>

      {/* grid floor */}
      <Grid
        position={[0, FLOOR_Y, 0]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#14335f"
        sectionSize={2.5}
        sectionThickness={1.1}
        sectionColor="#0a84ff"
        fadeDistance={26}
        fadeStrength={1.6}
        infiniteGrid
      />

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#4da3ff"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </>
  );
}
