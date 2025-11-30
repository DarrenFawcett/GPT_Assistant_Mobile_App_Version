// src/middle/InputBarPlaceholder.tsx
import { useState } from "react";

export default function InputBarPlaceholder({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask anything..."
        className="w-full px-6 py-4 pr-16 text-lg bg-white/10 border border-white/20 rounded-full backdrop-blur-xl focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-110 transition-transform"
      >
        Send
      </button>
    </form>
  );
}