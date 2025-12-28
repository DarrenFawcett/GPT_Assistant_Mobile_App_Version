// src/components/BottomPannel/KaiOrb.tsx — FINAL. FOREVER.
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

  const handleDown = () => {
    wasLongPress.current = false;

    holdTimer.current = setTimeout(() => {
      wasLongPress.current = true;
      onPressStart(); // 🔥 mic starts ONLY after hold delay
    }, HOLD_DELAY);
  };


  const handleUp = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);

    if (!wasLongPress.current) {
      // TAP
      onTap?.();
    } else {
      // HOLD finished
      onPressEnd();
    }

    wasLongPress.current = false;
  };



  const handleLeaveOrCancel = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }

    // Finger slipped off orb? Still stop everything
    onPressEnd();
    wasLongPress.current = false;
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // HALO PULSE
    if (haloRef.current) {
      const targetScale = mode === 'sending' ? 2.8 : mode === 'listening' ? 1.9 : 1.45;
      haloRef.current.scale.setScalar(
        THREE.MathUtils.lerp(haloRef.current.scale.x, targetScale, 0.2)
      );
      (haloRef.current.material as any).opacity = THREE.MathUtils.lerp(
        (haloRef.current.material as any).opacity,
        mode === 'sending' ? 0.9 : mode === 'listening' ? 0.6 : 0.22,
        0.18
      );
    }

    // CORE BREATHE
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.004;
      const breatheScale =
        mode === 'listening'
          ? 1 + Math.sin(t * 4) * 0.07
          : mode === 'sending'
          ? 1.38 + Math.sin(t * 22) * 0.2
          : 1 + Math.sin(t * 1.3) * 0.045;

      coreRef.current.scale.setScalar(
        THREE.MathUtils.lerp(coreRef.current.scale.x, breatheScale, 0.24)
      );
    }

    // MATERIAL — COLD CYAN STEEL GOD MODE
    if (matRef.current) {
      const m = matRef.current;
      m.color.set('#2d3748');
      m.emissive.set('#0891b2');
      m.metalness = mode === 'listening' ? 0.72 : mode === 'sending' ? 0.88 : 0.58;
      m.roughness = mode === 'listening' ? 0.10 : mode === 'sending' ? 0.04 : 0.16;
      m.distort = mode === 'listening' ? 0.44 : mode === 'sending' ? 0.54 : 0.20;

      if (mode === 'idle' || mode === 'text') {
        const pulse = Math.sin(t * 1.2) * 0.15 + 0.85;
        m.emissiveIntensity = 0.85 + pulse * 0.25;
      }

      if (mode === 'listening') {
        const pulse = (Math.sin(t * 3.4) + 1) / 2;
        m.emissiveIntensity = 2.8 + pulse * 1.6;
      }

      if (mode === 'sending') {
        const flash = (Math.sin(t * 38) + 1) / 2;
        m.emissive.set(flash > 0.7 ? '#ffffff' : '#0891b2');
        m.emissiveIntensity = 14 + flash * 24;
      }
    }
  });

  return (
    <>
      {/* Halo Glow */}
      <Sphere ref={haloRef} args={[1.6, 128, 128]}>
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main Orb */}
      <Sphere
        ref={coreRef}
        args={[1.8, 256, 256]}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerLeave={handleLeaveOrCancel}
        onPointerCancel={handleLeaveOrCancel}
        onPointerMove={(e) => e.stopPropagation()} // prevents parent canvas drag
      >
        <MeshDistortMaterial
          ref={matRef}
          color="#2d3748"
          emissive="#0891b2"
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