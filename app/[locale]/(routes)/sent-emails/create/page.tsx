import CustomHeader from "@/components/layouts/header/CustomHeader";
import { ComposeEmailForm } from "../components/ComposeEmailForm";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Compose Email | ${PROJECT_NAME}`,
    description: "Compose and dispatch direct emails to customers."
  };
}

export default function ComposeEmailPage() {
  return (
    <div className="space-y-6">
      <CustomHeader />
      <ComposeEmailForm />
    </div>
  );
}
