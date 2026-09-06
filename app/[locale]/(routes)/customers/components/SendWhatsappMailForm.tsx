"use client";

import { useState, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import {
  Mail,
  Users,
  User,
  Search,
  X,
  Sparkles,
  Eye,
  CheckCheck,
  AlertCircle,
  Loader2,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  SendCustomerWhatsappMailPayload,
  customers
} from "@/app/[locale]/(routes)/customers/types";
import {
  sendCustomerWhatsappMail,
  fetchCustomersList
} from "@/services/customerService";

export interface TargetCustomerInfo {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company_name?: string;
}

interface SendWhatsappMailFormProps {
  targetCustomer?: TargetCustomerInfo | null;
  initialSendToAll?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const TEMPLATES = [
  {
    titleAr: "تحديث أسعار الشحن البحري",
    titleEn: "Ocean Freight Rates Update",
    subjectAr: "تحديث أسعار الشحن البحري",
    subjectEn: "Ocean Freight Rates Update",
    messageAr:
      "عزيزنا العميل، نود إحاطتكم علماً بتحديث جداول الإبحار وأسعار الشحن البحري للأسبوع القادم. يسعدنا تواصلكم لمزيد من الاستفسارات والخدمات المخصصة.",
    messageEn:
      "Dear Valued Customer, please be advised of our updated sailing schedules and ocean freight rates for the upcoming week. Feel free to contact our support team for customized inquiries."
  },
  {
    titleAr: "تهنئة وعروض خاصة",
    titleEn: "Greetings & Special Offers",
    subjectAr: "تهنئة بمناسبة العام الجديد وعروض خاصة",
    subjectEn: "Season Greetings & Exclusive Offers",
    messageAr:
      "تهنئكم شركة GlobFreight وتتمنى لكم عاماً سعيداً مليئاً بالنجاح والتوسع التجاري، ويسرنا تقديم خصم خاص على رحلات الشحن القادمة.",
    messageEn:
      "GlobFreight wishes you continued success and commercial expansion! We are pleased to present exclusive rate privileges on your upcoming shipments."
  },
  {
    titleAr: "إشعار وصول الشحنة",
    titleEn: "Shipment Arrival Notice",
    subjectAr: "إشعار وصول الشحنة وجاهزية مستندات التخليص",
    subjectEn: "Shipment Arrival & Clearance Documents Notice",
    messageAr:
      "عزيزنا العميل، نفيدكم بوصول شحنتكم إلى الميناء وجاهزية بوليصة الشحن ومستندات الفحص الجمركي للتسليم.",
    messageEn:
      "Dear Customer, we are pleased to inform you that your shipment has arrived at port, and all clearance documents are now ready."
  }
];

export function SendWhatsappMailForm({
  targetCustomer,
  initialSendToAll = false,
  onSuccess,
  onCancel,
  isModal: _isModal = false
}: SendWhatsappMailFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "ar";
  const [, startTransition] = useTransition();

  // Form State
  const [sendToAll, setSendToAll] = useState<boolean>(
    targetCustomer ? false : initialSendToAll
  );
  const [selectedCustomers, setSelectedCustomers] = useState<TargetCustomerInfo[]>(
    targetCustomer ? [targetCustomer] : []
  );
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Customer search state
  const [searchQuery, setSearchQuery] = useState("");
  const [customerOptions, setCustomerOptions] = useState<customers[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Load customer list on search or on mount if needed
  useEffect(() => {
    let active = true;
    const fetchList = async () => {
      setIsLoadingCustomers(true);
      try {
        const res = await fetchCustomersList({
          search: searchQuery.trim() || undefined,
          per_page: 20
        });
        if (active && res?.data) {
          setCustomerOptions(res.data);
        }
      } catch (err) {
        console.error("Failed to load customers:", err);
      } finally {
        if (active) setIsLoadingCustomers(false);
      }
    };

    const timer = setTimeout(() => {
      fetchList();
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Handle template selection
  const handleSelectTemplate = (tpl: (typeof TEMPLATES)[0]) => {
    setSubject(isRtl ? tpl.subjectAr : tpl.subjectEn);
    setMessage(isRtl ? tpl.messageAr : tpl.messageEn);
  };

  // Customer Selection Handlers
  const handleAddCustomer = (customer: customers) => {
    if (!selectedCustomers.some(c => c.id === customer.id)) {
      const fullName =
        customer.full_name ||
        `${customer.first_name || ""} ${customer.last_name || ""}`.trim() ||
        customer.company_name ||
        `Customer #${customer.id}`;

      setSelectedCustomers(prev => [
        ...prev,
        {
          id: customer.id,
          name: fullName,
          email: customer.email,
          phone: customer.phone || customer.alt_phone,
          company_name: customer.company_name
        }
      ]);
    }
    setSearchQuery("");
    setShowSearchDropdown(false);
  };

  const handleRemoveCustomer = (id: number) => {
    setSelectedCustomers(prev => prev.filter(c => c.id !== id));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedSubject) {
      toast.error(
        isRtl ? "يرجى كتابة عنوان الموضوع" : "Please enter the subject"
      );
      return;
    }

    if (!trimmedMessage) {
      toast.error(
        isRtl ? "يرجى كتابة نص الرسالة" : "Please enter the message content"
      );
      return;
    }

    if (!sendToAll && selectedCustomers.length === 0) {
      toast.error(
        isRtl
          ? "يرجى اختيار عميل واحد على الأقل أو تفعيل الإرسال للجميع"
          : "Please select at least one customer or enable broadcast to all"
      );
      return;
    }

    const payload: SendCustomerWhatsappMailPayload = {
      send_to_all: sendToAll,
      subject: trimmedSubject,
      message: trimmedMessage,
      ...(sendToAll
        ? {}
        : { client_ids: selectedCustomers.map(c => c.id) })
    };

    try {
      setIsSubmitting(true);
      const res = await sendCustomerWhatsappMail(payload);

      if (res?.success !== false && res?.status !== false) {
        toast.success(
          isRtl
            ? sendToAll
              ? "تم إرسال الرسالة عبر الواتساب والبريد لجميع العملاء بنجاح!"
              : `تم إرسال الرسالة عبر الواتساب والبريد إلى (${selectedCustomers.length}) من العملاء بنجاح!`
            : sendToAll
              ? "WhatsApp & Mail broadcast dispatched to all customers successfully!"
              : `WhatsApp & Mail dispatched to (${selectedCustomers.length}) customer(s) successfully!`
        );

        if (onSuccess) {
          onSuccess();
        } else {
          startTransition(() => {
            router.push(`/${locale}/customers`);
            router.refresh();
          });
        }
      } else {
        toast.error(
          res?.message ||
            (isRtl
              ? "حدث خطأ أثناء إرسال الرسالة"
              : "Failed to dispatch WhatsApp & Mail message")
        );
      }
    } catch (err: any) {
      toast.error(
        err?.message ||
          (isRtl
            ? "حدث خطأ أثناء معالجة الطلب"
            : "An error occurred while processing dispatch")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Target Audience Selector */}
      <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 transition-all hover:bg-muted/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {sendToAll ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>
            <div>
              <Label
                htmlFor="send_to_all_switch"
                className="text-sm font-bold text-foreground cursor-pointer"
              >
                {isRtl ? "إرسال إلى جميع العملاء (بث عام)" : "Broadcast to All Customers"}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {sendToAll
                  ? isRtl
                    ? "سيتم إرسال الرسالة عبر الواتساب والبريد لكل العملاء المسجلين في النظام"
                    : "Message will be broadcasted to all registered customers via WhatsApp & Mail"
                  : isRtl
                    ? "حدد عملاء محددين لاستلام الرسالة"
                    : "Select specific customers to receive this message"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span
              className={`text-xs font-semibold ${
                !sendToAll ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isRtl ? "محدد" : "Custom"}
            </span>
            <Switch
              id="send_to_all_switch"
              checked={sendToAll}
              onCheckedChange={setSendToAll}
            />
            <span
              className={`text-xs font-semibold ${
                sendToAll ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
              }`}
            >
              {isRtl ? "الجميع" : "All"}
            </span>
          </div>
        </div>

        {/* When NOT send to all: Customer Multi-Select Picker */}
        {!sendToAll && (
          <div className="mt-4 pt-4 border-t border-border/40 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isRtl
                  ? `العملاء المحددون (${selectedCustomers.length})`
                  : `Selected Customers (${selectedCustomers.length})`}
              </Label>
              {selectedCustomers.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCustomers([])}
                  className="text-[11px] text-rose-500 hover:text-rose-600 transition-colors font-medium"
                >
                  {isRtl ? "إلغاء تحديد الكل" : "Clear all"}
                </button>
              )}
            </div>

            {/* Selected Chips */}
            {selectedCustomers.length > 0 ? (
              <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-1">
                {selectedCustomers.map(cust => (
                  <Badge
                    key={cust.id}
                    variant="secondary"
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-foreground font-medium text-xs shadow-xs"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white font-bold">
                      {cust.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-[150px] truncate">{cust.name}</span>
                    {cust.phone && (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        ({cust.phone})
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomer(cust.id)}
                      className="text-muted-foreground hover:text-rose-500 rounded-full p-0.5 transition-colors"
                      title={isRtl ? "حذف" : "Remove"}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs font-medium">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>
                  {isRtl
                    ? "يرجى البحث عن العملاء وإضافتهم من القائمة بالأسفل"
                    : "Please search and select customers below to receive the message"}
                </span>
              </div>
            )}

            {/* Search Input and Dropdown */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  placeholder={
                    isRtl
                      ? "ابحث بالاسم، رقم الهاتف، أو البريد الإلكتروني..."
                      : "Search customer by name, phone, or email..."
                  }
                  className="pl-9 rtl:pl-3 rtl:pr-9 rounded-xl border-border/60 bg-background text-xs"
                />
                {isLoadingCustomers && (
                  <Loader2 className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showSearchDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSearchDropdown(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-56 overflow-y-auto rounded-2xl border border-border bg-popover p-1.5 shadow-xl">
                    {customerOptions.length === 0 ? (
                      <div className="py-4 text-center text-xs text-muted-foreground">
                        {isLoadingCustomers
                          ? isRtl
                            ? "جاري البحث..."
                            : "Searching customers..."
                          : isRtl
                            ? "لم يتم العثور على عملاء مطابقين"
                            : "No matching customers found"}
                      </div>
                    ) : (
                      customerOptions.map(c => {
                        const isAlreadySelected = selectedCustomers.some(
                          sel => sel.id === c.id
                        );
                        const cName =
                          c.full_name ||
                          `${c.first_name || ""} ${c.last_name || ""}`.trim() ||
                          c.company_name ||
                          `Customer #${c.id}`;

                        return (
                          <div
                            key={c.id}
                            onClick={() => {
                              if (!isAlreadySelected) handleAddCustomer(c);
                            }}
                            className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              isAlreadySelected
                                ? "bg-muted/60 opacity-60 cursor-not-allowed"
                                : "hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 font-bold text-xs">
                                {cName.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold truncate text-foreground">
                                  {cName}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground truncate">
                                  {c.phone && (
                                    <span className="flex items-center gap-1 font-mono">
                                      <Phone className="h-2.5 w-2.5" />
                                      {c.phone}
                                    </span>
                                  )}
                                  {c.email && (
                                    <span className="truncate">
                                      {c.email}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div>
                              {isAlreadySelected ? (
                                <Badge variant="outline" className="text-[10px]">
                                  {isRtl ? "تم الاختيار" : "Added"}
                                </Badge>
                              ) : (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 text-xs text-primary font-bold"
                                >
                                  + {isRtl ? "إضافة" : "Add"}
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Template Presets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{isRtl ? "نماذج رسائل جاهزة" : "Quick Presets"}</span>
          </label>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>
              {isPreviewOpen
                ? isRtl
                  ? "إخفاء المعاينة"
                  : "Hide Preview"
                : isRtl
                  ? "معاينة الرسالة"
                  : "Preview Message"}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectTemplate(tpl)}
              className="text-xs font-medium px-3 py-1.5 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted hover:border-border transition-all text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <span>{isRtl ? tpl.titleAr : tpl.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {isRtl ? "عنوان الموضوع *" : "Subject *"}
          </label>
          <span className="text-[11px] text-muted-foreground font-mono">
            {subject.length} / 150
          </span>
        </div>
        <Input
          type="text"
          required
          maxLength={150}
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder={
            isRtl
              ? "مثال: تحديث أسعار الشحن البحري"
              : "e.g., Ocean Freight Rate Update"
          }
          className="rounded-2xl border-border/60 font-medium"
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {isRtl ? "نص الرسالة *" : "Message Content *"}
          </label>
          <span className="text-[11px] text-muted-foreground font-mono">
            {message.length} {isRtl ? "حرف" : "chars"}
          </span>
        </div>
        <Textarea
          rows={5}
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={
            isRtl
              ? "عزيزنا العميل، نود إحاطتكم علماً بتحديث جداول الإبحار وأسعار الشحن البحري للأسبوع القادم..."
              : "Dear Valued Customer, please be advised of our updated sailing schedules and ocean freight rates..."
          }
          className="rounded-2xl border-border/60 leading-relaxed text-sm resize-y min-h-[120px]"
        />
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <FaWhatsapp className="h-3 w-3" /> WhatsApp
          </span>
          <span>+</span>
          <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
            <Mail className="h-3 w-3" /> Email
          </span>
          <span className="text-muted-foreground/60">
            • {isRtl ? "يتم الإرسال تلقائياً عبر كلتا القناتين" : "Automatically dispatched via both channels"}
          </span>
        </div>
      </div>

      {/* Live Preview Box */}
      {isPreviewOpen && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <FaWhatsapp className="h-4 w-4" />
            <span>
              {isRtl ? "معاينة الرسالة (كما ستظهر للعميل):" : "Dispatch Preview:"}
            </span>
          </div>

          <div className="rounded-2xl bg-card border border-border/70 p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-border/40 pb-2 text-xs">
              <span className="font-bold text-foreground truncate max-w-[280px]">
                {subject || (isRtl ? "(بدون عنوان)" : "(No Subject)")}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {isRtl ? "الآن" : "Just now"}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap text-foreground leading-relaxed">
              {message || (isRtl ? "(اكتب نص الرسالة أعلاه لعرض المعاينة)" : "(Type message text above to preview)")}
            </p>
            <div className="flex items-center justify-end gap-1 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>GlobFreight</span>
              <CheckCheck className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl px-5"
          >
            {isRtl ? "إلغاء" : "Cancel"}
          </Button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl gap-2 font-semibold px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{isRtl ? "جاري الإرسال..." : "Sending..."}</span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <FaWhatsapp className="h-4 w-4" />
                <Mail className="h-3.5 w-3.5" />
              </div>
              <span>
                {isRtl
                  ? sendToAll
                    ? "إرسال للجميع الآن"
                    : "إرسال الآن"
                  : sendToAll
                    ? "Broadcast to All"
                    : "Send Now"}
              </span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
