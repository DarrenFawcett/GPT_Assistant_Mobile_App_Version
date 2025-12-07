// src/App.tsx
import { useState } from "react";
import BottomControls from "./components/BottomPannel/BottomControls";
import type { KaiOrbMode } from "./components/BottomPannel/KaiOrb";
import { Header } from "./components/HeaderPannel/Header";
import ChatContainer from "./components/MiddlePannel/ChatContainer";

type Message = { role: "user" | "assistant"; text: string };

export default function App() {
  const [mode, setMode] = useState<KaiOrbMode>("idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hey! I’m kAI — your cosmic assistant. What’s good today?" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Add user message
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Clear input
    setInput("");

    // 3. Simulate assistant reply (remove this later when you connect real AI)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I'm alive! You said: " + userMsg.text },
      ]);
    }, 800);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">
      {/* HEADER */}
      <div className="h-[12vh] bg-gradient-to-b from-purple-900/30 to-transparent border-b-8 border-purple-500 flex items-center justify-center">
        <Header />
      </div>

      {/* CHAT — now passes real dynamic messages */}
      <ChatContainer messages={messages} isThinking={false} />

      {/* BOTTOM */}
      <div className="h-[28vh] relative bg-black/50">
        <BottomControls
          mode={mode}
          setMode={setMode}
          inputValue={input}
          setInputValue={setInput}
          onSend={handleSend}   // ← this now actually does something
        />
      </div>
    </div>
  );
}