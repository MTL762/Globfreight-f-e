// components/LanguageDropdown.tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdLanguage } from "react-icons/md";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLocale = (newLocale: string) => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const path = url.split("/")[1];
    const newUrl = url.replace(path, newLocale);
    router.push(newUrl);
  };

  const handleToggleLocale = () => {
    const currentLocale = pathname.split("/")[1] || "en";
    const nextLocale = currentLocale === "ar" ? "en" : "ar";
    changeLocale(nextLocale);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={handleToggleLocale}
        className="flex items-center justify-center w-8 h-8 rounded hover:bg-primary/20 cursor-pointer"
      >
        <MdLanguage className="text-2xl text-gray-500" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
