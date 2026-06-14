"use client";
import { useEffect } from "react";

// A gentle sparkle/heart trail that follows the cursor
export default function Sparkles() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch devices
    const chars = ["✨", "💗", "🌸", "💕", "⭐"];
    let last = 0;

    function spawn(x, y) {
      const s = document.createElement("span");
      s.textContent = chars[(Math.random() * chars.length) | 0];
      s.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;font-size:${
        10 + Math.random() * 12
      }px;transform:translate(-50%,-50%);transition:transform .8s ease,opacity .8s ease;opacity:1;`;
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(-50%,-50%) translate(${-15 + Math.random() * 30}px, ${
          20 + Math.random() * 25
        }px) scale(.3) rotate(${-60 + Math.random() * 120}deg)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 850);
    }

    function move(e) {
      const now = Date.now();
      if (now - last < 55) return;
      last = now;
      spawn(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return null;
}
