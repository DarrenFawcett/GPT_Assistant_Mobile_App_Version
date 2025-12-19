// src/hooks/useChat.ts
import { useState } from "react";
import type { KaiOrbMode } from "../components/BottomPannel/KaiOrb";

type Message = {
  role: "user" | "assistant";
  text: string;
  image?: string;
  file?: File;
};

export function useChat(
  apiUrl: string,
  getToken: () => string | undefined
) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! I’m kAI — your cosmic assistant. What’s good today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [mode, setMode] = useState<KaiOrbMode>("idle");

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userText = input.trim();

  setMessages((prev) => [...prev, { role: "user", text: userText }]);
  setInput("");
  setMode("text");

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ❌ NO Authorization header in dev
      },
      body: JSON.stringify({ message: userText }),
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.reply },
    ]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "⚠️ Something went wrong talking to the server.",
      },
    ]);
  } finally {
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
  };
}
