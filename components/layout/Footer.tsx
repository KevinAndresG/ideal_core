"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1E0B34 0%, #2D1057 60%, #1A0B2E 100%)",
      }}
    >
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-16"
          fill="var(--bg-soft)"
        >
          <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="CORE"
              width={120}
              height={48}
              className="object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Regala Algo Unico, Regala Algo CORE.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-2xl text-white text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={16} />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Productos</h4>
            <ul className="space-y-2">
              {[
                {
                  label: "Bouquets & Ramos",
                  href: "/products?category=bouquets",
                },
                { label: "Anchetas", href: "/products?category=anchetas" },
                { label: "Todos", href: "/products" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
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
                { label: "Personalizar · Pronto", href: "/customize" },
                {
                  label: "Contacto WhatsApp",
                  href: `https://wa.me/${WHATSAPP_NUMBER}`,
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} CORE. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-rose fill-rose mx-0.5" />{" "}
            en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
