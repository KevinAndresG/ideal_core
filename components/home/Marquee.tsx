"use client";

const words = [
  { text: "HECHO A MANO", color: "#a8d890" },
  { text: "PERSONALIZABLE", color: "#D4B8E0" },
  { text: "CON AMOR", color: "#F0B8C8" },
  { text: "ÚNICO", color: "#F5C5A3" },
  { text: "ARTESANAL", color: "#B8D4E0" },
  { text: "ESPECIAL", color: "#a8d890" },
  { text: "HECHO A MANO", color: "#D4B8E0" },
  { text: "PERSONALIZABLE", color: "#F0B8C8" },
  { text: "CON AMOR", color: "#F5C5A3" },
  { text: "ÚNICO", color: "#B8D4E0" },
  { text: "ARTESANAL", color: "#76b67a" },
  { text: "ESPECIAL", color: "#D4B8E0" },
];

export function Marquee() {
  return (
    <div
      className="py-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #3e5840 0%, #3d5a3f 100%)",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-6">
            <span
              className="font-serif font-bold text-2xl sm:text-3xl italic"
              style={{ color: word.color }}
            >
              {word.text}
            </span>
            <span className="text-white/30 text-xl">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
