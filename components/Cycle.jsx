"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Flower2, X } from "lucide-react";
import { useStored, today, fmt, fmtShort, dayKey } from "@/lib/storage";

function avgCycle(arr) {
  const s = arr.map((c) => new Date(c.d)).sort((a, b) => a - b);
  if (s.length >= 2) {
    const g = [];
    for (let i = 1; i < s.length; i++) g.push((s[i] - s[i - 1]) / 86400000);
    const recent = g.slice(-6);
    return Math.round(recent.reduce((a, b) => a + b, 0) / recent.length);
  }
  return arr.length ? arr[arr.length - 1].len : 28;
}
function avgPeriod(arr) {
  const v = arr.map((c) => c.plen).filter(Boolean);
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 5;
}

function Calendar({ y, m, periodStart, per, ovu, now }) {
  const first = new Date(y, m, 1);
  const days = new Date(y, m + 1, 0).getDate();
  const dow = ["S", "M", "T", "W", "T", "F", "S"];
  const psk = dayKey(periodStart);
  const ok = dayKey(ovu);
  const cells = [];
  for (let i = 0; i < first.getDay(); i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const mn = first.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="mt-4">
      <div className="text-center font-bold text-pink-deep mb-2">{mn}</div>
      <div className="grid grid-cols-7 gap-1.5">
        {dow.map((d, i) => (
          <div key={"h" + i} className="text-[0.7rem] text-[#b58aa0] text-center font-bold">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const k = dayKey(new Date(y, m, d));
          let cls = "bg-[#fff6f9] text-ink";
          if (k >= psk && k < psk + per * 86400000) cls = "bg-pink-deep text-white font-bold";
          else if (k === ok) cls = "bg-mint text-[#1f6b52] font-bold ring-2 ring-[#5bc99e]";
          const isToday = k === dayKey(now);
          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-xl text-[0.82rem] ${cls} ${
                isToday ? "ring-2 ring-lav" : ""
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Cycle() {
  const [cycles, setCycles] = useStored("cycles", []);
  const [date, setDate] = useState(today());
  const [plen, setPlen] = useState(5);
  const [len, setLen] = useState(28);
  const [note, setNote] = useState("");

  function add() {
    if (!date) return toast.error("Pick a date 🌸");
    setCycles([...cycles, { d: date, plen: +plen || 5, len: +len || 28, note }]);
    setNote("");
    toast.success("Period saved 🌸");
  }
  function del(d) {
    setCycles(cycles.filter((c) => c.d !== d));
  }

  const sorted = [...cycles].sort((a, b) => new Date(b.d) - new Date(a.d));
  let view = null;
  if (sorted.length) {
    const last = sorted[0];
    const cyc = avgCycle(cycles);
    const per = avgPeriod(cycles);
    const lastStart = new Date(last.d);
    const next = new Date(lastStart);
    next.setDate(next.getDate() + cyc);
    const ovu = new Date(next);
    ovu.setDate(ovu.getDate() - 14);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const daysTo = Math.ceil((next - now) / 86400000);
    const dayInCycle = Math.floor((now - lastStart) / 86400000) + 1;

    let phase = "—",
      color = "#bbb";
    if (dayInCycle >= 1) {
      if (dayInCycle <= per) (phase = "🌸 Menstrual phase"), (color = "#e75a86");
      else if (dayInCycle < cyc - 15) (phase = "🌼 Follicular phase"), (color = "#f0a93b");
      else if (dayInCycle <= cyc - 13) (phase = "🥚 Ovulation"), (color = "#5bc99e");
      else if (dayInCycle <= cyc) (phase = "🌙 Luteal phase"), (color = "#b79cff");
      else (phase = "⏰ Period may be due"), (color = "#e75a86");
    }

    view = { last, cyc, per, next, ovu, now, daysTo, dayInCycle, phase, color };
  }

  return (
    <motion.div className="card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-pink-deep text-2xl font-cute mb-3 flex items-center gap-2">
        <Flower2 /> Period Cycle Tracker
      </h2>

      {view && (
        <div className="text-center mb-3">
          <span
            className="inline-block px-4 py-2 rounded-full font-bold text-white text-sm"
            style={{ background: view.color }}
          >
            Day {Math.max(view.dayInCycle, 0)} · {view.phase}
          </span>
        </div>
      )}

      <h3 className="text-lav font-semibold mb-1">Log the first day of your period</h3>
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[140px]">
          <label className="lbl">Start date</label>
          <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="lbl">Period length (days)</label>
          <input type="number" className="field" value={plen} onChange={(e) => setPlen(e.target.value)} />
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="lbl">Cycle length (days)</label>
          <input type="number" className="field" value={len} onChange={(e) => setLen(e.target.value)} />
        </div>
      </div>
      <label className="lbl">How are you feeling? (optional)</label>
      <input
        className="field"
        placeholder="cramps, mood, flow…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="btn mt-3" onClick={add}>
        Save period 🌸
      </button>

      {view ? (
        <>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="stat">
              <b className="block text-2xl text-pink-deep">{view.cyc}</b>
              <small className="text-[0.7rem] text-[#b58aa0] uppercase">avg cycle</small>
            </div>
            <div className="stat">
              <b className="block text-2xl text-pink-deep">{view.per}</b>
              <small className="text-[0.7rem] text-[#b58aa0] uppercase">avg period</small>
            </div>
            <div className="stat">
              <b className="block text-2xl text-pink-deep">{cycles.length}</b>
              <small className="text-[0.7rem] text-[#b58aa0] uppercase">logged</small>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-[#ffeef5] rounded-2xl p-4 mt-4 text-center">
            Next period likely around <b className="text-pink-deep text-lg">{fmt(view.next)}</b>{" "}
            <span className="badge">{view.daysTo >= 0 ? `${view.daysTo} days away` : "overdue"}</span>
            <br />
            <span className="text-[0.8rem] text-[#b58aa0]">
              Estimated ovulation ~ {fmtShort(view.ovu)} · estimate only, not medical advice
            </span>
          </div>

          <Calendar
            y={view.next.getFullYear()}
            m={view.next.getMonth()}
            periodStart={view.next}
            per={view.per}
            ovu={view.ovu}
            now={view.now}
          />
          <div className="flex gap-4 flex-wrap justify-center mt-3 text-[0.75rem] text-[#a06a7e]">
            <span className="flex items-center gap-1.5">
              <i className="w-3 h-3 rounded inline-block bg-pink-deep" /> Period
            </span>
            <span className="flex items-center gap-1.5">
              <i className="w-3 h-3 rounded inline-block bg-mint" /> Ovulation
            </span>
            <span className="flex items-center gap-1.5">
              <i className="w-3 h-3 rounded inline-block bg-white ring-2 ring-lav" /> Today
            </span>
          </div>
        </>
      ) : null}

      <h3 className="text-lav font-semibold mt-5 mb-1">History</h3>
      {sorted.length === 0 ? (
        <p className="text-[#c99] italic text-center py-3">No entries yet 🌷</p>
      ) : (
        sorted.map((c) => (
          <div
            key={c.d}
            className="bg-[#fff6f9] border-l-4 border-pink rounded-xl px-3.5 py-3 mt-2.5 text-[0.92rem] flex justify-between gap-2.5"
          >
            <div>
              <span className="badge">🌸 {fmt(c.d)}</span> period {c.plen || "?"}d · cycle {c.len}d
              {c.note && <div className="text-[#b58aa0] text-[0.78rem] mt-1">{c.note}</div>}
            </div>
            <button onClick={() => del(c.d)} className="text-[#d77]">
              <X size={16} />
            </button>
          </div>
        ))
      )}
    </motion.div>
  );
}
