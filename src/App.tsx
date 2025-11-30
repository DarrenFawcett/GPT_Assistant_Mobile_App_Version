// src/App.tsx
import { useState } from "react";
import BottomControls from "./components/BottomPannel/BottomControls";
import type { KaiOrbMode } from "./components/BottomPannel/KaiOrb";
import { Header } from "./components/HeaderPannel/Header";
import ChatContainer from "./components/MiddlePannel/ChatContainer";

export default function App() {
  const [mode, setMode] = useState<KaiOrbMode>("idle");
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("SENT:", input);
    setInput("");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">

      {/* TOP 12% */}
      <div className="h-[12vh] bg-gradient-to-b from-purple-900/30 to-transparent border-b-8 border-purple-500 flex items-center justify-center">
        <Header />
      </div>

      {/* MIDDLE — CHAT */}
      <ChatContainer 
        messages={[
          { role: "assistant", text: "Hey! I’m kAI — your cosmic assistant. What’s good today?" },
          { role: "user", text: "Set reminder: call Mom at 3pm" },
          { role: "assistant", text: "Done. Reminder locked in for 3:00 PM — “Call Mom”. I’ll ping you at 2:55" },
          { role: "user", text: "You’re a legend" },
          { role: "assistant", text: "Hey! I’m kAI — your cosmic assistant. What’s good today?" },
          { role: "user", text: "Set reminder: call Mom at 3pm" },
          { role: "assistant", text: "Done. Reminder locked in for 3:00 PM — “Call Mom”. I’ll ping you at 2:55" },
          { role: "user", text: "You’re a legend" },
          { role: "user", text: "You’re a legend" },
          { role: "assistant", text: "Hey! I’m kAI — your cosmic assistant. What’s good today?" },
          { role: "user", text: "Set reminder: call Mom at 3pm" },
          { role: "assistant", text: "Done. Reminder locked in for 3:00 PM — “Call Mom”. I’ll ping you at 2:55" },
          { role: "user", text: "You’re a legend" },
        ]}
        isThinking={false}
      />

      {/* BOTTOM 28% */}
      <div className="h-[28vh]  relative bg-black/50">
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