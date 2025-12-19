// src/components/BottomPannel/GalleryIcon.tsx
import { useRef } from "react";

export function GalleryIcon({ onImage }: { onImage: (file: File) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const openGallery = () => {
        inputRef.current?.click();
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onImage(file);
    };

    return (
        <>
            <button onClick={openGallery} className="hover:scale-110 transition">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="2" />
                    <path d="M21 15l-5-5-5 5" />
                    <path d="M3 15h12" />
                </svg>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
            />
        </>
    );
}