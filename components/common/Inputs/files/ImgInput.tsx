"use client";
import { ImageIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const API_IMG_URL = process.env.NEXT_PUBLIC_API_IMG_URL;
interface ImgInputProps {
  alt?: string;
  name?: string;
  value?: string | File | null;
  className?: string;
  onChange?: (e: File | undefined) => void;
  accept?: string;
  ratio?: string;
}

export default function ImgInput({
  alt,
  name,
  value,
  onChange,
  className,
  accept = "image/*",
  ratio = "1:1"
}: ImgInputProps): JSX.Element {
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const t = useTranslations();

  useEffect(() => {
    if (value && typeof value === "string") {
      const fullUrl =
        value.startsWith("http://") || value.startsWith("https://") || value.startsWith("blob:")
          ? value
          : (API_IMG_URL || "") + value;
      setPreviewUrl(fullUrl);
      setFileName(value.split("/").pop() || "");
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
      setFileName(value.name);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (!value) {
      setPreviewUrl("");
      setFileName("");
    }

    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [value]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    // Ensure file is actually a File object before creating URL
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      // Clean up previous URL if exists
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(objectUrl);
      onChange?.(file);
    } else {
      onChange?.(undefined);
    }
  };
  const ratioStep = 100;
  const [width, height] = ratio.split(":").map(Number);

  return (
    <div className={`flex flex-col-reverse justify-end gap-3 h-full ${className || ""}`}>
      <div className="flex justify-center items-center">
        <div
          className="relative w-full flex items-center justify-center rounded-xl border border-border/70 overflow-hidden bg-muted/40"
          style={{
            alignContent: "center",
            width: `${width * ratioStep}px`,
            height: `${height * ratioStep}px`
          }}
        >
          <div className="max-w-[250px] max-h-[350px] w-full h-full relative">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={alt || "Preview"}
                data-testid={name}
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                <ImageIcon className="size-10 text-muted-foreground/60" />
                {ratio && (
                  <span className="font-medium text-xs text-muted-foreground">
                    {t("ratio")}: <span className="text-primary font-semibold">{ratio}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <label
        className="flex items-center gap-3 p-2.5 border border-dashed border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/60 rounded-xl cursor-pointer transition-all duration-150"
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-background text-muted-foreground shadow-xs shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0 text-xs sm:text-sm">
          {fileName ? (
            <span className="text-foreground font-medium truncate block">{fileName}</span>
          ) : (
            <span className="text-muted-foreground">{t("Choose image file")}...</span>
          )}
        </div>
        <input
          type="file"
          name={name}
          onChange={handleChange}
          accept={accept}
          className="hidden"
          aria-label={alt || "Choose file"}
        />
      </label>
      {fileName && (
        <button
          onClick={() => {
            setFileName("");
            setPreviewUrl("");
            if (previewUrl && previewUrl.startsWith("blob:")) {
              URL.revokeObjectURL(previewUrl);
            }
            onChange?.(undefined);
          }}
          className="text-xs text-destructive hover:underline transition-colors font-medium self-end"
          type="button"
        >
          {t("Remove file")}
        </button>
      )}
    </div>
  );
}
