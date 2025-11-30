// src/components/Header.tsx — FINAL: GOOGLE SANS FLEX + YOUR EXACT LAYOUT
export function Header() {
  return (
    <div className="h-[20vh] flex items-center justify-center bg-transparent px-6">
      <div className="flex items-center gap-4">
        {/* ICON — RAW */}
        <img
          src="/images/gpt-icon-brain.png"
          alt="kAI"
          className="w-28 h-28 mb-4 object-contain"
        />

        {/* TEXT — GOOGLE SANS FLEX */}
        <div style={{ fontFamily: "'Google Sans Flex'" }}>
          <h1 className="text-5xl md:text-5xl font-black text-white tracking-tight leading-none">
            kAI — Your AI Assistant
          </h1>
          <p className="text-lg md:text-2xl text-cyan-400 font-medium mt-1">
            Chat smarter • Stay organized • Get things done • Get your time back
          </p>
        </div>
      </div>
    </div>
  );
}