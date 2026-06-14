"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center text-center px-6"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, #ffe3ee, #ffd0e2 50%, #f7b8d2)",
          }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="text-7xl"
          >
            💖
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-cute text-pink-deep text-4xl mt-5"
          >
            For Arpita
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-[#a0567e] mt-3"
          >
            making something special, just for you…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
