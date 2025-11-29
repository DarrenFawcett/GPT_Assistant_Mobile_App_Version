// src/components/KaiOrb.tsx — FINAL. NO MORE TOUCHING. EVER.
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export type KaiOrbMode = 'idle' | 'text' | 'listening' | 'sending';

type KaiOrbProps = {
  mode: KaiOrbMode;
  onPressStart: () => void;
  onPressEnd: () => void;
  onTap?: () => void;
};

export function KaiOrb({ mode, onPressStart, onPressEnd, onTap }: KaiOrbProps) {
  const haloRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const wasLongPress = useRef(false);

  const HOLD_DELAY = 150;

  // src/components/KaiOrb.tsx — FINAL + CLEAN DEBUG LOGS
const handleDown = () => {
  wasLongPress.current = false;

  holdTimer.current = setTimeout(() => {
    wasLongPress.current = true;
    console.log('Orb: LONG HOLD → LISTENING MODE ACTIVATED');
    onPressStart();
  }, HOLD_DELAY);
};

const handleUp = () => {
  if (holdTimer.current) clearTimeout(holdTimer.current);

  if (!wasLongPress.current) {
    console.log('Orb: QUICK TAP → SENDING');
    onTap?.();
  } else {
    console.log('Orb: Hold released → back to idle');
  }

  onPressEnd();
};

const handleLeave = () => {
  if (holdTimer.current) {
    clearTimeout(holdTimer.current);
  }
  onPressEnd();
};
  useEffect(() => () => holdTimer.current && clearTimeout(holdTimer.current), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // HALO
    if (haloRef.current) {
      const target = mode === 'sending' ? 2.8 : mode === 'listening' ? 1.9 : 1.45;
      haloRef.current.scale.setScalar(THREE.MathUtils.lerp(haloRef.current.scale.x, target, 0.2));
      (haloRef.current.material as any).opacity = THREE.MathUtils.lerp(
        (haloRef.current.material as any).opacity,
        mode === 'sending' ? 0.9 : mode === 'listening' ? 0.6 : 0.22,
        0.18
      );
    }

    // CORE BREATHING
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.004;
      const breathe = mode === 'listening'
        ? 1 + Math.sin(t * 4) * 0.07
        : mode === 'sending'
        ? 1.38 + Math.sin(t * 22) * 0.2
        : 1 + Math.sin(t * 1.3) * 0.045;
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, breathe, 0.24));
    }

    // MATERIAL — COLD METALLIC STEEL PERFECTION
    if (matRef.current) {
      const m = matRef.current;

      m.color.set('#2d3748');           // cold chrome-steel base
      m.emissive.set('#0891b2');        // deep cyan glow (no baby blue)
      m.emissiveIntensity = mode === 'listening' ? 3.4 : mode === 'sending' ? 18 : 0.95;
      m.metalness = mode === 'listening' ? 0.72 : mode === 'sending' ? 0.88 : 0.58;
      m.roughness = mode === 'listening' ? 0.10 : mode === 'sending' ? 0.04 : 0.16;
      m.distort = mode === 'listening' ? 0.44 : mode === 'sending' ? 0.54 : 0.20;

      // Subtle idle life
      if (mode === 'idle' || mode === 'text') {
        const idlePulse = Math.sin(t * 1.2) * 0.15 + 0.85;
        m.emissiveIntensity = 0.85 + idlePulse * 0.25;
      }

      // Listening pulse
      if (mode === 'listening') {
        const pulse = (Math.sin(t * 3.4) + 1) / 2;
        m.emissiveIntensity = 2.8 + pulse * 1.6;
      }

      // Sending flash
      if (mode === 'sending') {
        const flash = (Math.sin(t * 38) + 1) / 2;
        m.emissive.set(flash > 0.7 ? '#ffffff' : '#0891b2');
        m.emissiveIntensity = 14 + flash * 24;
      }
    }
  });

  return (
    <>
      <Sphere ref={haloRef} args={[1.6, 128, 128]}>
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      <Sphere
        ref={coreRef}
        args={[1.8, 256, 256]}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerLeave={handleLeave}
        onPointerCancel={handleLeave}
      >
        <MeshDistortMaterial
          ref={matRef}
          color="#2d3748"            // cold metallic steel
          emissive="#0891b2"         // deep cyan (zero baby blue)
          emissiveIntensity={0.95}
          roughness={0.16}
          metalness={0.58}
          distort={0.20}
          speed={1.9}
          transmission={0.96}
          thickness={5}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={3.2}
        />
      </Sphere>
    </>
  );
}