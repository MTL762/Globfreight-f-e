"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TfiBackRight } from "react-icons/tfi";
function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()}>
      <TfiBackRight />
    </Button>
  );
}

export default BackButton;
