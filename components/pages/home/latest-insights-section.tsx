import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function LatestInsightsSection() {
  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              REGULATORY INTEL & NEWS
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Latest Insights & Logistics Advisories
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all w-fit"
          >
            <span>View all publications</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-card p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Customs Technology
              </span>
              <h3 className="text-lg font-bold text-foreground">
                The Rise of Autonomous AI Agents in Modern Freight Forwarding
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                How automated customs classification and direct EDI pipelines prevent port demurrage in Antwerp and Rotterdam corridors.
              </p>
            </div>
            <Link
              href="/blog/the-rise-of-autonomous-ai-agents-in-freight"
              className="text-xs font-semibold text-primary flex items-center gap-1"
            >
              <span>Read Full Analysis</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="rounded-2xl border bg-card p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Trade Regulations
              </span>
              <h3 className="text-lg font-bold text-foreground">
                European Port Congestion & Mitigation Strategies for 2026
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Analysis of gateway throughput, container dwell times, and the impact of pre-arrival customs clearances.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-primary flex items-center gap-1"
            >
              <span>Read Full Analysis</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
