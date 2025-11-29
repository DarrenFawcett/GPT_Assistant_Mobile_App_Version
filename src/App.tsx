// src/App.tsx — FINAL LAYOUT: TOP 20%, MIDDLE CHAT, BOTTOM 25% WITH CONTROLS
import { useState } from "react";
import BottomControls from "./components/BottomPannel/BottomControls";
import type { KaiOrbMode } from "./components/BottomPannel/KaiOrb";

export default function App() {
  const [mode, setMode] = useState<KaiOrbMode>("idle");
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("SENT:", input);
    setInput("");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-black">

      {/* TOP — 20% */}
      <div className="h-[12vh] bg-gradient-to-b from-purple-900/30 to-transparent border-b-8 border-purple-500 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">TOP (12%)</h1>
      </div>

      {/* MIDDLE — CHAT AREA */}
      <div className="flex-1 bg-gradient-to-b from-blue-950/30 to-black border-x-8 border-x-cyan-500 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">MIDDLE (CHAT)</h1>
      </div>

      {/* BOTTOM — 25% — WITH YOUR ORB + INPUT */}
      <div className="h-[28vh] border-t-8 border-t-green-500 relative bg-black/50">
        <BottomControls
          mode={mode}
          setMode={setMode}
          inputValue={input}
          setInputValue={setInput}
          onSend={handleSend}
        />
      </div>

    </div>
  );
}