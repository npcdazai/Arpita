"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { useStored } from "@/lib/storage";

function diffTo(date) {
  const diff = date - new Date();
  return {
    days: Math.floor(diff / 86400000),
    hrs: Math.floor(diff / 3600000) % 24,
    mins: Math.floor(diff / 60000) % 60,
    secs: Math.floor(diff / 1000) % 60,
  };
}

function fireConfetti() {
  const end = Date.now() + 1200;
  const colors = ["#ff8fb1", "#e75a86", "#b79cff", "#9be3c9", "#ffd166"];
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export default function Birthday() {
  const [year, setYear] = useStored("birthYear", "2003");
  const [t, setT] = useState(diffTo(nextBday()));

  function nextBday() {
    const now = new Date();
    const isToday = now.getDate() === 30 && now.getMonth() === 2;
    let b = new Date(now.getFullYear(), 2, 30);
    if (now > b && !isToday) b = new Date(now.getFullYear() + 1, 2, 30);
    return b;
  }

  useEffect(() => {
    const id = setInterval(() => setT(diffTo(nextBday())), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const isToday = now.getDate() === 30 && now.getMonth() === 2;
  const turning = year ? `, turning ${(isToday ? now.getFullYear() : nextBday().getFullYear()) - +year}` : "";

  useEffect(() => {
    if (isToday) fireConfetti();
  }, [isToday]);

  const Box = ({ n, l }) => (
    <div className="bg-gradient-to-b from-pink to-pink-deep text-white rounded-2xl px-5 py-4 min-w-[84px] text-center">
      <b className="block text-3xl">{n}</b>
      <small className="text-[0.7rem] opacity-90 uppercase tracking-widest">{l}</small>
    </div>
  );

  return (
    <motion.div
      className="card text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.img
        src="/kuromiFaces/kuromi-shy.png"
        alt="Kuromi"
        animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={`mx-auto object-contain drop-shadow-lg ${isToday ? "w-48 h-48" : "w-28 h-28"}`}
      />

      <h2 className="text-pink-deep text-2xl font-cute mb-1">🎉 Birthday Countdown</h2>
      <p className="text-[#a06a7e]">
        Sherya&apos;s Birthday — <b>30 March</b> 🎂
      </p>

      {isToday ? (
        <p className="text-pink-deep font-semibold text-lg mt-4">
          Happy Birthday Sherya{turning}!! 🥳💕 Hope your day is as wonderful as you are.
        </p>
      ) : (
        <>
          <div className="flex gap-3 justify-center flex-wrap mt-3">
            <Box n={t.days} l="Days" />
            <Box n={t.hrs} l="Hours" />
            <Box n={t.mins} l="Mins" />
            <Box n={t.secs} l="Secs" />
          </div>
          <p className="text-[0.8rem] text-[#b58aa0] mt-3">
            Counting down to your special day{turning} 💖
          </p>
        </>
      )}

      <div className="max-w-[360px] mx-auto mt-4 text-left">
        <label className="lbl">Your birth year (optional, to show age)</label>
        <input
          type="number"
          className="field"
          placeholder="e.g. 2000"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          onBlur={() => year && toast.success("Saved 💕")}
        />
      </div>

      <button
        className="btn mt-4"
        onClick={() => {
          fireConfetti();
          toast("Yay! 🎊", { icon: "🎉" });
        }}
      >
        🎊 Celebrate!
      </button>
    </motion.div>
  );
}
