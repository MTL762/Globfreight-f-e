"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function BackArrow() {
  const locale = useLocale();
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className=" bg-gray-200 rounded-full p-2">
      {locale === "ar" ? <IoIosArrowBack size={22} /> : <IoIosArrowForward size={22} />}
    </button>
  );
}

export default BackArrow;
