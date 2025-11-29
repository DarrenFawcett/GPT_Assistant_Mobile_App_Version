// src/components/VoiceWaveform.tsx — FINAL UPGRADED VERSION (ABOVE ORB)
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type VoiceWaveformProps = {
  isListening: boolean;
  volume?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export function VoiceWaveform({ 
  isListening, 
  volume = 0.6,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1]
}: VoiceWaveformProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const shader = {
    uniforms: {
      time: { value: 0 },
      volume: { value: 0 },
      opacity: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float volume;
      uniform float opacity;
      varying vec2 vUv;

      void main() {
        // Multi-layered flowing waves
        float wave1 = sin(vUv.x * 18.0 - time * 3.8 + 1.0) * 0.12;
        float wave2 = sin(vUv.x * 35.0 - time * 5.5 + 2.0) * 0.06;
        float wave3 = sin(vUv.x * 60.0 - time * 8.0 + 4.0) * 0.03;

        float wave = wave1 + wave2 + wave3;
        float center = 0.5 + wave * volume * 1.4;
        float dist = abs(vUv.y - center);

        // Sharp glow core + soft falloff
        float glow = exp(-dist * 12.0) * 1.2;
        glow += exp(-dist * 4.0) * 0.4;

        vec3 cyan = vec3(0.07, 0.83, 0.93); // #22d3ee
        vec3 purple = vec3(0.66, 0.31, 0.98); // subtle purple tint
        vec3 color = mix(cyan, purple, sin(time + vUv.x * 10.0) * 0.15 + 0.15);

        float alpha = glow * opacity * volume * 1.3;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  };

  useFrame((state) => {
    if (!materialRef.current) return;

    const targetVolume = isListening ? volume : 0;
    const targetOpacity = isListening ? 1.0 : 0.0;

    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.volume.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.volume.value,
      targetVolume,
      0.18
    );
    materialRef.current.uniforms.opacity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.opacity.value,
      targetOpacity,
      0.14
    );
  });

  // Don't render if fully faded out
  if (!isListening && materialRef.current?.uniforms.opacity.value < 0.01) return null;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[16, 4.5, 160, 40]} />
      <shaderMaterial
        ref={materialRef}
        args={[shader]}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}