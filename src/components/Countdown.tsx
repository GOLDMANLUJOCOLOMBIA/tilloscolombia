import { useEffect, useState } from "react";

export default function Countdown() {
  // Persist a fixed countdown end across reloads (24h)
  const [end] = useState<number>(() => {
    const saved = localStorage.getItem("zoomx_end");
    if (saved) {
      const n = Number(saved);
      if (n > Date.now()) return n;
    }
    const newEnd = Date.now() + 1000 * 60 * 60 * 23 + 1000 * 60 * 47; // ~23h47m
    localStorage.setItem("zoomx_end", String(newEnd));
    return newEnd;
  });

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-2">
      <div className="digit"><span className="text-xl font-extrabold">{pad(h)}</span><span className="block text-[9px] text-white/50 uppercase">horas</span></div>
      <span className="text-[#00e38a] font-extrabold">:</span>
      <div className="digit"><span className="text-xl font-extrabold">{pad(m)}</span><span className="block text-[9px] text-white/50 uppercase">min</span></div>
      <span className="text-[#00e38a] font-extrabold">:</span>
      <div className="digit"><span className="text-xl font-extrabold text-[#00e38a]">{pad(s)}</span><span className="block text-[9px] text-white/50 uppercase">seg</span></div>
    </div>
  );
}
