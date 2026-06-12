"use client";

import { useEffect } from "react";
import type { CustomizerConfig } from "@/lib/data/customizer-items";
import { useCustomizerStore } from "@/lib/store/customizer";
import { CustomizerControls } from "./CustomizerControls";
import { CustomizerCanvas } from "./CustomizerCanvas";

export function CustomizerView({ config }: { config: CustomizerConfig }) {
  const setConfig = useCustomizerStore((state) => state.setConfig);

  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="petal-card p-5 rounded-3xl order-2 lg:order-1">
        <CustomizerControls />
      </div>
      <div className="order-1 lg:order-2 lg:sticky lg:top-28">
        <CustomizerCanvas />
      </div>
    </div>
  );
}
