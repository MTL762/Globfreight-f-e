import fs from "node:fs";
import path from "node:path";

/**
 * Sitemap generator script.
 * Generates static public/sitemap.xml at build time or on-demand.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *   node scripts/generate-sitemap.mjs https://cliktec.com
 *   NEXT_PUBLIC_SITE_URL=https://cliktec.com node scripts/generate-sitemap.mjs
 */

const LOCALES = ["en", "ar", "es", "de", "tr", "nl", "fr"];
const DEFAULT_LOCALE = "en";

const ROUTES = [
	{ path: "/site", priority: "1.0", changefreq: "weekly" },
	{ path: "/site/plans", priority: "0.9", changefreq: "monthly" },
	{ path: "/site/faq", priority: "0.8", changefreq: "monthly" },
];

function getOrigin() {
	const cliArg = process.argv[2];
	const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
	const candidate = cliArg || envUrl || "https://cliktec.com";
	return candidate.replace(/\/+$/, "");
}

function localizedUrl(origin, locale, routePath) {
	const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
	return `${origin}/${locale}${normalized === "/" ? "" : normalized}`;
}

function generateSitemapXml() {
	const origin = getOrigin();
	const lastmod = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
	xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

	let totalUrls = 0;

	for (const route of ROUTES) {
		for (const locale of LOCALES) {
			const pageUrl = localizedUrl(origin, locale, route.path);
			const defaultUrl = localizedUrl(origin, DEFAULT_LOCALE, route.path);

			xml += "  <url>\n";
			xml += `    <loc>${pageUrl}</loc>\n`;
			xml += `    <lastmod>${lastmod}</lastmod>\n`;
			xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
			xml += `    <priority>${route.priority}</priority>\n`;

			for (const altLocale of LOCALES) {
				const altUrl = localizedUrl(origin, altLocale, route.path);
				xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />\n`;
			}
			xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;

			xml += "  </url>\n";
			totalUrls++;
		}
	}

	xml += "</urlset>\n";

	const publicDir = path.join(process.cwd(), "public");
	if (!fs.existsSync(publicDir)) {
		fs.mkdirSync(publicDir, { recursive: true });
	}

	const outputPath = path.join(publicDir, "sitemap.xml");
	fs.writeFileSync(outputPath, xml, "utf-8");

	console.log(`[sitemap] Successfully generated ${outputPath}`);
	console.log(`[sitemap] Origin: ${origin}`);
	console.log(
		`[sitemap] Total URLs: ${totalUrls} (${ROUTES.length} routes x ${LOCALES.length} locales)`,
	);
}

generateSitemapXml();
