import { ArrowRight, ArrowLeft, Layers } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fetchHelper } from "@/api/fetch";
import { getLocale, getTranslations } from "next-intl/server";
import { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/pages/blog/blog-card";

const fallbackPosts: BlogPost[] = [
  {
    id: 1,
    title: {
      en: "How to Choose the Right Container Type for Your Cargo (Dry vs. Reefer vs. Open Top)",
      ar: "كيف تختار نوع الحاوية المناسب لبضاعتك (الجافة مقابل المبردة ومفتوحة السقف)",
      nl: "Hoe kiest u het juiste containertype voor uw lading (Dry vs. Reefer vs. Open Top)",
      fr: "Comment choisir le bon type de conteneur pour votre cargaison (Dry vs Reefer vs Open Top)",
      de: "So wählen Sie den richtigen Containertyp für Ihre Fracht (Standard vs. Kühlcontainer vs. Open Top)"
    },
    excerpt: {
      en: "A comprehensive guide on evaluating cargo dimensions, weight, and temperature requirements to select between Dry, Reefer, and Open Top containers.",
      ar: "دليل شامل لتقييم أبعاد البضائع ووزنها ومتطلبات درجات الحرارة للاختيار الأمثل بين الحاويات الجافة، المبردة، ومفتوحة السقف.",
      nl: "Een complete gids voor het beoordelen van afmetingen, gewicht en temperatuureisen om te kiezen tussen Dry, Reefer en Open Top containers.",
      fr: "Guide complet pour évaluer les dimensions, le poids et la température afin de choisir entre conteneurs Dry, Reefer et Open Top.",
      de: "Umfassender Leitfaden zur Bewertung von Abmessungen, Gewicht und Temperaturanforderungen für Standard-, Kühl- und Open-Top-Container."
    },
    slug: "how-to-choose-the-right-container-type-for-your-cargo",
    created_at: "2026-09-15T10:00:00Z",
    published_at: "2026-09-15T10:00:00Z",
    is_featured: true,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    category: {
      id: 1,
      name: {
        en: "Equipment & Packing",
        ar: "المعدات والتعبئة",
        nl: "Uitrusting & Verpakking",
        fr: "Équipements & Emballage",
        de: "Ausrüstung & Verpackung"
      }
    }
  },
  {
    id: 2,
    title: {
      en: "Optimizing Global Supply Chains Through Instant Digital Freight Booking",
      ar: "تحسين سلاسل الإمداد العالمية من خلال الحجز الرقمي الفوري للشحن",
      nl: "Toeleveringsketens optimaliseren via directe digitale vrachtboeking",
      fr: "Optimiser les chaînes d'approvisionnement grâce à la réservation numérique de fret",
      de: "Optimierung globaler Lieferketten durch sofortige digitale Frachtbuchung"
    },
    excerpt: {
      en: "How digital booking platforms and instant carrier slot reservations help shippers and forwarders eliminate paperwork bottlenecks and secure space.",
      ar: "كيف تساهم منصات الحجز الرقمي وحجز المساحات الفوري في القضاء على اختناقات المعاملات الورقية وتأمين مساحات الشحن الموثوقة.",
      nl: "Hoe digitale boekingsplatforms en directe slotreserveringen administratieve knelpunten wegnemen en vrachtcapaciteit garanderen.",
      fr: "Comment les plateformes numériques et la réservation immédiate de créneaux éliminent les lenteurs administratives et sécurisent l'espace.",
      de: "Wie digitale Plattformen und sofortige Stellplatzreservierungen Papierkram vermeiden und Frachtkapazitäten verlässlich sichern."
    },
    slug: "optimizing-global-supply-chains-through-instant-digital-freight-booking",
    created_at: "2026-09-10T10:00:00Z",
    published_at: "2026-09-10T10:00:00Z",
    is_featured: false,
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop",
    category: {
      id: 2,
      name: {
        en: "Digital Logistics",
        ar: "اللوجستيات الرقمية",
        nl: "Digitale Logistiek",
        fr: "Logistique Numérique",
        de: "Digitale Logistik"
      }
    }
  },
  {
    id: 3,
    title: {
      en: "A Guide to Major European Gateway Ports: Antwerp, Rotterdam, and Hamburg",
      ar: "دليل الموانئ الأوروبية الرئيسية: أنتويرب، روتردام، وهامبورغ",
      nl: "Gids voor de grote Europese toegangshavens: Antwerpen, Rotterdam en Hamburg",
      fr: "Guide des grands ports d'entrée européens : Anvers, Rotterdam et Hambourg",
      de: "Leitfaden zu den wichtigsten europäischen Gateway-Häfen: Antwerpen, Rotterdam und Hamburg"
    },
    excerpt: {
      en: "Strategic breakdown of Northern Europe's primary maritime hubs, inland multimodal corridors, and terminal customs turnaround performance.",
      ar: "نظرة استراتيجية على كبرى محطات الموانئ في شمال أوروبا، وممرات النقل الداخلي متعددة الوسائط، وسرعة التخليص الجمركي في المحطات.",
      nl: "Strategisch overzicht van de belangrijkste Noord-Europese maritieme hubs, achterlandverbindingen en inklaringstijden.",
      fr: "Analyse stratégique des principaux hubs maritimes d'Europe du Nord, des liaisons intermodales et des performances de dédouanement.",
      de: "Strategische Übersicht über Nordeuropas führende Seehäfen, multimodale Hinterlandverbindungen und Zollabfertigungszeiten."
    },
    slug: "guide-to-major-european-gateway-ports-antwerp-rotterdam-hamburg",
    created_at: "2026-09-05T10:00:00Z",
    published_at: "2026-09-05T10:00:00Z",
    is_featured: false,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
    category: {
      id: 3,
      name: {
        en: "European Gateways",
        ar: "البوابات الأوروبية",
        nl: "Europese Havens",
        fr: "Ports Européens",
        de: "Europäische Häfen"
      }
    }
  }
];

export async function LatestInsightsSection() {
  const locale = await getLocale();
  const t = await getTranslations("BlogPage.homeSection");
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  let posts: BlogPost[] = [];

  try {
    const res = await fetchHelper({
      endPoint: ["blogPosts"],
      params: { per_page: 3 },
      method: "GET"
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      posts = res.data as BlogPost[];
    }
  } catch (error) {
    console.error("Failed to load latest blog insights:", error);
  }

  // Fallback to the 3 curated posts from the content specifications if API returned none
  if (posts.length === 0) {
    posts = fallbackPosts;
  }

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-background border-b border-border/70 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              <Layers className="h-3 w-3" />
              <span>{t("badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          <Link
            href="/blog"
            className="group text-xs sm:text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all w-fit shrink-0 py-2 px-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            <span>{t("viewAll")}</span>
            <ArrowIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.slice(0, 3).map((post, idx) => (
            <BlogCard key={post.id || idx} post={post} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}
