"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileCheck2,
  Truck,
  Warehouse,
  Coins,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ServiceData {
  id: string;
  tabLabel: string;
  title: string;
  desc: string;
  point1: string;
  point2: string;
  point3: string;
  image: string;
  imageAlt: string;
  badge: string;
  statNumber: string;
  statLabel: string;
}

interface ServicesTabsProps {
  tabs: {
    customs: string;
    transport: string;
    warehouse: string;
    fiscal: string;
  };
  customsDetail: {
    title: string;
    desc: string;
    point1: string;
    point2: string;
    point3: string;
  };
  transportDetail: {
    title: string;
    desc: string;
    point1: string;
    point2: string;
    point3: string;
  };
  warehouseDetail: {
    title: string;
    desc: string;
    point1: string;
    point2: string;
    point3: string;
  };
  fiscalDetail: {
    title: string;
    desc: string;
    point1: string;
    point2: string;
    point3: string;
  };
}

export function InteractiveServicesTabs({
  tabs,
  customsDetail,
  transportDetail,
  warehouseDetail,
  fiscalDetail
}: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState<"customs" | "transport" | "warehouse" | "fiscal">("customs");

  const servicesData: Record<"customs" | "transport" | "warehouse" | "fiscal", ServiceData> = {
    customs: {
      id: "customs",
      tabLabel: tabs.customs,
      title: customsDetail.title,
      desc: customsDetail.desc,
      point1: customsDetail.point1,
      point2: customsDetail.point2,
      point3: customsDetail.point3,
      image: "/manus-storage/winz-customs-documents_a858a147.jpg",
      imageAlt: "European customs declaration and paperwork handling",
      badge: "AEO-F ACCREDITED",
      statNumber: "< 4h",
      statLabel: "Average Seaport Clearance"
    },
    transport: {
      id: "transport",
      tabLabel: tabs.transport,
      title: transportDetail.title,
      desc: transportDetail.desc,
      point1: transportDetail.point1,
      point2: transportDetail.point2,
      point3: transportDetail.point3,
      image: "/manus-storage/winz-hero-port_b04a3a45.jpg",
      imageAlt: "Modern container transport and port haulage logistics",
      badge: "GPS LIVE CORRIDOR",
      statNumber: "24/7",
      statLabel: "Dispatch Availability"
    },
    warehouse: {
      id: "warehouse",
      tabLabel: tabs.warehouse,
      title: warehouseDetail.title,
      desc: warehouseDetail.desc,
      point1: warehouseDetail.point1,
      point2: warehouseDetail.point2,
      point3: warehouseDetail.point3,
      image: "/manus-storage/winz-warehouse_bdc42811.jpg",
      imageAlt: "Modern bonded warehouse facility in Zele Belgium",
      badge: "DUTY SUSPENSION READY",
      statNumber: "100%",
      statLabel: "Customs Supervised"
    },
    fiscal: {
      id: "fiscal",
      tabLabel: tabs.fiscal,
      title: fiscalDetail.title,
      desc: fiscalDetail.desc,
      point1: fiscalDetail.point1,
      point2: fiscalDetail.point2,
      point3: fiscalDetail.point3,
      image: "/manus-storage/winz-customs-documents_a858a147.jpg",
      imageAlt: "Fiscal representation and VAT deferment documents",
      badge: "ARTICLE 23 VAT DEFERRAL",
      statNumber: "0€",
      statLabel: "Import VAT Upfront Cash Flow"
    }
  };

  const current = servicesData[activeTab];

  const getTabIcon = (key: string) => {
    switch (key) {
      case "customs":
        return <FileCheck2 size={18} />;
      case "transport":
        return <Truck size={18} />;
      case "warehouse":
        return <Warehouse size={18} />;
      case "fiscal":
        return <Coins size={18} />;
      default:
        return <FileCheck2 size={18} />;
    }
  };

  return (
    <div className="flex flex-col space-y-6 lg:space-y-8">
      {/* Tab bar */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-card border border-border/80 shadow-xs"
        role="tablist"
        aria-label="Capabilities navigation"
      >
        {(["customs", "transport", "warehouse", "fiscal"] as const).map((key) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => setActiveTab(key)}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {getTabIcon(key)}
              <span>{servicesData[key].tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-8 lg:p-10 rounded-3xl bg-card border border-border/80 shadow-xs"
      >
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center w-fit px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
              {current.badge}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-3">
              {current.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {current.desc}
            </p>
          </div>

          <ul className="space-y-3 pt-1">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
              <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-foreground">{current.point1}</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
              <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-foreground">{current.point2}</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
              <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-foreground">{current.point3}</span>
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xs group"
            >
              <span>View Service Details</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors px-3 py-2"
            >
              <span>Request Quote</span>
              <ExternalLink size={15} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex min-h-[260px] lg:min-h-[340px] rounded-2xl overflow-hidden bg-muted/30 border border-border/60">
          <Image
            src={current.image}
            alt={current.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white shadow-md flex flex-col">
            <strong className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {current.statNumber}
            </strong>
            <span className="text-xs text-white/80 font-medium mt-0.5">
              {current.statLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
