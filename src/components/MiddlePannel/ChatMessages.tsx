// src/middle/ChatMessages.tsx
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import GreetingBubble from "./GreetingBubble";
import ThinkingDots from "./ThinkingDots";

export default function ChatMessages({
  messages = [],
  isThinking = false,
}: {
  messages: { role: "user" | "assistant"; text: string }[];
  isThinking?: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col gap-5 pb-8">
      {!hasMessages && <GreetingBubble />}

      {messages.map((m, i) => {
        const isUser = m.role === "user";
        return (
          <div
            key={i}
            className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
          >
            <div
              className={`
                px-5 py-3 rounded-2xl border shadow-lg max-w-[85%]
                backdrop-blur-xl
                ${isUser
                  ? "bg-sky-600/20 border-sky-500/40 text-sky-100 rounded-br-none"
                  : "bg-white/10 border-white/20 text-gray-100 rounded-bl-none"
                }
              `}
            >
              <ReactMarkdown
                components={{
                  a: ({ ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300" />
                  ),
                }}
              >
                {m.text}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}

      {isThinking && (
        <div className="flex justify-start">
          <div className="px-5 py-3 rounded-2xl rounded-bl-none bg-white/10 border border-white/20 backdrop-blur-xl">
            <ThinkingDots />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}