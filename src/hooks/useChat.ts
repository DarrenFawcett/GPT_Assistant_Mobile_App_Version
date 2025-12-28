// src/hooks/useChat.ts
import { useState } from "react";
import type { KaiOrbMode } from "../components/BottomPannel/KaiOrb";

type Message = {
  role: "user" | "assistant";
  text: string;
};

type ChatState = {
  intent?: string;
  awaiting?: "scope" | null;
  scope?: "calendar" | null;
};

export function useChat(apiUrl: string) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! I’m kAI — your cosmic assistant. What’s good today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [mode, setMode] = useState<KaiOrbMode>("idle");
  const [state, setState] = useState<ChatState>({});
  const [isSending, setIsSending] = useState(false); // ✅ THIS IS THE KEY

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    setIsSending(true);      // ✅ START DOTS
    setMode("text");         // orb stays calm

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, state }),
      });

      const data = await res.json();

      if (data.new_state) setState(data.new_state);
      if (data.clear_state) setState({});

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setIsSending(false);   // ✅ STOP DOTS (ONLY HERE)
      setMode("idle");
    }
  };

  return {
    messages,
    input,
    setInput,
    mode,
    setMode,
    sendMessage,
    isSending,               // ✅ EXPOSE THIS
  };
}
