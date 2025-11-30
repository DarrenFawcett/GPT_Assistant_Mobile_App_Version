// src/middle/GreetingBubble.tsx
export default function GreetingBubble() {
  return (
    <div className="text-center animate-in fade-in zoom-in-95 duration-1000">
      <div className="inline-block px-10 py-8 rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-400/40 backdrop-blur-2xl shadow-2xl">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          kAI
        </h1>
        <p className="mt-5 text-lg text-gray-200 leading-relaxed">
          Hi! I’m kAI — here to help you<br />
          chat, plan, and stay organised.
        </p>
      </div>
    </div>
  );
}