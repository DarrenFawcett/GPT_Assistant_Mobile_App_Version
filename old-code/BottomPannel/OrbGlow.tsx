// src/components/OrbGlow.tsx
import { KaiOrbMode } from './KaiOrb';

type OrbGlowProps = {
  mode: KaiOrbMode;
};

export function OrbGlow({ mode }: OrbGlowProps) {
  const isListening = mode === 'listening';

  return (
    <div className='absolute w-[32rem] h-[32rem] -top-32 left-1/2 -translate-x-1/2 pointer-events-none'>
      <div
        className='absolute inset-0 rounded-full transition-all ease-out'
        style={{
          // Fade-out = 1 second of pure luxury when you release
          transitionDuration: isListening ? '1200ms' : '1000ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',

          background: isListening
            ? 'radial-gradient(circle at center, rgba(168,85,247,0.38), rgba(34,211,238,0.32), transparent 68%)'
            : 'radial-gradient(circle at center, rgba(168,85,247,0.11), rgba(34,211,238,0.07), transparent 75%)',

          opacity: isListening ? 1 : 0.45,
          transform: isListening ? 'scale(1.32)' : 'scale(1.05)',

          filter: 'blur(108px)',

          animation: isListening ? 'pulse 3.8s ease-in-out infinite' : 'none',
        }}
      />
    </div>
  );
}
