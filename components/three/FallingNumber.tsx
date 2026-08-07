"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Grid,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { clamp, smoothstep } from "@/lib/utils";

const FLOOR_Y = -2.35;
const FALL_DIST = 2.3;
const COUNT = 500;

let cachedTotal = -1;
function getProgress() {
  if (typeof window === "undefined") return 0;
  const el = document.getElementById("hero-scroll");
  if (!el) return 0;
  if (cachedTotal < 0) {
    cachedTotal = el.offsetHeight - window.innerHeight;
  }
  if (cachedTotal <= 0) return 0;
  return clamp(-el.getBoundingClientRect().top / cachedTotal, 0, 1);
}

// Invalidate the cached scroll range when the window is resized.
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    cachedTotal = -1;
  });
}

export function FallingNumber() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Points>(null);
  const bookCoverLeft = useRef<THREE.Mesh>(null);
  const bookCoverRight = useRef<THREE.Mesh>(null);
  const bookPagesLeft = useRef<THREE.Mesh>(null);
  const bookPagesRight = useRef<THREE.Mesh>(null);

  // --- particle buffers ---
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) arr[i * 3 + 1] = -999;
    return arr;
  }, []);
  const velocities = useMemo(() => new Float32Array(COUNT * 3), []);
  const life = useMemo(() => new Float32Array(COUNT), []);

  useFrame((state, delta) => {
    const p = getProgress();
    const t = state.clock.elapsedTime;

    // -------- book physics (scroll driven, eased + bounce) --------
    const fall = smoothstep(0.1, 0.58, p);
    const drop = Math.pow(fall, 1.65) * FALL_DIST;

    const bounceP = smoothstep(0.6, 0.72, p);
    const bounce = Math.sin(bounceP * Math.PI) * 0.5 * (1 - bounceP * 0.45);

    const settle = smoothstep(0.62, 0.82, p);
    const idle = Math.sin(t * 0.9) * 0.12 * (1 - fall);
    const y = -drop + bounce + idle;

    // gentle rotation while falling, then settle
    const untwist = 1 - smoothstep(0.62, 0.8, p);
    const rotX = fall * 1.5 * untwist + Math.sin(p * 20) * 0.08 * fall;
    const rotZ = Math.sin(p * 15) * 0.1 * fall + Math.sin(t * 0.4) * 0.025;
    const rotY = Math.sin(p * 10) * 0.15 * fall + Math.sin(t * 0.45) * 0.08;

    // subtle page animation
    const pageWave = Math.sin(t * 2) * 0.02 * (1 - fall);

    // squash on impact + shrink slightly as it rests
    const squash = Math.sin(bounceP * Math.PI) * 0.12;
    const restScale = 1 - 0.2 * settle;

    if (group.current) {
      group.current.position.y = y;
      group.current.rotation.set(rotX, rotZ, rotY);
      group.current.scale.set(
        (1 + squash) * restScale,
        (1 - squash * 1.2) * restScale,
        (1 + squash) * restScale
      );
    }

    // Animate book covers slightly for page wave effect
    if (bookCoverLeft.current && bookCoverRight.current) {
      bookCoverLeft.current.rotation.z = pageWave;
      bookCoverRight.current.rotation.z = -pageWave;
    }

    if (ring.current) {
      ring.current.rotation.z += delta * 0.5;
      ring.current.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.08;
    }

    // -------- camera parallax --------
    const cam = state.camera;
    cam.position.x += ((state.pointer.x ?? 0) * 0.35 - cam.position.x) * 0.045;
    cam.position.y += ((state.pointer.y ?? 0) * 0.22 - cam.position.y) * 0.045;
    cam.lookAt(0, 0, 0);

    // -------- particle trail --------
    const pts = points.current;
    if (!pts) return;
    const attr = pts.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const spawning = p > 0.12 && p < 0.72;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      if (life[i] > 0) {
        life[i] -= delta;
        arr[i3] += velocities[i3] * delta;
        arr[i3 + 1] += velocities[i3 + 1] * delta;
        arr[i3 + 2] += velocities[i3 + 2] * delta;
        if (life[i] <= 0) arr[i3 + 1] = -999;
      } else if (spawning && Math.random() < 0.5) {
        const yy = -drop + bounce;
        arr[i3] = (Math.random() - 0.5) * 2.6;
        arr[i3 + 1] = yy + (Math.random() - 0.5) * 1.9;
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
      <group>
        <group ref={group}>
          {/* Premium 3D Open Book */}
          <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
            {/* Left Cover - Frosted Glass */}
            <mesh ref={bookCoverLeft} position={[-0.7, 0, 0.05]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.8, 1.1, 0.08]} />
              <meshPhysicalMaterial
                color="#a9cdff"
                metalness={0.3}
                roughness={0.1}
                transmission={0.85}
                thickness={0.5}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0.05}
                envMapIntensity={1.5}
              />
            </mesh>

            {/* Right Cover - Frosted Glass */}
            <mesh ref={bookCoverRight} position={[0.7, 0, 0.05]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.8, 1.1, 0.08]} />
              <meshPhysicalMaterial
                color="#a9cdff"
                metalness={0.3}
                roughness={0.1}
                transmission={0.85}
                thickness={0.5}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0.05}
                envMapIntensity={1.5}
              />
            </mesh>

            {/* Left Pages - Electric Blue Glowing */}
            <mesh ref={bookPagesLeft} position={[-0.65, 0, 0]}>
              <boxGeometry args={[0.7, 1.0, 0.12]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.1}
                roughness={0.8}
                emissive="#0a84ff"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Right Pages - Electric Blue Glowing */}
            <mesh ref={bookPagesRight} position={[0.65, 0, 0]}>
              <boxGeometry args={[0.7, 1.0, 0.12]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.1}
                roughness={0.8}
                emissive="#0a84ff"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Book Spine */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.15, 1.1, 0.2]} />
              <meshPhysicalMaterial
                color="#1a3a5f"
                metalness={0.5}
                roughness={0.3}
                clearcoat={0.5}
                clearcoatRoughness={0.2}
              />
            </mesh>
          </group>

          <mesh ref={ring} position={[0, 0, -0.9]}>
            <torusGeometry args={[2.15, 0.028, 12, 110]} />
            <meshBasicMaterial color="#2f9bff" transparent opacity={0.5} />
          </mesh>
        </group>

        {/* landing floor */}
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
      </group>

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

      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={7}
          position={[0, 5, -4]}
          scale={[8, 4, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={5}
          position={[-5, 0, -2]}
          rotation-y={Math.PI / 2}
          scale={[10, 4, 1]}
          color="#0A84FF"
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[5, 1, -1]}
          rotation-y={-Math.PI / 2}
          scale={[8, 5, 1]}
          color="#6FB4FF"
        />
        <Lightformer
          form="circle"
          intensity={9}
          position={[0, 0, 5]}
          scale={3.5}
          color="#ffffff"
        />
      </Environment>
    </>
  );
}
