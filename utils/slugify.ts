/**
 * Auto-generate a clean, lowercase, hyphenated slug per language
 * Supports English, Arabic, Dutch, French, German
 */
export function generateSlug(text: string): string {
  if (!text || typeof text !== "string") return "";

  return text
    .trim()
    .toLowerCase()
    // Normalize unicode to separate accents from base characters
    .normalize("NFD")
    // Remove diacritical marks (accents) for latin scripts
    .replace(/[\u0300-\u036f]/g, "")
    // Remove Arabic diacritics / tashkeel
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Replace spaces, underscores and dots with hyphens
    .replace(/[\s_.]+/g, "-")
    // Remove characters that aren't letters (latin or arabic), digits, or hyphens
    // Arabic unicode range: \u0600-\u06FF, \u0750-\u077F, \u08A0-\u08FF
    .replace(/[^\w\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF-]/g, "")
    // Collapse multiple hyphens into single hyphen
    .replace(/-+/g, "-")
    // Trim hyphens from beginning and end
    .replace(/^-+|-+$/g, "");
}
