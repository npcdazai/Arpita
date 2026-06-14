"use client";
import { useState, useEffect, useCallback } from "react";

// localStorage-backed state hook (safe for SSR)
export function useStored(key, initial) {
  const [value, setValue] = useState(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);

  return [value, setValue, ready];
}

// date helpers
export const today = () => new Date().toISOString().slice(0, 10);
export const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export const fmtShort = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
export const dayKey = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
};
