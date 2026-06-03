"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",          label: "Inicio" },
  { href: "/products",  label: "Productos" },
  { href: "/customize", label: "✨ Personalizar" },
  { href: "/about",     label: "Nosotros" },
];

export function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const pathname                       = usePathname();
  const { openCart, itemCount }        = useCartStore();
  const count                          = itemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-200",
          scrolled ? "sm:top-2" : "sm:top-5",
        )}
      >
        <nav className="aurora-nav max-w-5xl mx-auto flex items-center justify-between rounded-[28px] sm:rounded-full py-2.5 px-4 sm:px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group pl-1">
            <motion.div
              whileHover={{ rotate: [-2, 2, -2, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/logo.png"
                alt="CORE"
                width={100}
                height={40}
                className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ y: -2 }}
                      className={cn(
                        "inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                        link.href === "/customize"
                          ? "bg-gradient-to-r from-bloom to-violet text-white shadow-md shadow-bloom/25 hover:shadow-lg hover:shadow-bloom/35"
                          : active
                            ? "bg-bloom/12 text-bloom-dark font-semibold"
                            : "text-ink hover:bg-bloom/8 hover:text-bloom-dark",
                      )}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              aria-label="Abrir carrito"
              className="relative p-2.5 rounded-2xl bg-bloom/8 hover:bg-bloom/15 transition-colors cursor-pointer"
            >
              <ShoppingBag size={18} className="text-ink" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-bloom text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
              className="md:hidden p-2.5 rounded-2xl bg-bloom/8 hover:bg-bloom/15 transition-colors text-ink cursor-pointer"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-3 right-3 z-40 aurora-nav rounded-3xl p-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-2xl font-medium transition-all cursor-pointer",
                      link.href === "/customize"
                        ? "bg-gradient-to-r from-bloom to-violet text-white"
                        : pathname === link.href
                          ? "bg-bloom/12 text-bloom-dark"
                          : "text-ink hover:bg-bloom/8",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
