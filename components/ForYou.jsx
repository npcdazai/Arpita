"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, RefreshCw, Heart } from "lucide-react";

const NOTES = [
  "Your smile is my favourite notification 📱💕",
  "If I had a flower for every time I thought of you, I'd walk in a garden forever 🌷",
  "You make ordinary days feel like something worth remembering ✨",
  "Talking to you is the best part of my day, every single day 💬",
  "You're the plot twist I never saw coming and never want to end 📖",
  "Some people are sunshine — you're the whole sky 🌤️",
  "I like you more than coffee, and that's saying a lot ☕💗",
  "You're proof that good things really do exist 🍀",
  "My favourite place in the world is anywhere next to you 🗺️",
  "You + me = my favourite equation 🧮💞",
];

const COMPLIMENTS = [
  "effortlessly gorgeous",
  "ridiculously sweet",
  "dangerously charming",
  "impossibly cute",
  "absolutely radiant",
  "wonderfully kind",
  "breathtakingly lovely",
  "endlessly fascinating",
];

export default function ForYou() {
  const [note, setNote] = useState(0);
  const [comp, setComp] = useState(0);
  const [love, setLove] = useState(0);

  function nextNote() {
    setNote((n) => (n + 1) % NOTES.length);
  }
  function newCompliment() {
    setComp((c) => (c + 1) % COMPLIMENTS.length);
  }
  function pump() {
    const v = Math.min(love + 12 + Math.floor(Math.random() * 18), 100);
    setLove(v);
    if (v >= 100) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#ff8fb1", "#e75a86", "#b79cff"] });
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      {/* Love note card */}
      <div className="relative card overflow-hidden bg-gradient-to-br from-white to-[#fff0f6]">
        <div className="absolute -right-6 -top-6 text-[8rem] opacity-10 select-none">💌</div>
        <h2 className="text-pink-deep text-2xl font-cute mb-1 flex items-center gap-2">
          <Sparkles size={22} /> A little note for you
        </h2>
        <p className="text-[#a06a7e] mb-4">Tap the heart for another one 💗</p>

        <div className="min-h-[110px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={note}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="text-center text-xl font-cute text-pink-deep px-2 leading-relaxed"
            >
              {NOTES[note]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={nextNote}
            className="btn mx-auto"
          >
            <Heart size={18} className="fill-white" /> another note
          </motion.button>
        </div>
      </div>

      {/* Compliment generator */}
      <div className="card text-center">
        <h3 className="text-lav font-semibold mb-2">In case you forgot today…</h3>
        <p className="text-2xl text-ink">
          You are{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={comp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-cute text-pink-deep inline-block"
            >
              {COMPLIMENTS[comp]}
            </motion.span>
          </AnimatePresence>{" "}
          💕
        </p>
        <button onClick={newCompliment} className="btn !bg-lav mt-4">
          <RefreshCw size={16} /> tell me again
        </button>
      </div>

      {/* Love meter */}
      <div className="card text-center">
        <h3 className="text-lav font-semibold mb-1">How much do I like you?</h3>
        <p className="text-[#a06a7e] mb-3">Press the button and find out 😏</p>
        <motion.img
          key={love >= 100 ? "shy" : "angry"}
          src={love >= 100 ? "/kuromiFaces/kuromi-shy.png" : "/kuromiFaces/kuromi-angry.png"}
          alt="Kuromi"
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
          className="w-24 h-24 object-contain mx-auto mb-2 drop-shadow"
        />
        <div
          className={`relative h-7 rounded-full bg-pink-soft shadow-inner ${
            love >= 100 ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink to-pink-deep flex items-center justify-end pr-3 text-white text-xs font-bold"
            animate={
              love >= 100
                ? { width: "125%", scaleX: [1, 1.08, 1], boxShadow: "0 0 26px rgba(231,90,134,.75)" }
                : { width: `${love}%` }
            }
            transition={
              love >= 100
                ? { width: { type: "spring", stiffness: 140, damping: 9 }, scaleX: { repeat: Infinity, duration: 1.4 } }
                : { type: "spring", stiffness: 120, damping: 14 }
            }
          >
            {love > 8 && (love >= 100 ? "∞%" : `${love}%`)}
          </motion.div>
          {love >= 100 && (
            <motion.span
              className="absolute -right-3 -top-8 text-3xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: [0, 14, -14, 0], y: [0, -4, 0] }}
              transition={{ rotate: { repeat: Infinity, duration: 1.6 }, y: { repeat: Infinity, duration: 1.6 } }}
            >
              💖
            </motion.span>
          )}
        </div>
        <button onClick={pump} className="btn mt-4">
          {love >= 100 ? "🥰 it's overflowing!" : "💗 measure it"}
        </button>
        {love >= 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-pink-deep font-semibold mt-3"
          >
            Okay fine… it&apos;s off the charts. Always has been. 💞
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
