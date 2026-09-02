import { Globe2 } from "lucide-react";

export function CarrierNetworkBand() {
  const carriers = [
    "MSC Mediterranean Shipping",
    "Maersk Line",
    "CMA CGM Group",
    "Hapag-Lloyd",
    "COSCO Shipping",
    "Ocean Network Express (ONE)",
    "Evergreen Marine",
    "Yang Ming",
    "ZIM Integrated Shipping",
    "Emirates SkyCargo",
    "DP World Terminals",
    "PSA International"
  ];

  return (
    <div className="border-b border-border/80 bg-background py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Globe2 size={15} className="text-primary" />
            <span>Integrated with 150+ Global Ocean Carriers, Terminals & Air Cargo Lines</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Direct EDI Live
            </span>
            <span>2,500+ Connected Seaports</span>
          </div>
        </div>

        {/* Carriers Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {carriers.map((c, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-card border border-border/70 flex items-center justify-center text-center text-xs font-bold text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-muted/30 transition-all shadow-2xs"
            >
              <span className="truncate">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
