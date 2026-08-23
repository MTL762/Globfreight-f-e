import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   ...(NEXT_IMAGE_URL
    //     ? [
    //         {
    //           protocol: "https",
    //           hostname: NEXT_IMAGE_URL.replace(/^https?:\/\//, "").replace()
    //         }
    //       ]
    //     : [])
    // ]
    unoptimized: true
  },
 

  // Custom error handling
};

export default withNextIntl((nextConfig));
