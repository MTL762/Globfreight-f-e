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
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
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

async function fetchCategoriesAcrossLocales() {
  const categoryMap = new Map();

  await Promise.all(
    LOCALES.map(async (loc) => {
      try {
        const url = `${API_BASE_URL}/categories`;
        const res = await fetch(url, {
          headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc }
        });
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json?.data) ? json.data : [];
          for (const cat of items) {
            if (!cat?.id) continue;
            const existing = categoryMap.get(cat.id) || {
              slugs: {},
              lastmod: cat.updated_at || new Date().toISOString()
            };
            const catSlug = typeof cat.slug === "object" && cat.slug !== null
              ? cat.slug[loc] || cat.slug.en || cat.slug.ar || Object.values(cat.slug)[0]
              : cat.slug || String(cat.id);

            if (catSlug) existing.slugs[loc] = catSlug;
            if (cat.updated_at) existing.lastmod = cat.updated_at;
            categoryMap.set(cat.id, existing);
          }
        }
      } catch (err) {
        console.warn(chalk.yellow(`⚠️ Could not fetch categories for locale ${loc}: ${err.message}`));
      }
    })
  );

  return categoryMap;
}

async function fetchBlogPostsAcrossLocales() {
  const postMap = new Map();

  await Promise.all(
    LOCALES.map(async (loc) => {
      try {
        const url = `${API_BASE_URL}/blog-posts?per_page=100`;
        const res = await fetch(url, {
          headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc }
        });
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json?.data) ? json.data : [];
          for (const post of items) {
            if (!post?.id) continue;
            const existing = postMap.get(post.id) || {
              slugs: {},
              lastmod: post.updated_at || post.published_at || post.created_at || new Date().toISOString()
            };
            const postSlug = typeof post.slug === "object" && post.slug !== null
              ? post.slug[loc] || post.slug.en || post.slug.ar || Object.values(post.slug)[0]
              : post.slug || String(post.id);

            if (postSlug) existing.slugs[loc] = postSlug;
            if (post.updated_at || post.published_at) {
              existing.lastmod = post.updated_at || post.published_at;
            }
            postMap.set(post.id, existing);
          }
        }
      } catch (err) {
        console.warn(chalk.yellow(`⚠️ Could not fetch blog posts for locale ${loc}: ${err.message}`));
      }
    })
  );

  return postMap;
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

  // 2. Dynamic Categories across all locales
  const categoryMap = await fetchCategoriesAcrossLocales();
  console.log(chalk.green(`✓ Processed ${categoryMap.size} category entries across all locales`));

  for (const [, { slugs, lastmod }] of categoryMap.entries()) {
    const defaultSlug = slugs.en || Object.values(slugs)[0];
    if (!defaultSlug) continue;

    const alternates = LOCALES.map((locale) => {
      const locSlug = slugs[locale] || defaultSlug;
      return {
        locale,
        url: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(decodeURIComponent(locSlug))}`
      };
    });
    alternates.push({
      locale: "x-default",
      url: `${SITE_URL}/${DEFAULT_LOCALE}/blog/category/${encodeURIComponent(decodeURIComponent(defaultSlug))}`
    });

    const categoryDate = formatDate(lastmod || buildDate);

    for (const locale of LOCALES) {
      const locSlug = slugs[locale] || defaultSlug;
      items.push({
        loc: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(decodeURIComponent(locSlug))}`,
        alternates,
        lastmod: categoryDate,
        changefreq: "weekly",
        priority: "0.8"
      });
    }
  }

  // 3. Dynamic Blog Posts across all locales
  const postMap = await fetchBlogPostsAcrossLocales();
  console.log(chalk.green(`✓ Processed ${postMap.size} blog post entries across all locales`));

  for (const [, { slugs, lastmod }] of postMap.entries()) {
    const defaultSlug = slugs.en || Object.values(slugs)[0];
    if (!defaultSlug) continue;

    const alternates = LOCALES.map((locale) => {
      const locSlug = slugs[locale] || defaultSlug;
      return {
        locale,
        url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(decodeURIComponent(locSlug))}`
      };
    });
    alternates.push({
      locale: "x-default",
      url: `${SITE_URL}/${DEFAULT_LOCALE}/blog/${encodeURIComponent(decodeURIComponent(defaultSlug))}`
    });

    const postDate = formatDate(lastmod || buildDate);

    for (const locale of LOCALES) {
      const locSlug = slugs[locale] || defaultSlug;
      items.push({
        loc: `${SITE_URL}/${locale}/blog/${encodeURIComponent(decodeURIComponent(locSlug))}`,
        alternates,
        lastmod: postDate,
        changefreq: "weekly",
        priority: "0.7"
      });
    }
  }

  // 4. Assemble complete XML
  const xmlContent = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    items.map(buildXmlItem).join("\n"),
    `</urlset>`,
    ""
  ].join("\n");

  // 5. Output path
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
