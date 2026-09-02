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
  }
};

export async function FaqSection() {
  const locale = (await getLocale()) === "ar" ? "ar" : "en";
  const data = FAQ_DATA[locale] || FAQ_DATA.en;

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
