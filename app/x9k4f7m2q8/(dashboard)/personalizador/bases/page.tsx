import { getAllCustomizerBases } from "@/lib/server/customizer-bases";
import { PersonalizadorTabs } from "../../../_components/PersonalizadorTabs";
import { CustomizerBasesTable } from "../../../_components/CustomizerBasesTable";

export const dynamic = "force-dynamic";

export default async function PersonalizadorBasesPage() {
  const bases = await getAllCustomizerBases();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient">Personalizador</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          Bases, ítems y lazos para el personalizador de anchetas
        </p>
      </div>

      <PersonalizadorTabs active="bases" />

      <CustomizerBasesTable bases={bases} />
    </div>
  );
}
