import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const FAQ_DATA = {
  en: {
    badge: "FAQ & GUIDANCE",
    title: "Frequently Asked Questions",
    subtitle: "Direct answers regarding our digital freight booking platform, container types, and European coverage.",
    items: [
      {
        id: "item-1",
        question: "Do you handle physical transport or booking only?",
        answer: "We specialize exclusively in digital freight booking and slot reservations for ocean and air transport."
      },
      {
        id: "item-2",
        question: "What types of ocean containers can I book?",
        answer: "We support all FCL container types, including Dry, Reefer, Open Top, Flat Rack, Tank, and Insulated containers in 20ft, 40ft, and 45ft sizes."
      },
      {
        id: "item-3",
        question: "Which European ports and airports do you cover?",
        answer: "For ocean freight, we focus on major hubs like Antwerp (Belgium), Rotterdam (Netherlands), and Hamburg (Germany). For air freight, our key airport hubs include Brussels, Amsterdam, and Düsseldorf."
      },
      {
        id: "item-4",
        question: "How fast is the booking process?",
        answer: "Our platform allows you to compare and secure your freight slots instantly online."
      }
    ]
  },
  ar: {
    badge: "الأسئلة الشائعة والدليل",
    title: "الأسئلة الشائعة",
    subtitle: "إجابات مباشرة حول منصة حجز الشحن الرقمي، أنواع الحاويات، والتغطية الأوروبية.",
    items: [
      {
        id: "item-1",
        question: "هل تقومون بالنقل الفعلي أم الحجز فقط؟",
        answer: "نحن متخصصون حصرياً في الحجز الرقمي لخدمات الشحن وحجز مساحات النقل البحري والجوي."
      },
      {
        id: "item-2",
        question: "ما هي أنواع الحاويات البحرية التي يمكنني حجزها؟",
        answer: "ندعم جميع أنواع حاويات الشحن الكامل (FCL)، بما في ذلك الحاويات الجافة، المبردة، مفتوحة السقف، الفلات راك، الحاويات الصهريجية، والمعزولة بمقاسات 20 قدم و40 قدم و45 قدم."
      },
      {
        id: "item-3",
        question: "ما هي الموانئ والمطارات الأوروبية التي تغطونها؟",
        answer: "بالنسبة للشحن البحري، نركز على الموانئ الرئيسية مثل أنتويرب (بلجيكا)، روتردام (هولندا)، وهامبورغ (ألمانيا). أما للشحن الجوي، فتشمل مراكزنا الرئيسية مطارات بروكسل، أمستردام، ودوسلدورف."
      },
      {
        id: "item-4",
        question: "ما مدى سرعة عملية الحجز؟",
        answer: "تتيح لك منصتنا مقارنة عروض الأسعار وتأمين مساحات وحصص الشحن الخاصة بك فورياً عبر الإنترنت."
      }
    ]
  },
  nl: {
    badge: "VEELGESTELDE VRAGEN",
    title: "Veelgestelde Vragen",
    subtitle: "Duidelijke antwoorden over ons digitale vrachtboekingsplatform, containertypen en Europese dekking.",
    items: [
      {
        id: "item-1",
        question: "Verzorgt u het fysieke transport of alleen de boeking?",
        answer: "Wij zijn exclusief gespecialiseerd in digitale vrachtboeking en slotreserveringen voor zee- en luchtvracht."
      },
      {
        id: "item-2",
        question: "Welke typen zeecontainers kan ik boeken?",
        answer: "Wij ondersteunen alle FCL-containertypen, inclusief Dry, Reefer, Open Top, Flat Rack, Tank en geïsoleerde containers in 20ft, 40ft en 45ft formaten."
      },
      {
        id: "item-3",
        question: "Welke Europese havens en luchthavens dekt u?",
        answer: "Voor zeevracht richten we ons op grote hubs zoals Antwerpen (België), Rotterdam (Nederland) en Hamburg (Duitsland). Voor luchtvracht omvatten onze belangrijkste hubs Brussel, Amsterdam en Düsseldorf."
      },
      {
        id: "item-4",
        question: "Hoe snel verloopt het boekingsproces?",
        answer: "Op ons platform kunt u vrachttarieven direct online vergelijken en uw vrachtslots direct vastleggen."
      }
    ]
  },
  fr: {
    badge: "FOIRE AUX QUESTIONS",
    title: "Foire Aux Questions",
    subtitle: "Réponses directes concernant notre plateforme de réservation numérique, les conteneurs et la couverture européenne.",
    items: [
      {
        id: "item-1",
        question: "Assurez-vous le transport physique ou uniquement la réservation ?",
        answer: "Nous sommes spécialisés exclusivement dans la réservation numérique de fret et les réservations d'espaces maritimes et aériens."
      },
      {
        id: "item-2",
        question: "Quels types de conteneurs maritimes puis-je réserver ?",
        answer: "Nous prenons en charge tous les types de conteneurs FCL : Dry, Reefer, Open Top, Flat Rack, Tank et conteneurs isothermes en formats 20ft, 40ft et 45ft."
      },
      {
        id: "item-3",
        question: "Quels ports et aéroports européens couvrez-vous ?",
        answer: "Pour le fret maritime, nous nous concentrons sur les grands hubs comme Anvers (Belgique), Rotterdam (Pays-Bas) et Hambourg (Allemagne). Pour le fret aérien, nos principaux hubs comprennent Bruxelles, Amsterdam et Düsseldorf."
      },
      {
        id: "item-4",
        question: "Quelle est la rapidité du processus de réservation ?",
        answer: "Notre plateforme vous permet de comparer et de réserver vos espaces de fret instantanément en ligne."
      }
    ]
  },
  de: {
    badge: "HÄUFIG GESTELLTE FRAGEN",
    title: "Häufig Gestellte Fragen",
    subtitle: "Klare Antworten zu unserer digitalen Buchungsplattform, Containertypen und europäischer Abdeckung.",
    items: [
      {
        id: "item-1",
        question: "Führen Sie den physischen Transport durch oder nur die Buchung?",
        answer: "Wir sind ausschließlich auf die digitale Frachtbuchung und Stellplatzreservierung für See- und Luftfracht spezialisiert."
      },
      {
        id: "item-2",
        question: "Welche Arten von Seecontainern kann ich buchen?",
        answer: "Wir unterstützen alle FCL-Containertypen, einschließlich Dry, Reefer, Open Top, Flat Rack, Tank und isolierte Container in den Größen 20ft, 40ft und 45ft."
      },
      {
        id: "item-3",
        question: "Welche europäischen Häfen und Flughäfen decken Sie ab?",
        answer: "Bei Seefracht konzentrieren wir uns auf wichtige Drehkreuze wie Antwerpen (Belgien), Rotterdam (Niederlande) und Hamburg (Deutschland). Bei Luftfracht gehören Brüssel, Amsterdam und Düsseldorf zu unseren Hauptflughäfen."
      },
      {
        id: "item-4",
        question: "Wie schnell verläuft der Buchungsprozess?",
        answer: "Über unsere Plattform können Sie Frachtangebote direkt online vergleichen und Ihre Frachtkontingente sofort sichern."
      }
    ]
  }
};

export async function FaqSection() {
  const currentLocale = (await getLocale()) as "en" | "ar" | "nl" | "fr" | "de";
  const data = FAQ_DATA[currentLocale] || FAQ_DATA.en;

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-muted/20 border-b border-border/70 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <HelpCircle size={14} />
            <span>{data.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
          <Accordion type="single" collapsible className="w-full divide-y divide-border/60">
            {data.items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b-0 py-2">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors py-4 text-start">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
