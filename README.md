# SEO & Author Metadata Updates — Frontend Integration Guide

This document outlines the backend API specifications for **SEO**, **Multilingual Image Alt Text**, **Multilingual Tags**, **Language-Aware Publishing**, and **Author Bio** (E-E-A-T).

---

## 1. Complete List of SEO Inputs (`seo[...]`)

All entities supporting SEO (`BlogPost`, `Category`, `SubCategory`, etc.) accept the `seo` object with the following fields:

| Field Name | Type | Translatable? | Description & Allowed Values |
| :--- | :--- | :---: | :--- |
| `meta_title` | `string` / `object` |  Yes | Page title for search engines (`<title>`) |
| `meta_description` | `string` / `object` |  Yes | Page meta description |
| `focus_keyphrase` | `string` / `object` |  Yes | Primary targeted SEO focus keyword |
| `keywords` | `string` / `array` | ❌ No | List of keywords (string comma-separated or array) |
| `canonical_url` | `string` (URL) | ❌ No | Canonical URL (Optional - auto-generated if left empty) |
| `meta_robots` | `string` | ❌ No | Search engine indexing directives: e.g. `'index, follow'`, `'noindex, nofollow'` |
| `schema_markup_type` | `string` | ❌ No | Schema type name (e.g. `'Article'`, `'Service'`, `'FAQPage'`) |
| `schema_markup` | `string` / `object` | ❌ No | Custom JSON-LD schema markup code |
| `og_title` | `string` / `object` |  Yes | Open Graph title for social media (Facebook, LinkedIn, WhatsApp) |
| `og_description` | `string` / `object` |  Yes | Open Graph description |
| `og_image` | `string` (URL) | ❌ No | Open Graph image URL (recommended: 1200×630) |
| `og_image_alt` | `string` / `object` |  Yes | Descriptive alt text for Open Graph image |
| `twitter_card` | `string` | ❌ No | Card type: `'summary_large_image'` (default) or `'summary'` |
| `twitter_title` | `string` / `object` |  Yes | Twitter / X card title |
| `twitter_description` | `string` / `object` |  Yes | Twitter / X card description |
| `twitter_image` | `string` (URL) | ❌ No | Dedicated Twitter / X image URL |
| `faqs` | `Array<FAQ>` | ❌ No | FAQ array for auto-generating `FAQPage` schema |

> **Self-referencing Canonical URL:**  
> If `canonical_url` is not explicitly provided by the admin, the public API automatically resolves it using the entity's slug, language, and base domain.

---

## 2. Language-Aware Publishing (`published_locales`) & Multilingual Tags (`tags`)

### A. Publishing Control per Language
- In `BlogPost`, `status` controls overall lifecycle (`'draft'`, `'published'`, `'archived'`).
- The new `published_locales` array lets you specify which language versions are live for visitors:
  ```json
  "published_locales": ["en", "ar"]
  ```
- **Automatic Fallback:** If `published_locales` is omitted on publish, the backend automatically registers all locales that have a non-empty `title`.
- **Visitor Guard:** The public API (`/api/blog-posts`) only delivers articles that are published in the visitor's requested language (`Accept-Language`), preventing empty or untranslated pages.

### B. Multilingual Tags (`tags`)
Tags now support independent lists per language:
```json
{
  "tags": {
    "ar": ["شحن جوي", "لوجستيات", "تخليص جمركي"],
    "en": ["air freight", "logistics", "customs clearance"]
  }
}
```
Or in `multipart/form-data`:
- `tags[ar] = شحن جوي, لوجستيات`
- `tags[en] = air freight, logistics`

When requested publicly, `'tags'` returns only the array of tags for the current language.

---

## 3. Smart Auto Slug Generation

- When creating or editing articles and categories, slugs are automatically generated from each language's title (lowercase, trimmed UTF-8 hyphens `-`, duplicate detection `-1`, `-2`).
- If a translation title is not yet provided for a secondary language (e.g. Dutch), the backend intelligently derives the slug from the primary title rather than generating random letter strings.
- Admins can still optionally supply explicit custom slugs (`slug[ar]`, `slug[en]`).

---

## 4. Structure of `faqs`

```typescript
interface FAQItem {
  question: string;
  answer: string;
}
```

### In JSON:
```json
"faqs": [
  {
    "question": "What is air freight?",
    "answer": "Air freight is the transportation of cargo by aircraft."
  },
  {
    "question": "How long does shipping take?",
    "answer": "Usually 3 to 5 business days."
  }
]
```

### In `multipart/form-data`:
- `seo[faqs][0][question] = What is air freight?`
- `seo[faqs][0][answer] = Air freight is the transportation of cargo by aircraft.`
- `seo[faqs][1][question] = How long does shipping take?`
- `seo[faqs][1][answer] = Usually 3 to 5 business days.`

