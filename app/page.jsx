"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Hearts from "@/components/Hearts";
import Blobs from "@/components/Blobs";
import Sparkles from "@/components/Sparkles";
import Splash from "@/components/Splash";
import KuromiBuddy from "@/components/KuromiBuddy";
import ForYou from "@/components/ForYou";
import Gallery from "@/components/Gallery";
import Birthday from "@/components/Birthday";
import Cycle from "@/components/Cycle";
import Diary from "@/components/Diary";

const TABS = [
  { id: "foryou", label: "💌 For You", el: <ForYou /> },
  { id: "gallery", label: "🖼️ Gallery", el: <Gallery /> },
  { id: "birthday", label: "🎂 Birthday", el: <Birthday /> },
  { id: "cycle", label: "🌸 Cycle", el: <Cycle /> },
  { id: "diary", label: "📔 Daily Updates", el: <Diary /> },
];

export default function Home() {
  const [tab, setTab] = useState("foryou");
  const active = TABS.find((t) => t.id === tab);

  return (
    <>

    
      <Splash />
      <Blobs />
      <Hearts />
      <Sparkles />
      <KuromiBuddy />

      <header className="text-center pt-14 pb-6 px-5 relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="font-cute text-pink-deep text-5xl sm:text-6xl drop-shadow-[0_2px_0_#fff]"
        >
          Hello, Arpita 🌷
        </motion.h1>
        <div className="mt-4 text-[#a06a7e] text-lg min-h-[28px]">
          <TypeAnimation
            sequence={[
              "made with a little bit of magic ✨",
              2200,
              "and a lot of thinking about you 💕",
              2200,
              "your own little corner of the internet 🌸",
              2200,
            ]}
            speed={55}
            repeat={Infinity}
            cursor
          />
        </div>
      </header>

      <nav className="flex gap-2 justify-center flex-wrap max-w-[820px] mx-auto px-3 relative z-10">
        {TABS.map((t) => (
          <motion.button
            key={t.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 rounded-full font-semibold text-[0.95rem] shadow-cute transition hover:-translate-y-0.5 ${
              tab === t.id ? "bg-pink text-white" : "bg-white/80 text-pink-deep"
            }`}
          >
            {t.label}
          </motion.button>
        ))}
      </nav>

      <main className="max-w-[920px] mx-auto mt-7 px-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {active.el}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="text-center mt-10 mb-14 text-[#c389a0] text-[0.85rem] relative z-10">
        Made with 💗 just for you · everything is saved privately on your own device
      </footer>
    </>
  );
}
