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
      en: "The Rise of Autonomous AI Agents in Modern Freight Forwarding",
      ar: "ظهور وكلاء الذكاء الاصطناعي الذاتيين في خدمات الشحن الحديثة",
      nl: "De Opkomst van Autonome AI-Agenten in Moderne Vrachtexpeditie",
      fr: "L'Essor des Agents d'IA Autonomes dans le Fret Moderne",
      de: "Der Aufstieg Autonomer KI-Agenten in der Modernen Spedition"
    },
    excerpt: {
      en: "How automated customs classification and direct EDI pipelines prevent port demurrage in Antwerp and Rotterdam corridors.",
      ar: "كيف يساهم التصنيف الجمركي الآلي وأنظمة التبادل الإلكتروني المباشر في منع غرامات تأخير الحاويات في موانئ أنتويرب وروتردام.",
      nl: "Hoe geautomatiseerde douaneclassificatie en directe EDI havenoverliggelden in Antwerpen en Rotterdam voorkomen.",
      fr: "Comment la classification douanière automatisée prévient les frais de surestaries à Anvers et Rotterdam.",
      de: "Wie automatisierte Zollklassifizierung Liegegelder in den Korridoren Antwerpen und Rotterdam verhindert."
    },
    slug: "the-rise-of-autonomous-ai-agents-in-freight",
    created_at: "2026-08-24T10:00:00Z",
    published_at: "2026-08-24T10:00:00Z",
    is_featured: true,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    category: {
      id: 1,
      name: {
        en: "Customs Technology",
        ar: "تكنولوجيا الجمارك",
        nl: "Douanetechnologie",
        fr: "Technologie Douanière",
        de: "Zolltechnologie"
      }
    }
  },
  {
    id: 2,
    title: {
      en: "European Port Congestion & Mitigation Strategies for 2026",
      ar: "استراتيجيات التخفيف من ازدحام الموانئ الأوروبية لعام 2026",
      nl: "Europese Havencongestie & Mitigatiestrategieën voor 2026",
      fr: "Congestion des Ports Européens & Stratégies d'Atténuation pour 2026",
      de: "Europäische Hafenüberlastung & Minderungsstrategien für 2026"
    },
    excerpt: {
      en: "Analysis of gateway throughput, container dwell times, and the impact of pre-arrival customs clearances.",
      ar: "تحليل لطاقة استيعاب الموانئ، فترات بقاء الحاويات، وأثر التخليص الجمركي المسبق قبل وصول السفن.",
      nl: "Analyse van havenoverslag, containerverblijftijden en het effect van vooraangifte douaneafhandeling.",
      fr: "Analyse des flux portuaires, temps d'attente des conteneurs et dédouanement préalable.",
      de: "Analyse des Hafendurchsatzes, der Containerstandzeiten und Vorabzollabfertigung."
    },
    slug: "european-port-congestion-mitigation-strategies-2026",
    created_at: "2026-08-20T10:00:00Z",
    published_at: "2026-08-20T10:00:00Z",
    is_featured: false,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
    category: {
      id: 2,
      name: {
        en: "Trade Regulations",
        ar: "اللوائح التجارية",
        nl: "Handelsregelgeving",
        fr: "Réglementations Commerciales",
        de: "Handelsvorschriften"
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
      params: { per_page: 2 },
      method: "GET"
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      posts = res.data as BlogPost[];
    }
  } catch (error) {
    console.error("Failed to load latest blog insights:", error);
  }

  // Gracefully fallback to curated posts if API returned none
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

        {/* 2 Articles Grid using reusable BlogCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {posts.slice(0, 2).map((post, idx) => (
            <BlogCard key={post.id || idx} post={post} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}
