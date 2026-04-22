import { useEffect, useRef, useState } from "react";
import Checkout from "./components/Checkout";
import FomoToasts from "./components/FomoToasts";
import Countdown from "./components/Countdown";

const PRODUCT = {
  name: "Nike ZoomX",
  price: 129900,
  oldPrice: 169900,
  image: "/1.jpg", // Esta es la foto que sale junto al botón de compra
};

/**
 * Galería tipo storytelling - imágenes verticales que coinciden al hacer scroll.
 * Asegúrate de que tus imágenes estén directamente en la carpeta /public/
 */
const GALLERY = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg"
];

const formatCOP = (n: number) =>
  "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buy = () => setOpenCheckout(true);

  return (
    <div className="bg-black text-white selection:bg-[#00e38a] selection:text-black has-sticky-cta">
      {/* HEADER FIJO */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 192 68" className="w-14 h-auto" fill="white" aria-label="Nike">
              <path d="M183.4 21.5L51.4 65.7c-9.4 3.1-17.5 4.7-23.9 4.7-7.6 0-13.3-2.3-16.7-6.8-2.7-3.5-3.9-8.3-3.4-13.7 1.1-12 9.7-25.4 21.7-37.5C13.5 23.6 1.7 38.7 0.4 51.7c-.6 5.5.8 10.4 4 14C8.5 70.6 15.7 73 25.5 73c5.4 0 11.4-.7 18-2.3L183.4 21.5z"/>
            </svg>
            <span className="text-[10px] font-black tracking-[0.25em] text-white/80 hidden xs:block">ZOOM<span className="text-[#00e38a]">X</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00e38a]/10 border border-[#00e38a]/30">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#00e38a] animate-ping opacity-70" />
              <span className="relative rounded-full w-2 h-2 bg-[#00e38a]" />
            </span>
            <span className="text-[11px] font-bold text-[#00e38a]">+2.500 clientes</span>
          </div>
        </div>
        {/* Top urgency bar */}
        <div className="bg-[#00e38a] text-black overflow-hidden">
          <div className="flex marquee-track whitespace-nowrap py-1.5 text-[11px] font-extrabold uppercase tracking-wider">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex shrink-0">
                <span className="px-4">⚡ Envío gratis a toda Colombia</span>
                <span className="px-4">·</span>
                <span className="px-4">💵 Pago contra entrega</span>
                <span className="px-4">·</span>
                <span className="px-4">🔥 -30% OFF por tiempo limitado</span>
                <span className="px-4">·</span>
                <span className="px-4">✅ +2.500 clientes felices</span>
                <span className="px-4">·</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[88px]" />

      {/* CONTENEDOR MOBILE-FIRST */}
      <main className="mx-auto max-w-xl">

        {/* HERO con imagen continua */}
        <section ref={heroRef} className="relative">
          <div className="strip">
            <img
              src={GALLERY[0]}
              alt="Nike ZoomX +2.500 clientes satisfechos"
              className="gallery-img"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80";
              }}
            />
          </div>

          {/* Overlay CTA superpuesto en el hero */}
          <div className="absolute left-0 right-0 bottom-4 px-4">
            <button
              onClick={buy}
              className="btn-shine cta-pulse w-full bg-[#00e38a] hover:bg-[#00ff9a] text-black font-black text-base uppercase tracking-widest py-4 rounded-2xl transition"
            >
              ¡Quiero los míos! →
            </button>
            <p className="text-center text-[11px] text-white/70 mt-2">
              🚚 Envío GRATIS · 💵 Paga al recibir · ⚡ Entrega 2-4 días
            </p>
          </div>
        </section>

        {/* BENEFICIOS RÁPIDOS */}
        <section className="px-4 py-6 grid grid-cols-3 gap-2 reveal">
          {[
            { i: "🚚", t: "Envío", s: "GRATIS" },
            { i: "💵", t: "Pago", s: "CONTRA ENTREGA" },
            { i: "🔒", t: "Compra", s: "100% SEGURA" },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <div className="text-2xl mb-1">{b.i}</div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">{b.t}</p>
              <p className="text-xs font-extrabold text-[#00e38a] uppercase">{b.s}</p>
            </div>
          ))}
        </section>

        {/* OFERTA + COUNTDOWN */}
        <section className="px-4 reveal">
          <div className="rounded-3xl border border-[#00e38a]/30 bg-gradient-to-b from-[#00e38a]/[0.08] to-transparent p-5 text-center">
            <p className="text-[11px] font-bold text-[#00e38a] uppercase tracking-widest">⏰ Oferta termina en</p>
            <div className="mt-3"><Countdown /></div>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-white/40 line-through text-lg">{formatCOP(PRODUCT.oldPrice)}</span>
              <span className="text-4xl font-black text-[#00e38a] neon-text">{formatCOP(PRODUCT.price)}</span>
              <span className="bg-[#00e38a] text-black text-xs font-black px-2 py-1 rounded-md">-30%</span>
            </div>
            <p className="text-xs text-white/60 mt-1">Solo quedan <span className="text-[#00e38a] font-bold">17 pares</span> en stock</p>
            {/* Stock bar */}
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00e38a] to-[#6effb6]" style={{ width: "23%" }} />
            </div>
          </div>
        </section>

        {/* GALERÍA TIPO STORYTELLING - SCROLL CONTINUO */}
        <section className="mt-6 strip reveal">
          {GALLERY.slice(1).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Nike ZoomX ${i + 2}`}
              className="gallery-img"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const fallbacks = [
                  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&q=80",
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=80",
                  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80",
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
                  "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80",
                  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&q=80",
                ];
                (e.currentTarget as HTMLImageElement).src = fallbacks[i % fallbacks.length];
              }}
            />
          ))}
        </section>

        {/* CTA INTERMEDIO */}
        <section className="px-4 py-6 reveal">
          <button
            onClick={buy}
            className="btn-shine cta-pulse w-full bg-[#00e38a] hover:bg-[#00ff9a] text-black font-black text-base uppercase tracking-widest py-4 rounded-2xl"
          >
            ¡Comprar ahora! · {formatCOP(PRODUCT.price)}
          </button>
        </section>

        {/* CARACTERÍSTICAS */}
        <section className="px-4 py-6 reveal">
          <h2 className="h-display text-3xl mb-5">Tecnología <span className="text-[#00e38a]">que se siente</span></h2>
          <div className="space-y-3">
            {[
              { i: "⚡", t: "Amortiguación ZoomX", d: "Espuma de última generación que devuelve la energía en cada paso." },
              { i: "🪶", t: "Ultra ligeros", d: "Menos peso, más velocidad. Diseñados para no detenerte." },
              { i: "🛡️", t: "Material premium", d: "Malla transpirable que mantiene tus pies frescos y secos." },
              { i: "🏃", t: "Alta durabilidad", d: "Suela antideslizante con tracción superior en cualquier terreno." },
            ].map((f, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#00e38a]/40 transition">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#00e38a]/10 border border-[#00e38a]/30 grid place-items-center text-xl">{f.i}</div>
                <div>
                  <p className="font-extrabold text-sm uppercase tracking-wider">{f.t}</p>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MÉTRICAS */}
        <section className="px-4 py-6 reveal">
          <div className="grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <div><p className="text-xl font-black text-[#00e38a]">+87%</p><p className="text-[9px] text-white/50 uppercase mt-1">Energía</p></div>
            <div><p className="text-xl font-black text-[#00e38a]">-25%</p><p className="text-[9px] text-white/50 uppercase mt-1">Peso</p></div>
            <div><p className="text-xl font-black text-[#00e38a]">+100%</p><p className="text-[9px] text-white/50 uppercase mt-1">Confort</p></div>
            <div><p className="text-xl font-black text-[#00e38a]">∞</p><p className="text-[9px] text-white/50 uppercase mt-1">Sin límites</p></div>
          </div>
        </section>

        {/* PRUEBA SOCIAL */}
        <section className="px-4 py-8 reveal">
          <div className="text-center mb-5">
            <div className="text-3xl tracking-widest text-[#00e38a]">★★★★★</div>
            <p className="font-extrabold mt-2">4.9/5 · +2.500 clientes satisfechos</p>
            <p className="text-xs text-white/50">Basado en reseñas verificadas</p>
          </div>

          <div className="space-y-3">
            {[
              { n: "Andrés M.", c: "Bogotá", t: "Increíbles, ligeros y súper cómodos. Llegaron en 2 días. 100% recomendados.", d: "hace 1 día" },
              { n: "Camila R.", c: "Medellín", t: "La calidad se siente desde que abres la caja. Pagué al recibir, todo perfecto. 🔥", d: "hace 3 días" },
              { n: "Felipe V.", c: "Cali", t: "Los uso para entrenar y para el día a día. La amortiguación es brutal.", d: "hace 5 días" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00e38a] to-[#0a8a55] grid place-items-center font-black text-black">{r.n[0]}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{r.n} <span className="text-white/40 font-normal text-xs">· {r.c}</span></p>
                    <p className="text-[#00e38a] text-xs">★★★★★ <span className="text-white/40 ml-1">{r.d}</span></p>
                  </div>
                  <span className="text-[10px] text-[#00e38a] border border-[#00e38a]/40 px-2 py-0.5 rounded-full">✓ Verificado</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">"{r.t}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL GIGANTE */}
        <section className="px-4 py-8 reveal">
          <div className="rounded-3xl border border-[#00e38a]/40 bg-gradient-to-b from-[#00e38a]/[0.12] via-black to-black p-6 text-center">
            <p className="text-[11px] font-bold text-[#00e38a] uppercase tracking-widest">Última oportunidad</p>
            <h3 className="h-display text-3xl mt-2">Llévatelos<br/><span className="text-[#00e38a] neon-text">hoy mismo</span></h3>
            <div className="mt-4 flex items-baseline justify-center gap-2">
              <span className="text-white/40 line-through">{formatCOP(PRODUCT.oldPrice)}</span>
              <span className="text-4xl font-black text-[#00e38a]">{formatCOP(PRODUCT.price)}</span>
            </div>
            <button
              onClick={buy}
              className="btn-shine cta-pulse mt-5 w-full bg-[#00e38a] hover:bg-[#00ff9a] text-black font-black text-lg uppercase tracking-widest py-5 rounded-2xl"
            >
              ¡Comprar ahora!
            </button>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-white/60 uppercase tracking-wider">
              <span>🔒 Sitio seguro</span>
              <span>💵 Paga al recibir</span>
              <span>🔄 Cambios 30 días</span>
            </div>
          </div>
        </section>

        {/* FAQ MINI */}
        <section className="px-4 py-6 reveal">
          <h3 className="h-display text-xl mb-3">Preguntas <span className="text-[#00e38a]">frecuentes</span></h3>
          {[
            { q: "¿Cuánto tarda la entrega?", a: "Entre 2 y 4 días hábiles a todo Colombia. Envío 100% gratis." },
            { q: "¿Puedo pagar al recibir?", a: "Sí. Puedes pagar en efectivo cuando recibas tu pedido en la puerta de tu casa." },
            { q: "¿Y si no me queda la talla?", a: "Tienes 30 días para cambios o devolución sin preguntas." },
          ].map((f, i) => (
            <details key={i} className="group border-b border-white/10 py-3">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-bold text-sm">{f.q}</span>
                <span className="text-[#00e38a] text-xl group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="px-4 py-8 border-t border-white/10 mt-4">
          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div className="p-3"><div className="text-xl">🛡️</div><p className="text-[10px] uppercase mt-1 text-white/60">Garantía 30 días</p></div>
            <div className="p-3"><div className="text-xl">🔄</div><p className="text-[10px] uppercase mt-1 text-white/60">Cambios fáciles</p></div>
            <div className="p-3"><div className="text-xl">💬</div><p className="text-[10px] uppercase mt-1 text-white/60">WhatsApp 24/7</p></div>
          </div>
          <a
            href="https://wa.me/573000000000?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20Nike%20ZoomX"
            target="_blank" rel="noreferrer"
            className="block text-center bg-[#25D366] text-black font-extrabold py-3 rounded-2xl uppercase text-sm tracking-wider"
          >
            💬 Hablar por WhatsApp
          </a>
          <p className="text-center text-[10px] text-white/40 mt-6">
            © {new Date().getFullYear()} Nike ZoomX · Todos los derechos reservados<br/>
            Sitio seguro · SSL 256-bit · Tus datos protegidos
          </p>
        </footer>
      </main>

      {/* STICKY BOTTOM CTA */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto max-w-xl p-3 bg-gradient-to-t from-black via-black/95 to-black/70 backdrop-blur-xl border-t border-white/10">
          <button
            onClick={buy}
            className="btn-shine cta-pulse w-full bg-[#00e38a] hover:bg-[#00ff9a] text-black font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-3"
          >
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] opacity-80">Comprar ahora</span>
              <span className="text-base">{formatCOP(PRODUCT.price)} <span className="text-xs line-through opacity-60 ml-1">{formatCOP(PRODUCT.oldPrice)}</span></span>
            </span>
            <span className="ml-auto bg-black text-[#00e38a] text-xs font-black px-3 py-2 rounded-xl">-30%</span>
          </button>
        </div>
      </div>

      {/* FOMO toasts */}
      <FomoToasts />

      {/* Checkout */}
      <Checkout open={openCheckout} onClose={() => setOpenCheckout(false)} product={PRODUCT} />
    </div>
  );
}
