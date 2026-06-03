"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CustomizerCanvas } from "@/components/customizer/CustomizerCanvas";
import { CustomizerControls } from "@/components/customizer/CustomizerControls";

export default function CustomizePage() {
  return (
    <div className="pt-20 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-cream-band px-4 sm:px-6 py-8 border-b border-sage/15">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-1"
          >
            <div className="p-2 rounded-xl bg-sage/15">
              <Sparkles size={20} className="text-sage-dark" />
            </div>
            <span className="text-sage font-semibold text-sm tracking-widest uppercase">Personalizador</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-charcoal"
          >
            Arma tu Ancheta Perfecta
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-charcoal/50 mt-2"
          >
            Selecciona cada detalle y ve el resultado en tiempo real
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 h-full" style={{ minHeight: "calc(100vh - 280px)" }}>
            {/* Controls - left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="clay-card p-5 rounded-3xl flex flex-col"
              style={{ maxHeight: "calc(100vh - 240px)", minHeight: 600 }}
            >
              <CustomizerControls />
            </motion.div>

            {/* Canvas - right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col"
              style={{ maxHeight: "calc(100vh - 240px)", minHeight: 600 }}
            >
              <CustomizerCanvas />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
