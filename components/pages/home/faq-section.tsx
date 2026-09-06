import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const FAQ_DATA = {
  en: {
    badge: "KNOWLEDGE BASE & GUIDANCE",
    title: "Frequently Asked Questions",
    subtitle: "Essential answers regarding European customs clearance, container logistics, and port handling procedures.",
    items: [
      {
        id: "item-1",
        question: "What is AEO-F certification and how does it benefit my shipments?",
        answer: "Authorized Economic Operator – Full (AEO-F) is the highest customs compliance standard recognized by the European Union. It grants our clients expedited customs clearances, fewer physical inspections, priority handling during risk assessments, and streamlined document submission across European seaports."
      },
      {
        id: "item-2",
        question: "Which European seaports and container gateways does Globfreight cover?",
        answer: "We operate direct electronic customs data interchanges (EDI) and ground logistics across the Port of Antwerp-Bruges, Port of Rotterdam, Zeebrugge, and Hamburg, providing seamless transit into the Benelux, Germany, France, and broader European trade corridors."
      },
      {
        id: "item-3",
        question: "What is an NCTS T1 transit document and when is it required?",
        answer: "The T1 transit document allows non-Union goods to move under customs supervision from one European port or border to another EU destination or bonded warehouse without immediate payment of import customs duties or VAT until final import clearance."
      },
      {
        id: "item-4",
        question: "How do I request a spot freight quote or container haulage rate?",
        answer: "You can utilize our online logistics tools on this homepage or submit your container specifications via the contact section below. Our dedicated operations desk provides transparent, competitive ocean freight and road haulage quotes within hours."
      },
      {
        id: "item-5",
        question: "What documents are required to clear ocean container freight?",
        answer: "Standard documentation includes the Ocean Bill of Lading (B/L), Commercial Invoice, Detailed Packing List, Certificate of Origin (EUR.1 or COO where applicable), and specific import/export licenses depending on commodity tariff codes."
      }
    ]
  },
  ar: {
    badge: "قاعدة المعرفة والإرشادات",
    title: "الأسئلة الشائعة",
    subtitle: "إجابات شاملة حول التخليص الجمركي الأوروبي، ولوجستيات الحاويات، وإجراءات المناولة في الموانئ.",
    items: [
      {
        id: "item-1",
        question: "ما هي شهادة المشغل الاقتصادي المعتمد (AEO-F) وكيف تفيد شحناتي؟",
        answer: "شهادة (AEO-F) هي أعلى معايير الامتثال الجمركي المعتمدة في الاتحاد الأوروبي، وتمنح عملاءنا تخليصاً جمركياً سريعاً، وفحوصات فعلية أقل، وأولوية في معالجة الشحنات عبر الموانئ الأوروبية."
      },
      {
        id: "item-2",
        question: "ما هي الموانئ والممرات الأوروبية التي تغطيها جلوب فريت؟",
        answer: "نعمل من خلال الربط الإلكتروني المباشر (EDI) في ميناء أنتويرب، ميناء روتردام، زيبروج، وهامبورغ، مما يضمن تدفقاً سلساً للبضائع عبر بلجيكا، هولندا، ألمانيا، وفرنسا."
      },
      {
        id: "item-3",
        question: "ما هي وثيقة الترانزيت NCTS T1 ومتى نحتاج إليها؟",
        answer: "تسمح وثيقة T1 بنقل البضائع غير التابعة للاتحاد الأوروبي تحت الرقابة الجمركية من ميناء الدخول إلى وجهة أخرى أو مستودع جمركي معلق دون دفع الرسوم الجمركية أو ضريبة القيمة المضافة فوراً حتى التخليص النهائي."
      },
      {
        id: "item-4",
        question: "كيف يمكنني طلب عرض أسعار لشحن الحاويات أو النقل البري؟",
        answer: "يمكنك استخدام أدوات البحث عن الأسعار في هذه الصفحة أو ملء نموذج التواصل بالأسفل، وسيقوم فريق العمليات بتزويدك بعرض أسعار تنافسي وشفاف خلال ساعات قليلة."
      },
      {
        id: "item-5",
        question: "ما هي المستندات المطلوبة للتخليص الجمركي للحاويات البحرية؟",
        answer: "تشمل المستندات الأساسية: بوليصة الشحن البحري (B/L)، الفاتورة التجارية، بيان العبوة، شهادة المنشأ (EUR.1 أو COO)، وأي تراخيص استيراد مطلوبة وفقاً للرمز الجمركي للسلعة."
      }
    ]
  },
  nl: {
    badge: "KENNISBANK & RICHTLIJNEN",
    title: "Veelgestelde Vragen",
    subtitle: "Belangrijke antwoorden over Europese douaneafhandeling, containerlogistiek en havenprocedures.",
    items: [
      {
        id: "item-1",
        question: "Wat is de AEO-F-certificering en wat zijn de voordelen voor mijn zendingen?",
        answer: "Geautoriseerde Marktdeelnemer - Volledig (AEO-F) is de hoogste douaneconformiteitsnorm erkend door de Europese Unie. Het biedt onze klanten versnelde douaneafhandeling, minder fysieke controles, voorrang bij risicobeoordelingen en vereenvoudigde documentinzending in Europese zeehavens."
      },
      {
        id: "item-2",
        question: "Welke Europese zeehavens en containerterminals bedient Globfreight?",
        answer: "Wij opereren met directe elektronische gegevensuitwisseling (EDI) en wegvervoer over de haven van Antwerpen-Brugge, de haven van Rotterdam, Zeebrugge en Hamburg, met naadloos vervoer naar de Benelux, Duitsland, Frankrijk en de bredere Europese handelscorridors."
      },
      {
        id: "item-3",
        question: "Wat is een NCTS T1-transitdocument en wanneer is dit nodig?",
        answer: "Het T1-transitdocument maakt het mogelijk om niet-Uniegoederen onder douanetoezicht te vervoeren van de ene Europese haven naar een andere bestemming in de EU of een douane-entrepot, zonder onmiddellijke betaling van invoerrechten of btw tot de definitieve inklaring."
      },
      {
        id: "item-4",
        question: "Hoe vraag ik een vrachttarief of containertransport aan?",
        answer: "U kunt gebruikmaken van onze online logistieke rekentools op deze pagina of uw containerspecificaties doorgeven via het contactformulier. Onze operationele afdeling bezorgt u binnen enkele uren een transparant en concurrerend tarief."
      },
      {
        id: "item-5",
        question: "Welke documenten zijn vereist voor de douaneafhandeling van zeevracht?",
        answer: "Standaarddocumenten omvatten de Ocean Bill of Lading (B/L), handelsfactuur, paklijst, certificaat van oorsprong (EUR.1 of COO) en eventuele specifieke in- of uitvoervergunningen afhankelijk van de goederencode."
      }
    ]
  },
  fr: {
    badge: "BASE DE CONNAISSANCES & CONSEILS",
    title: "Foire Aux Questions",
    subtitle: "Réponses essentielles concernant le dédouanement européen, la logistique des conteneurs et les procédures portuaires.",
    items: [
      {
        id: "item-1",
        question: "Qu'est-ce que la certification OEA-F et quels sont ses avantages ?",
        answer: "L'Opérateur Économique Agréé - Simplifications douanières et Sécurité (OEA-F) est le standard d'excellence douanière de l'UE. Il garantit un dédouanement accéléré, un nombre réduit de contrôles physiques et un traitement prioritaire de vos marchandises."
      },
      {
        id: "item-2",
        question: "Quels ports européens et terminaux à conteneurs Globfreight dessert-il ?",
        answer: "Nous opérons avec des échanges de données informatisés (EDI) directs et une logistique terrestre sur le port d'Anvers-Bruges, Rotterdam, Zeebruges et Hambourg, reliant efficacement le Benelux, la France, l'Allemagne et l'Europe."
      },
      {
        id: "item-3",
        question: "Qu'est-ce qu'un document de transit NCTS T1 et quand est-il requis ?",
        answer: "Le document de transit T1 permet de transporter des marchandises tierces sous contrôle douanier d'un port européen à une autre destination ou entrepôt sous douane de l'UE, en suspension de droits de douane et de TVA jusqu'au dédouanement final."
      },
      {
        id: "item-4",
        question: "Comment puis-je demander un devis de fret ou de transport de conteneurs ?",
        answer: "Vous pouvez utiliser nos outils logistiques sur cette page ou envoyer vos critères d'expédition via le formulaire de contact. Notre service d'exploitation vous répondra dans les plus brefs délais avec une offre transparente et compétitive."
      },
      {
        id: "item-5",
        question: "Quels documents sont nécessaires pour dédouaner du fret maritime ?",
        answer: "Les documents standards incluent le connaissement maritime (B/L), la facture commerciale, la liste de colisage détaillée, le certificat d'origine (EUR.1 ou COO) et les éventuelles licences d'importation selon la nomenclature douanière."
      }
    ]
  },
  de: {
    badge: "WISSEN & LEITFADEN",
    title: "Häufig Gestellte Fragen",
    subtitle: "Wichtige Antworten zu europäischer Zollabfertigung, Containerlogistik und Hafenprozessen.",
    items: [
      {
        id: "item-1",
        question: "Was bedeutet die AEO-F-Zertifizierung und welche Vorteile bietet sie?",
        answer: "Der Zugelassene Wirtschaftsbeteiligte (AEO-F) ist der höchste zollrechtliche Standard der EU. Er gewährt unseren Kunden schnellere Zollabfertigungen, weniger physische Kontrollen und eine vorrangige Bearbeitung in den europäischen Seehäfen."
      },
      {
        id: "item-2",
        question: "Welche Seehäfen und Terminals deckt Globfreight ab?",
        answer: "Wir betreiben direkte elektronische Schnittstellen (EDI) und Bodentransporte in den Häfen Antwerpen-Brügge, Rotterdam, Zeebrugge und Hamburg für nahtlose Transporte in die Benelux-Länder, nach Deutschland, Frankreich und ganz Europa."
      },
      {
        id: "item-3",
        question: "Was ist ein NCTS T1-Versandschein und wann wird er benötigt?",
        answer: "Das T1-Versanddokument ermöglicht den Transport von Nicht-Unionswaren unter zollamtlicher Überwachung von einem EU-Eingangshafen zu einem anderen Bestimmungsort oder Zolllager ohne sofortige Zahlung von Zöllen oder Einfuhrumsatzsteuer."
      },
      {
        id: "item-4",
        question: "Wie fordere ich ein Frachtangebot oder Containertransport-Preise an?",
        answer: "Nutzen Sie unsere Online-Tools auf dieser Startseite oder senden Sie Ihre Sendungsdaten über den Kontaktbereich. Unsere Disponenten erstellen Ihnen innerhalb kürzester Zeit ein transparentes Angebot."
      },
      {
        id: "item-5",
        question: "Welche Unterlagen sind für die Seefracht-Zollabfertigung erforderlich?",
        answer: "Zu den Standarddokumenten gehören das Seefrachtkonnossement (B/L), die Handelsrechnung, die Packliste, das Ursprungszeugnis (EUR.1 oder COO) sowie spezifische Genehmigungen je nach Zolltarifnummer."
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
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors py-4">
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
