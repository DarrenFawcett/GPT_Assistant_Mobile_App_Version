// src/components/BottomPannel/BottomControls.tsx
import { Canvas } from "@react-three/fiber";
import { KaiOrb, KaiOrbMode } from "./KaiOrb";
import { CameraIcon } from "./CameraIcon";
import { GalleryIcon } from "./GalleryIcon";
import { VoiceWaveform } from "./VoiceWaveform";
import { OrbGlow } from "./OrbGlow";
import { useVoice } from "./useVoice";
import { useEffect } from "react";

type Props = {
  mode: KaiOrbMode;
  setMode: (m: KaiOrbMode) => void;
  onSend: () => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  onImageSelect: (file: File) => void;   // ← NEW PROP
};

export default function BottomControls({
  mode,
  setMode,
  onSend,
  inputValue,
  setInputValue,
  onImageSelect,                        // ← RECEIVE IMAGE FROM ICONS
}: Props) {
  const { isListening, transcript, startListening, stopListening } = useVoice();


  return (
    <div className="relative w-full h-full flex flex-col justify-end items-center pb-6 pointer-events-none">
      <OrbGlow mode={mode} />

      <div className="relative flex flex-col items-center pointer-events-auto z-10 gap-1">
        {/* INPUT + SUBTLE X */}
        <div className="relative w-[90vw] max-w-3xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            placeholder="Ask anything..."
            className="w-full bg-black/60 backdrop-blur-3xl rounded-full px-10 py-8 pr-16 text-white text-3xl placeholder-gray-500 shadow-2xl ring-4 ring-cyan-400/20 focus:outline-none focus:ring-cyan-400/60 transition-all duration-500"
            style={{
              boxShadow: `0 0 80px rgba(34, 211, 238, 0.3), 0 0 120px rgba(168, 85, 247, 0.2), inset 0 2px 20px rgba(255,255,255,0.05)`,
            }}
          />
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition opacity-70 hover:opacity-100"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ORB + CAMERA + GALLERY */}
        <div className="flex items-center gap-20">
          {/* CAMERA */}
          <CameraIcon onImage={onImageSelect} />

          {/* ORB */}
          <div className="w-72 h-72 rounded-full overflow-hidden">
            <Canvas camera={{ position: [0, 0, 8], fov: 42 }} gl={{ alpha: true, antialias: true }}>
              <ambientLight intensity={0.8} />
              <pointLight position={[0, 0, 10]} intensity={3} color="#0891b2" />
              <KaiOrb
                mode={mode}
                onPressStart={() => {
                  startListening();
                }}
                onPressEnd={() => {
                  stopListening();
                }}
                onTap={() => {
                  if (inputValue || transcript) {
                    onSend();
                  }
                }}
              />


              <VoiceWaveform isListening={isListening} position={[0, 1.0, 0]} />
            </Canvas>
          </div>

          {/* GALLERY */}
          <GalleryIcon onImage={onImageSelect} />
        </div>

        <p className="text-gray-300 font-medium text-lg tracking-widest">
          PRESS <span className="text-white font-bold">TO SEND</span> ·{" "}
          <span className="text-cyan-400 font-bold">HOLD FOR VOICE</span>
        </p>
      </div>
    </div>
  );
}