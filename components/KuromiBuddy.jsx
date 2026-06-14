"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = ["hi cutie 💗", "thinking of you 🌸", "you're the best 💜", "hehe 😚", "miss you already 🥺"];

// A little Kuromi that floats in the corner and says something sweet on tap
export default function KuromiBuddy() {
  const [line, setLine] = useState(-1);

  function poke() {
    setLine(Math.floor(Math.random() * LINES.length));
    setTimeout(() => setLine(-1), 2200);
  }

  return (
    <div className="fixed bottom-3 right-3 z-40 hidden sm:flex flex-col items-center select-none">
      <AnimatePresence>
        {line >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-1 bg-white text-pink-deep font-semibold text-sm px-3 py-1.5 rounded-2xl shadow-cute"
          >
            {LINES[line]}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img
        src="/kuromiFaces/kuromi-shy.png"
        alt="Kuromi"
        onClick={poke}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12, rotate: -6 }}
        whileTap={{ scale: 0.9 }}
        className="w-20 h-20 object-contain cursor-pointer drop-shadow-lg"
      />
    </div>
  );
}
