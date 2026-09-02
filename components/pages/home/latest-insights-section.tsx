import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function LatestInsightsSection() {
  const articles = [
    {
      tag: "Customs Technology",
      title: "The Rise of Autonomous AI Agents in Modern Freight Forwarding",
      desc: "How automated customs classification and direct EDI pipelines prevent port demurrage in Antwerp and Rotterdam corridors.",
      href: "/blog/the-rise-of-autonomous-ai-agents-in-freight"
    },
    {
      tag: "Trade Regulations",
      title: "European Port Congestion & Mitigation Strategies for 2026",
      desc: "Analysis of gateway throughput, container dwell times, and the impact of pre-arrival customs clearances.",
      href: "/blog"
    }
  ];

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border/70 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Latest Insights & Logistics Advisories
            </h2>
            <p className="text-sm text-muted-foreground">
              Industry updates, customs regulations, and European supply chain intelligence.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all w-fit shrink-0"
          >
            <span>View all publications</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 2 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs hover:border-primary/50 hover:shadow-sm transition-all duration-200"
            >
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <Link
                href={item.href}
                className="text-xs sm:text-sm font-semibold text-primary inline-flex items-center gap-1.5 pt-1"
              >
                <span>Read Full Analysis</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
