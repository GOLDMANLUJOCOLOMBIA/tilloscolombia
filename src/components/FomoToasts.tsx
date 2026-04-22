import { useEffect, useState } from "react";

const NAMES = ["Juan", "María", "Carlos", "Andrea", "Felipe", "Camila", "Santiago", "Valentina", "Diego", "Laura", "Sebastián", "Daniela", "Andrés", "Sofía", "Mateo", "Isabela"];
const CITIES = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Cúcuta", "Ibagué", "Santa Marta", "Villavicencio"];
const ACTIONS = [
  "acaba de comprar",
  "compró talla 40",
  "pidió 2 pares",
  "acaba de pedir",
  "completó su pedido",
];

type Toast = { id: number; name: string; city: string; action: string };

export default function FomoToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let id = 0;
    const push = () => {
      const t: Toast = {
        id: ++id,
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
      };
      setToasts(prev => [...prev, t]);
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== t.id));
      }, 5200);
    };
    const first = setTimeout(push, 3500);
    const interval = setInterval(push, 8000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  return (
    <div className="fixed bottom-24 left-3 z-40 space-y-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="toast-in pointer-events-auto max-w-[280px] flex items-center gap-3 bg-black/85 backdrop-blur-md border border-[#00e38a]/30 rounded-2xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,.5)]"
        >
          <div className="w-9 h-9 rounded-full bg-[#00e38a]/15 grid place-items-center text-[#00e38a] font-extrabold">
            {t.name[0]}
          </div>
          <div className="text-[12px] leading-tight">
            <p className="font-bold">{t.name} <span className="text-white/60 font-normal">de {t.city}</span></p>
            <p className="text-white/70">{t.action} <span className="text-[#00e38a]">Nike ZoomX</span></p>
            <p className="text-white/40 text-[10px] mt-0.5">hace {Math.floor(Math.random()*9)+1} min · ✅ verificado</p>
          </div>
        </div>
      ))}
    </div>
  );
}
