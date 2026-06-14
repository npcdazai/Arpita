"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { HeartPulse, X } from "lucide-react";
import { useStored, today, fmt, dayKey } from "@/lib/storage";

const MOODS = ["😄 Great", "🙂 Okay", "😐 Meh", "😣 Unwell", "😴 Tired"];

function Chart({ week, byDay, field, sleep }) {
  const vals = week.map((d) => {
    const h = byDay[dayKey(d)];
    return h ? +h[field] || 0 : 0;
  });
  const max = Math.max(...vals, 8);
  return (
    <div className="flex items-end gap-1.5 h-[110px] mt-2 pt-1.5">
      {week.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <span className="text-[0.62rem] text-pink-deep font-bold">{vals[i] || ""}</span>
          <div
            className={`w-[70%] rounded-t-md min-h-[3px] transition-all ${
              sleep ? "bg-gradient-to-b from-lav to-[#8a6cf0]" : "bg-gradient-to-b from-pink to-pink-deep"
            }`}
            style={{ height: `${(vals[i] / max) * 100}%` }}
          />
          <small className="text-[0.62rem] text-[#b58aa0]">{["S", "M", "T", "W", "T", "F", "S"][d.getDay()]}</small>
        </div>
      ))}
    </div>
  );
}

export default function Health() {
  const [items, setItems] = useStored("health", []);
  const [date, setDate] = useState(today());
  const [mood, setMood] = useState(MOODS[0]);
  const [w, setW] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [note, setNote] = useState("");

  function add() {
    setItems([...items, { d: date || today(), mood, w, water, sleep, note }]);
    setW("");
    setWater("");
    setSleep("");
    setNote("");
    toast.success("Check-in saved 💚");
  }
  function del(i) {
    setItems(items.filter((_, idx) => idx !== i));
  }
  function bumpWater(n) {
    setWater(n === 0 ? "" : String((+water || 0) + n));
  }

  const sorted = [...items].sort((a, b) => new Date(b.d) - new Date(a.d));
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    week.push(d);
  }
  const byDay = {};
  items.forEach((h) => (byDay[dayKey(h.d)] = h));
  const wk = week.map((d) => byDay[dayKey(d)]).filter(Boolean);
  const avg = (f) => {
    const v = wk.map(f).map(Number).filter((x) => !isNaN(x) && x > 0);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
  };
  const aw = avg((h) => h.water);
  const asl = avg((h) => h.sleep);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="card">
        <h2 className="text-pink-deep text-2xl font-cute mb-3 flex items-center gap-2">
          <HeartPulse /> Health Check
        </h2>
        <h3 className="text-lav font-semibold mb-2">This week at a glance</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="stat">
            <b className="block text-2xl text-pink-deep">{aw ? aw.toFixed(1) : "–"}</b>
            <small className="text-[0.7rem] text-[#b58aa0] uppercase">avg water/day</small>
          </div>
          <div className="stat">
            <b className="block text-2xl text-pink-deep">{asl ? asl.toFixed(1) : "–"}</b>
            <small className="text-[0.7rem] text-[#b58aa0] uppercase">avg sleep hrs</small>
          </div>
          <div className="stat">
            <b className="block text-2xl text-pink-deep">{wk.length}/7</b>
            <small className="text-[0.7rem] text-[#b58aa0] uppercase">days logged</small>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap mt-4">
          <div className="flex-1 min-w-[160px]">
            <div className="text-[0.8rem] text-[#b58aa0] mb-1">💧 Water — last 7 days</div>
            <Chart week={week} byDay={byDay} field="water" />
          </div>
          <div className="flex-1 min-w-[160px]">
            <div className="text-[0.8rem] text-[#b58aa0] mb-1">😴 Sleep — last 7 days</div>
            <Chart week={week} byDay={byDay} field="sleep" sleep />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lav font-semibold mb-2">New check-in</h3>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[140px]">
            <label className="lbl">Date</label>
            <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="lbl">Mood</label>
            <select className="field" value={mood} onChange={(e) => setMood(e.target.value)}>
              {MOODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <label className="lbl">Weight (kg)</label>
            <input type="number" className="field" placeholder="optional" value={w} onChange={(e) => setW(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="lbl">Water (glasses)</label>
            <input type="number" className="field" placeholder="optional" value={water} onChange={(e) => setWater(e.target.value)} />
            <div className="flex gap-2 flex-wrap mt-1.5">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => bumpWater(n)}
                  className="border-2 border-pink-soft bg-white text-pink-deep rounded-full px-3 py-1.5 font-semibold text-[0.85rem] hover:bg-pink-soft"
                >
                  +{n}
                </button>
              ))}
              <button
                onClick={() => bumpWater(0)}
                className="border-2 border-pink-soft bg-white text-pink-deep rounded-full px-3 py-1.5 font-semibold text-[0.85rem] hover:bg-pink-soft"
              >
                reset
              </button>
            </div>
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="lbl">Sleep (hrs)</label>
            <input type="number" className="field" placeholder="optional" value={sleep} onChange={(e) => setSleep(e.target.value)} />
          </div>
        </div>
        <label className="lbl">Symptoms / medicines / notes</label>
        <textarea
          className="field min-h-[70px]"
          placeholder="headache, took vitamins, doctor visit…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="btn mt-3 !bg-mint !text-[#1f6b52]" onClick={add}>
          Save check-in 💚
        </button>

        <h3 className="text-lav font-semibold mt-5 mb-1">History</h3>
        {sorted.length === 0 ? (
          <p className="text-[#c99] italic text-center py-3">No check-ins yet 💚</p>
        ) : (
          sorted.map((h, i) => (
            <div
              key={i}
              className="bg-[#fff6f9] border-l-4 border-pink rounded-xl px-3.5 py-3 mt-2.5 text-[0.92rem] flex justify-between gap-2.5"
            >
              <div>
                <span className="badge">{fmt(h.d)}</span> {h.mood}
                <div className="text-[#b58aa0] text-[0.78rem] mt-1">
                  {h.w && `⚖️ ${h.w}kg  `}
                  {h.water && `💧 ${h.water} glasses  `}
                  {h.sleep && `😴 ${h.sleep}h`}
                </div>
                {h.note && <div className="text-[#b58aa0] text-[0.78rem] mt-1">📝 {h.note}</div>}
              </div>
              <button onClick={() => del(items.indexOf(h))} className="text-[#d77]">
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
