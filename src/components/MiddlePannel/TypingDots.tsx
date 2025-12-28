// TypingDots.tsx  ✅ DO NOT CHANGE
export function TypingDots({ color = "#fff" }: { color?: string }) {
  return (
    <div className="flex items-center space-x-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-6 h-6 rounded-full animate-bounce"
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}
