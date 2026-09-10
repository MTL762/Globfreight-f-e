import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/*/dashboard",
          "/*/dashboard/*",
          "/*/categories",
          "/*/categories/*",
          "/*/sub-categories",
          "/*/sub-categories/*",
          "/*/blog",
          "/*/blog/*",
          "/*/customers",
          "/*/customers/*",
          "/*/users",
          "/*/users/*",
          "/*/roles",
          "/*/roles/*",
          "/*/visitors",
          "/*/price-requests",
          "/*/sent-emails",
          "/*/sent-emails/*",
          "/*/contact-us",
          "/*/profile",
          "/*/signin",
          "/*/signup",
          "/*/forgot-password",
          "/*/reset-password",
          "/*/update-password",
          "/*/change-password",
          "/*/removeToken",
          "/*/CRUD-generator",
          "/*/postman-form-generator",
          "/*/formPage",
          "/*/form-crud-generator"
        ],
      },
    ],
    sitemap: "https://globfreight.com/sitemap.xml",
  };
}
