// src/components/MiddlePannel/ChatContainer.tsx   ← FINAL. WORKS. NO ERRORS.
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; text: string };

type Props = {
  messages: Message[];
  isThinking?: boolean;
};

export default function ChatContainer({ messages = [], isThinking = false }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const displayMessages = messages.length > 0
    ? messages
    : [{ role: "assistant" as const, text: "Hey! I’m kAI — your cosmic assistant. What’s good today?" }];

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        className="absolute inset-0 overflow-y-auto px-8 pt-10 pb-44"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="max-w-4xl mx-auto space-y-10">
          {displayMessages.map((msg, i) => {
            const isUser = msg.role === "user";

            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`
                    relative max-w-lg px-8 py-6 rounded-3xl text-2xl font-medium leading-snug
                    shadow-2xl backdrop-blur-xl border border-white/10
                    ${isUser
                      ? "bg-gradient-to-l from-cyan-500/60 to-blue-600/60 rounded-br-none"
                      : "bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-bl-none"
                    }
                  `}
                >
                  <ReactMarkdown
                    components={{
                      a: (props) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline" />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })}

          {/* Simple "thinking" text instead of dots */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="px-8 py-6 rounded-3xl rounded-bl-none bg-white/10 backdrop-blur-xl border border-white/10">
                <span className="text-gray-300">kAI is thinking</span>
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}