"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { NotebookPen, X, Pencil } from "lucide-react";
import { useStored } from "@/lib/storage";

const MOODS = ["😄", "🥰", "😌", "😔", "😣", "😡", "😴"];

export default function Diary() {
  const [items, setItems] = useStored("diary", []);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  const [q, setQ] = useState("");

  function add() {
    if (!text.trim()) return;
    setItems([...items, { t: text.trim(), m: mood, ts: new Date().toISOString() }]);
    setText("");
    setMood("");
    toast.success("Update added 💜");
  }
  function del(i) {
    setItems(items.filter((_, idx) => idx !== i));
  }
  function edit(i) {
    const v = prompt("Edit your update 💜", items[i].t);
    if (v === null) return;
    const next = [...items];
    if (!v.trim()) next.splice(i, 1);
    else next[i] = { ...next[i], t: v.trim() };
    setItems(next);
  }

  const shown = items
    .map((e, i) => ({ ...e, i }))
    .reverse()
    .filter((e) => !q || e.t.toLowerCase().includes(q.toLowerCase()));

  return (
    <motion.div className="card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-pink-deep text-2xl font-cute mb-3 flex items-center gap-2">
        <NotebookPen /> Daily Updates
      </h2>
      <h3 className="text-lav font-semibold mb-2">Anything you want to keep me updated about 💌</h3>

      <div className="flex gap-1.5 flex-wrap mb-1">
        {MOODS.map((m) => (
          <button
            key={m}
            onClick={() => setMood(mood === m ? "" : m)}
            className={`text-xl rounded-xl px-2.5 py-1.5 border-2 transition ${
              mood === m ? "border-pink bg-pink-soft" : "border-transparent bg-[#fff6f9]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <textarea
        className="field min-h-[70px]"
        placeholder="What happened today? How are you?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn mt-3 !bg-lav" onClick={add}>
        Add update 💜
      </button>

      <input
        className="field mt-5"
        placeholder="🔍 search your updates…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="mt-2">
        {shown.length === 0 ? (
          <p className="text-[#c99] italic text-center py-3">{q ? "No updates match 🔍" : "No updates yet 💜"}</p>
        ) : (
          shown.map((e) => (
            <div
              key={e.i}
              className="bg-[#fff6f9] border-l-4 border-pink rounded-xl px-3.5 py-3 mt-2.5 text-[0.92rem] flex justify-between gap-2.5"
            >
              <div>
                {e.m && <span className="mr-1">{e.m}</span>}
                {e.t}
                <div className="text-[#b58aa0] text-[0.78rem] mt-1 flex items-center gap-2">
                  {new Date(e.ts).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <button onClick={() => edit(e.i)} className="text-lav inline-flex items-center gap-1">
                    <Pencil size={12} /> edit
                  </button>
                </div>
              </div>
              <button onClick={() => del(e.i)} className="text-[#d77]">
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
