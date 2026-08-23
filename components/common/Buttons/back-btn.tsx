"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { IoReturnDownBackOutline } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  const locale = useLocale();
  return (
    <button
      style={{
        rotate: locale !== "ar" ? "180deg" : "0deg"
      }}
      onClick={() => {
        router.back();
      }}
    >
      <IoReturnDownBackOutline className="text-[20px] hover:text-primary" />
    </button>
  );
}
