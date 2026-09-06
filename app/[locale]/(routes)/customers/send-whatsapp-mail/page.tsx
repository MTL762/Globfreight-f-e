import CustomHeader from "@/components/layouts/header/CustomHeader";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SendWhatsappMailForm } from "../components/SendWhatsappMailForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Send WhatsApp & Email | ${PROJECT_NAME}`,
    description: "Dispatch direct or broadcast notifications to customers via WhatsApp & Email."
  };
}

export default async function SendWhatsappMailPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="space-y-6">
      <CustomHeader />

      <Card className="rounded-3xl border border-border/50 bg-card p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
        <CardHeader className="p-0 pb-6 border-b border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <div className="relative">
                  <FaWhatsapp className="h-5 w-5" />
                  <Mail className="h-3 w-3 absolute -bottom-1 -right-1 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  {isRtl
                    ? "إرسال رسائل واتساب وبريد إلكتروني"
                    : "Send WhatsApp & Email Broadcast"}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                  {isRtl
                    ? "إرسال إشعارات وتحديثات الأسعار لجميع العملاء أو لعملاء محددين"
                    : "Dispatch shipping updates, rate notices, and announcements to customers"}
                </CardDescription>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild className="rounded-xl self-start sm:self-auto">
              <Link href={`/${locale}/customers`}>
                <ArrowIcon className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                <span>{isRtl ? "الرجوع لقائمة العملاء" : "Back to Customers"}</span>
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-6">
          <SendWhatsappMailForm isModal={false} />
        </CardContent>
      </Card>
    </div>
  );
}
