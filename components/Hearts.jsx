"use client";
import { useMemo } from "react";

const EMOJI = ["💗", "💕", "🌸", "💖", "🌷", "✨"];

export default function Hearts() {
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        e: EMOJI[i % EMOJI.length],
        left: Math.random() * 100,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * 10,
        size: 14 + Math.random() * 22,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px] animate-floaty opacity-50"
          style={{
            left: `${it.left}%`,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
            fontSize: `${it.size}px`,
          }}
        >
          {it.e}
        </span>
      ))}
    </div>
  );
}
