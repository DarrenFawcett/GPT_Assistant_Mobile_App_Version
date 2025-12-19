// src/components/BottomPannel/CameraIcon.tsx
import { useRef } from "react";

export function CameraIcon({ onImage }: { onImage: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openCamera = () => {
    inputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImage(file);
  };

  return (
    <>
      <button onClick={openCamera} className="hover:scale-110 transition">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
          <path d="M14.5 5h-5l-1.5-3h-3l-1.5 3H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3l-1.5-3z" />
          <circle cx="12" cy="14" r="4" fill="#a855f7" opacity="0.8" />
        </svg>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"   // ← THIS OPENS CAMERA ON MOBILE
        className="hidden"
        onChange={handleFile}
      />
    </>
  );
}