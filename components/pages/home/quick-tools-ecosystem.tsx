import {
  Ship,
  Compass,
  Plane,
  Calendar,
  Box,
  Route,
  TrendingUp,
  Leaf,
  ArrowUpRight
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export function QuickToolsEcosystem() {
  const tools = [
    {
      icon: Ship,
      title: "Logistics Explorer",
      subtitle: "Instant freight quotes for FCL, LCL & Air across 150+ ocean & air carriers.",
      tag: "Freight Calculator",
      href: "/contact?tool=logistics-explorer"
    },
    {
      icon: Compass,
      title: "Tracking System",
      subtitle: "Unified multimodal container & vessel tracking with real-time AIS radar.",
      tag: "Live AIS Radar",
      href: "/contact?tool=tracking-system"
    },
    {
      icon: Plane,
      title: "Air Cargo Tracking",
      subtitle: "Real-time airway bill (AWB) status and airline flight itineraries worldwide.",
      tag: "Global AWB",
      href: "/contact?tool=air-cargo"
    },
    {
      icon: Calendar,
      title: "Ship Schedules",
      subtitle: "Vessel sailing timetables, port terminal cutoffs, and transit matrices.",
      tag: "Sailing Timetable",
      href: "/contact?tool=ship-schedules"
    },
    {
      icon: Box,
      title: "Load Calculator",
      subtitle: "3D container stuffing, carton packing simulation, and weight distribution.",
      tag: "3D Stuffing",
      href: "/contact?tool=load-calculator"
    },
    {
      icon: Route,
      title: "Distances & Time",
      subtitle: "Nautical miles, overland highway kilometers, and predictive transit time.",
      tag: "Route Engine",
      href: "/contact?tool=distances-time"
    },
    {
      icon: TrendingUp,
      title: "Freight Rate Index",
      subtitle: "Global container market rate benchmarks, historical analytics & trends.",
      tag: "Market Index",
      href: "/blog"
    },
    {
      icon: Leaf,
      title: "Carbon / CO₂ Calculator",
      subtitle: "Assess supply chain carbon footprint and meet European ESG compliance.",
      tag: "Green Logistics",
      href: "/contact?tool=co2-calculator"
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-muted/20 border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <span>SeaRates Digital Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Smart Logistics Tools & Freight Applications
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Access the complete digital suite designed for shippers, freight forwarders, and supply chain managers worldwide.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:gap-2.5 transition-all shrink-0"
          >
            <span>Explore All Digital Services</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.href}
                className="group relative p-5 rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {tool.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                      <span>{tool.title}</span>
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {tool.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-primary">
                  <span>Launch Tool</span>
                  <span className="text-muted-foreground group-hover:translate-x-0.5 transition-transform">➔</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
