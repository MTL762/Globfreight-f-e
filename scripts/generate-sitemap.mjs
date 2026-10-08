import fs from "fs";
import path from "path";
import "dotenv/config";
import chalk from "chalk";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://globfreight.com").replace(/\/$/, "");
const API_BASE_URL = (process.env.API_BASE_URL || process.env.baseUrl || "https://api.globfreight.com").replace(/\/$/, "");
const LOCALES = ["en", "nl", "fr", "de", "ar"];
const DEFAULT_LOCALE = "en";

const STATIC_PAGES = [
  { path: "", changeFrequency: "weekly", priority: "1.0" },
  { path: "/services", changeFrequency: "monthly", priority: "0.9" },
  { path: "/ship-with-us", changeFrequency: "monthly", priority: "0.9" },
  { path: "/quote", changeFrequency: "monthly", priority: "0.9" },
  { path: "/about", changeFrequency: "monthly", priority: "0.8" },
  { path: "/contact", changeFrequency: "monthly", priority: "0.8" },
  { path: "/blog", changeFrequency: "weekly", priority: "0.8" }
];

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

function formatDate(date) {
  const d = date ? new Date(date) : new Date();
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

async function fetchBlogPosts() {
  const url = `${API_BASE_URL}/blog-posts?per_page=100`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(chalk.yellow(`⚠️ Blog API returned HTTP ${res.status}. Proceeding with static pages only.`));
      return [];
    }

    const data = await res.json();
    const posts = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    console.log(chalk.green(`✓ Fetched ${posts.length} blog post(s) from API`));
    return posts;
  } catch (err) {
    console.warn(chalk.yellow(`⚠️ Could not reach blog API (${url}): ${err.message}. Proceeding with static pages only.`));
    return [];
  }
}

function buildXmlItem({ loc, alternates, lastmod, changefreq, priority }) {
  const lines = [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`
  ];

  for (const alt of alternates) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="${alt.locale}" href="${escapeXml(alt.url)}" />`);
  }

  lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(`    <changefreq>${changefreq}</changefreq>`);
  lines.push(`    <priority>${priority}</priority>`);
  lines.push("  </url>");

  return lines.join("\n");
}

async function generateSitemap() {
  const startTime = Date.now();
  console.log(chalk.cyan(`\n🌐 Generating sitemap for ${SITE_URL}...`));

  const items = [];
  const buildDate = new Date().toISOString();

  // 1. Static pages across all locales
  for (const page of STATIC_PAGES) {
    const alternates = LOCALES.map((locale) => ({
      locale,
      url: `${SITE_URL}/${locale}${page.path}`
    }));
    alternates.push({
      locale: "x-default",
      url: `${SITE_URL}/${DEFAULT_LOCALE}${page.path}`
    });

    for (const locale of LOCALES) {
      const isDefault = locale === DEFAULT_LOCALE;
      const priority = isDefault ? page.priority : Math.max(0.2, (parseFloat(page.priority) - 0.05)).toFixed(2);

      items.push({
        loc: `${SITE_URL}/${locale}${page.path}`,
        alternates,
        lastmod: buildDate,
        changefreq: page.changeFrequency,
        priority: String(priority)
      });
    }
  }

  // 2. Dynamic Blog Posts
  const posts = await fetchBlogPosts();
  for (const post of posts) {
    if (!post?.slug && !post?.id) continue;

    const alternates = LOCALES.map((locale) => {
      const locSlug =
        typeof post.slug === "object" && post.slug !== null
          ? post.slug[locale] || post.slug.en || post.slug.ar || Object.values(post.slug)[0]
          : post.slug || post.id?.toString();
      return {
        locale,
        url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(decodeURIComponent(locSlug))}`
      };
    });
    const defaultSlug =
      typeof post.slug === "object" && post.slug !== null
        ? post.slug.en || Object.values(post.slug)[0]
        : post.slug || post.id?.toString();
    alternates.push({
      locale: "x-default",
      url: `${SITE_URL}/${DEFAULT_LOCALE}/blog/${encodeURIComponent(decodeURIComponent(defaultSlug))}`
    });

    const postDate = formatDate(post.updated_at || post.updatedAt || post.created_at || post.createdAt || buildDate);

    for (const locale of LOCALES) {
      const locSlug =
        typeof post.slug === "object" && post.slug !== null
          ? post.slug[locale] || post.slug.en || post.slug.ar || Object.values(post.slug)[0]
          : post.slug || post.id?.toString();
      if (!locSlug) continue;

      items.push({
        loc: `${SITE_URL}/${locale}/blog/${encodeURIComponent(decodeURIComponent(locSlug))}`,
        alternates,
        lastmod: postDate,
        changefreq: "weekly",
        priority: "0.7"
      });
    }
  }

  // 3. Assemble complete XML
  const xmlContent = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    items.map(buildXmlItem).join("\n"),
    `</urlset>`,
    ""
  ].join("\n");

  // 4. Output path
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(outputPath, xmlContent, "utf8");

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(chalk.green(`\n✅ Sitemap generated successfully!`));
  console.log(chalk.gray(`   Total URLs: ${items.length}`));
  console.log(chalk.gray(`   Output File: ${outputPath}`));
  console.log(chalk.gray(`   Duration: ${elapsed}s\n`));
}

generateSitemap().catch((err) => {
  console.error(chalk.red("❌ Failed to generate sitemap:"), err);
  process.exit(1);
});
