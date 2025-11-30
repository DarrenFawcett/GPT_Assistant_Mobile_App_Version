// src/middle/ThinkingDots.tsx
export default function ThinkingDots() {
  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.15}s`,
            boxShadow: "0 0 12px rgba(34, 211, 238, 0.8)",
          }}
        />
      ))}
      <span className="ml-3 text-gray-400 text-sm">kAI is thinking...</span>
    </div>
  );
}