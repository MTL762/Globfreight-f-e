"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
function CreateNewLink() {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <Link href={`${pathname}/create`}>
      <Button className="bg-black">{t("Create New")}</Button>
    </Link>
  );
}

export default CreateNewLink;
