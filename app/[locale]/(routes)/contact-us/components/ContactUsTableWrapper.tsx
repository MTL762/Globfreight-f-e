"use client";

import React, { useState } from "react";
import TableBasic from "@/components/common/table/TableBasic";
import { ContactUsColumns } from "../ContactUsColumns";
import { ContactReplyModal } from "./ContactReplyModal";
import { ContactMessage } from "../types";
import { useTranslations } from "next-intl";

interface ContactUsTableWrapperProps {
  data: ContactMessage[];
  total?: number;
}

export function ContactUsTableWrapper({ data, total }: ContactUsTableWrapperProps) {
  const t = useTranslations();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReply = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const columns = ContactUsColumns({
    onViewReply: handleOpenReply
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
          onDelete: ["adminContactUs"]
        }}
        cardHeader={t("ContactUs")}
        hideCreateNew={true}
        filters={[
          { name: "name", type: "text", width: 3 },
          { name: "email", type: "text", width: 3 },
          {
            name: "status",
            type: "select",
            options: [
              { label: "All", value: "" },
              { label: "Unread", value: "unread" },
              { label: "Read", value: "read" },
              { label: "Replied", value: "replied" },
              { label: "Archived", value: "archived" }
            ],
            width: 3
          }
        ]}
      />

      <ContactReplyModal
        message={selectedMessage}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }}
      />
    </>
  );
}
