import Image from "next/image";
import { Anchor, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function PortSpotlightSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/20 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-card border border-border/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px] rounded-2xl overflow-hidden border border-border/50 bg-muted/30">
            <Image
              src="/manus-storage/winz-hero-port_b04a3a45.jpg"
              alt="European container port operations in Antwerp and Rotterdam"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold tracking-wider border border-white/10 shadow-sm">
              <Anchor size={15} className="text-primary" />
              <span>PORT OF ANTWERP-BRUGES • GATEWAY 01</span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              SEAPORT TO DESTINATION
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Direct terminal coordination that keeps cargo moving.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              From ocean vessel berthing to container discharge and gate release, Globfreight eliminates dwell time and demurrage costs with proactive customs declarations and dedicated port haulage.
            </p>
            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <strong className="text-sm font-semibold text-foreground">Electronic Port Clearance</strong>
                  <span className="text-xs text-muted-foreground mt-0.5">Direct EDI transmission before vessel docking</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <strong className="text-sm font-semibold text-foreground">Dedicated Inland Haulage</strong>
                  <span className="text-xs text-muted-foreground mt-0.5">Chassis fleet ready for immediate terminal pickup</span>
                </div>
              </div>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 w-fit px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xs group"
            >
              <span>Explore Port Services</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
