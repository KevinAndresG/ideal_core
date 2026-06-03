"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3d4a3e 0%, #2a3a2b 100%)" }}>
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16" fill="#fdf8f3">
          <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image src="/logo.png" alt="CORE" width={120} height={48} className="h-10 w-auto object-contain brightness-0 invert mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              Regalos únicos hechos con amor, diseñados para crear momentos que perduran.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white">
                <Share2 size={18} />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Productos</h4>
            <ul className="space-y-2">
              {["Anchetas", "Flores Preservadas", "Velas Artesanales", "Sets", "Decoraciones"].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-white/50 hover:text-white/80 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {[
                { label: "Nosotros", href: "/about" },
                { label: "Personalizar", href: "/customize" },
                { label: "Blog", href: "#" },
                { label: "Contacto", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 hover:text-white/80 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">Recibe ideas de regalo e inspiración cada semana.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="tu@email.com"
                className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm outline-none focus:border-sage/60 transition-colors"
              />
              <button
                type="submit"
                className="clay-btn clay-btn-primary text-sm py-2.5"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} CORE. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-rose fill-rose" /> en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
