"use client";

import { useState } from "react";
import TableBasic from "@/components/common/table/TableBasic";
import { SentEmailsColumns } from "../SentEmailsColumns";
import { SentEmailPreviewModal } from "./SentEmailPreviewModal";
import { SentEmailItem } from "../types";
import { useTranslations } from "next-intl";

interface SentEmailsTableWrapperProps {
  data: SentEmailItem[];
  total?: number;
}

export function SentEmailsTableWrapper({ data, total }: SentEmailsTableWrapperProps) {
  const t = useTranslations();
  const [selectedEmail, setSelectedEmail] = useState<SentEmailItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenEmail = (email: SentEmailItem) => {
    setSelectedEmail(email);
    setIsModalOpen(true);
  };

  const columns = SentEmailsColumns({
    onViewEmail: handleOpenEmail
  });

  return (
    <>
      <TableBasic
        data={data as unknown as Record<string, unknown>[]}
        columns={columns}
        pagination={{
          total: total ?? data.length
        }}
        tableActions={{
          onDelete: ["adminSentEmails"]
        }}
        cardHeader={t("SentEmails")}
        createNewLink="/sent-emails/create"
        filters={[
          { name: "recipient_email", type: "text", width: 3 },
          { name: "subject", type: "text", width: 3 }
        ]}
      />

      <SentEmailPreviewModal
        email={selectedEmail}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmail(null);
        }}
      />
    </>
  );
}
