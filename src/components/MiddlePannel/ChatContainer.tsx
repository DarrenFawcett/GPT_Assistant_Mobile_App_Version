// src/components/MiddlePannel/ChatContainer.tsx — FINAL. NO MORE FALLBACK.
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { TypingDots } from "./TypingDots";

type Message = { role: "user" | "assistant"; text: string; image?: string; file?: File };
type Props = { messages: Message[]; isThinking?: boolean };

export default function ChatContainer({ messages = [], isThinking = false }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // THIS IS THE KEY: NO FALLBACK — SHOW REAL MESSAGES
  const displayMessages = messages;

  return (
    <div className="px-12 pt-10 pb-96">
      <div className="max-w-4xl mx-auto space-y-10">
        {displayMessages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div key={i} className={isUser ? "flex justify-end" : "flex justify-start"}>
              <div className={`relative max-w-lg px-8 py-6 rounded-3xl text-3xl font-medium leading-snug
                shadow-2xl backdrop-blur-xl border border-white/10
                ${isUser
                  ? "bg-gradient-to-l from-cyan-500/60 to-blue-600/60 rounded-br-none"
                  : "bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-bl-none"
                }`}>
                {msg.image && <img src={msg.image} alt="user" className="w-full rounded-2xl mb-4" />}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex justify-start pl-6">
            <TypingDots color="#af27b2ff" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}