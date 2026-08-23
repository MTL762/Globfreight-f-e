"use client";
import Image from "next/image";
// Import Swiper React components

// Import Swiper styles
// import 'swiper/css';
import { useTranslations } from "next-intl";
import "swiper/swiper-bundle.css";
import SwiperImage from "./SwiperImage";
const API_IMG_URL = process.env.NEXT_PUBLIC_API_IMG_URL as string;
function ImageSection({ images }: { images: { url: string; key: string }[] }) {
  const t = useTranslations();
  return images.length == 1 ? (
    <div>
      {images.map((image, index) => (
        <div className="flex flex-col gap-4 items-start" key={index}>
          <h1 style={{ fontWeight: "700" }}>{t(image?.key)}</h1>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingBottom: "56.25%",
              overflow: "hidden",
              zIndex: 1
            }}
          >
            <Image
              src={`${API_IMG_URL}${image?.url}` || ""}
              objectFit="cover"
              layout="fill"
              className="z-0"
              alt="package"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <SwiperImage images={images} />
  );
}

export default ImageSection;
