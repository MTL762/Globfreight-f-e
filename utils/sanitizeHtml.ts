/**
 * Sanitizes HTML content for articles and rich text boxes.
 * Blocks unsafe code (scripts, inline event handlers, javascript: URIs)
 * while strictly preserving all legitimate HTML tags and attributes:
 * - Headings: h1, h2, h3, h4, h5, h6
 * - Formatting: strong, b, em, i, u, s, mark, small, sub, sup
 * - Lists: ul, ol, li
 * - Tables: table, thead, tbody, tfoot, tr, th, td, caption
 * - Media & Links: a (href, target="_blank", rel="nofollow", etc.), img (src, alt, width, height, etc.)
 * - Blocks: p, blockquote, pre, code, div, span, hr, br, figure, figcaption
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  let clean = html;

  // 1. Remove <script> tags and any code enclosed within them
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 2. Remove <embed>, <object>, <applet> tags and their contents
  clean = clean.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");
  clean = clean.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  clean = clean.replace(/<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi, "");
  clean = clean.replace(/<\/?(embed|object|applet)\b[^>]*>/gi, "");

  // 3. Remove inline JavaScript event handlers (e.g. onload, onclick, onerror, onmouseover)
  // Matches on...="...", on...='...', or on...=something
  clean = clean.replace(/\s+on[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // 4. Neutralize javascript:, vbscript:, and data:text/html URIs in href, src, formaction
  clean = clean.replace(
    /(href|src|formaction)\s*=\s*(["'])\s*(?:javascript|vbscript|data:text\/html):[^"']*\2/gi,
    '$1="#"'
  );

  return clean;
}