---

## 5. Entity Image Alt Text (`image_alt`)

Available directly on the root of entity requests (**BlogPost**, **Category**, **SubCategory**):

### In `multipart/form-data`:
- `image_alt[ar] = طائرة شحن بضائع`
- `image_alt[en] = Cargo shipping airplane`

### In `application/json`:
```json
{
  "image_alt": {
    "ar": "طائرة شحن بضائع",
    "en": "Cargo shipping airplane"
  }
}
```

---

## 6. Complete Request Payload Example (JSON)

```json
{
  "title": {
    "en": "Air Freight Services",
    "ar": "خدمات الشحن الجوي"
  },
  "content": {
    "en": "Air freight details...",
    "ar": "تفاصيل الشحن الجوي..."
  },
  "image_alt": {
    "en": "Air freight cargo airplane",
    "ar": "طائرة شحن بضائع جوية"
  },
  "status": "published",
  "published_locales": ["en", "ar"],
  "tags": {
    "en": ["air freight", "cargo", "logistics"],
    "ar": ["شحن جوي", "بضائع", "لوجستيات"]
  },
  "seo": {
    "meta_title": {
      "en": "Air Freight Services | GlobFreight",
      "ar": "خدمات الشحن الجوي | جلوب فرايت"
    },
    "meta_description": {
      "en": "Fast and reliable worldwide air freight solutions.",
      "ar": "حلول شحن جوي سريعة وموثوقة حول العالم."
    },
    "focus_keyphrase": {
      "en": "air freight shipping",
      "ar": "شحن جوي"
    },
    "keywords": "air freight, cargo, shipping, logistics",
    "meta_robots": "index, follow",
    "schema_markup_type": "Service",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Air Freight"
    },
    "og_title": {
      "en": "Best Air Freight Shipping",
      "ar": "أفضل خدمات الشحن الجوي"
    },
    "og_description": {
      "en": "Safe, fast, and competitive air freight.",
      "ar": "شحن جوي سريع وآمن وبأسعار منافسة."
    },
    "og_image": "https://globfreight.com/images/og-air.jpg",
    "og_image_alt": {
      "en": "Cargo plane loading cargo",
      "ar": "طائرة شحن بضائع"
    },
    "twitter_card": "summary_large_image",
    "twitter_title": {
      "en": "Air Freight Shipping",
      "ar": "الشحن الجوي الدولي"
    },
    "twitter_description": {
      "en": "Competitive rates and timely cargo delivery.",
      "ar": "أسعار تنافسية ومواعيد دقيقة للتسليم."
    },
    "twitter_image": "https://globfreight.com/images/twitter-air.jpg",
    "faqs": [
      {
        "question": "How fast is express air shipping?",
        "answer": "Express air shipping takes 1 to 3 business days."
      }
    ]
  }
}
```

---

## 7. Public API Response (`SeoResource` & `BlogPostResource`)

`GET /api/blog-posts/air-freight-services` (`Accept-Language: en`):
```json
{
  "id": 1,
  "title": "Air Freight Services",
  "slug": "air-freight-services",
  "content": "...",
  "status": "published",
  "published_locales": ["en", "ar"],
  "tags": ["air freight", "cargo", "logistics"],
  "image": "https://globfreight.com/storage/1/cover.webp",
  "image_alt": "Air freight cargo airplane",
  "author": {
    "id": 1,
    "name": "Sarah Ibrahim",
    "bio": "International logistics specialist with 10+ years of experience.",
    "avatar": "https://..."
  },
  "seo": {
    "meta_title": "Air Freight Services | GlobFreight",
    "meta_description": "Fast and reliable worldwide air freight solutions.",
    "focus_keyphrase": "air freight shipping",
    "canonical_url": "https://globfreight.com/en/blog/air-freight-services",
    "meta_robots": "index, follow",
    "schema_markup_type": "Service",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Air Freight"
    },
    "og_title": "Best Air Freight Shipping",
    "og_description": "Safe, fast, and competitive air freight.",
    "og_image": "https://globfreight.com/images/og-air.jpg",
    "og_image_alt": "Cargo plane loading cargo",
    "twitter_card": "summary_large_image",
    "twitter_title": "Air Freight Shipping",
    "twitter_description": "Competitive rates and timely cargo delivery.",
    "twitter_image": "https://globfreight.com/images/twitter-air.jpg",
    "keywords": ["air freight", "cargo", "shipping", "logistics"],
    "faqs": [
      {
        "question": "How fast is express air shipping?",
        "answer": "Express air shipping takes 1 to 3 business days."
      }
    ]
  }
}
```
