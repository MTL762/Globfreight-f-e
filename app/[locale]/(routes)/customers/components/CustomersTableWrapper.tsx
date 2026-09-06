"use client";

import { useState } from "react";
import TableBasic from "@/components/common/table/TableBasic";
import CustomersColumns from "../CustomersColumns";
import { SendWhatsappMailModal } from "./SendWhatsappMailModal";
import { TargetCustomerInfo } from "./SendWhatsappMailForm";
import { customers } from "../types";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface CustomersTableWrapperProps {
  data: customers[];
  total?: number;
  cardHeader?: string;
}

export function CustomersTableWrapper({
  data,
  total,
  cardHeader
}: CustomersTableWrapperProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "ar";

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<TargetCustomerInfo | null>(null);
  const [isBroadcast, setIsBroadcast] = useState(false);

  // Trigger modal for a single customer from row
  const handleOpenSendMessage = (customer: TargetCustomerInfo) => {
    setSelectedCustomer(customer);
    setIsBroadcast(false);
    setIsModalOpen(true);
  };

  // Trigger broadcast modal for all / bulk
  const handleOpenBroadcastModal = () => {
    setSelectedCustomer(null);
    setIsBroadcast(true);
    setIsModalOpen(true);
  };

  const columns = CustomersColumns({
    onSendMessage: handleOpenSendMessage
  });

  return (
    <>
      <div className="space-y-4">
        {/* Quick Bulk Action Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <div className="relative">
                <FaWhatsapp className="h-5 w-5" />
                <Mail className="h-3 w-3 absolute -bottom-1 -right-1 text-teal-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                {isRtl ? "مراسلة العملاء (واتساب وبريد)" : "Customer Messaging (WhatsApp & Email)"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {isRtl
                  ? "أرسل تحديثات الأسعار وجداول الإبحار لجميع العملاء أو اختر عملاء محددين"
                  : "Broadcast rate updates and sailing schedules to all or selected customers"}
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleOpenBroadcastModal}
            className="rounded-xl gap-2 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95"
            size="sm"
          >
            <div className="flex items-center gap-1">
              <FaWhatsapp className="h-4 w-4" />
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span>
              {isRtl ? "إرسال رسالة جماعية" : "Send WhatsApp & Email"}
            </span>
          </Button>
        </div>

        <TableBasic
          data={data as unknown as Record<string, unknown>[]}
          columns={columns}
          pagination={{
            total: total ?? data.length
          }}
          tableActions={{
            onEdit: true,
            onDelete: ["adminCustomers"]
          }}
          cardHeader={cardHeader || t("Customers")}
          filters={[{ name: "name", type: "text", width: 3 }]}
        />
      </div>

      <SendWhatsappMailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        targetCustomer={selectedCustomer}
        initialSendToAll={isBroadcast}
        onSuccess={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
          router.refresh();
        }}
      />
    </>
  );
}
