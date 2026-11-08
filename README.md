# SEO Canonical URL Localization Update

> **Target Audience:** Frontend Developer / AI Assistant  
> **Topic:** Handling Multilingual `canonical_url` in SEO Metadata across Dashboard (Admin) & Website (Public).

---

## 📌 Summary of Changes

The `canonical_url` field in the SEO metadata is now **localized (translatable per language)** using Spatie Translatable, consistent with other SEO fields (`meta_title`, `meta_description`, `og_title`, etc.).

---

## 1. Admin / Dashboard (Create & Update Payloads)

### 🔹 Previous Request Payload (Single String)
```json
{
  "seo": {
    "meta_title": {
      "en": "Logistics Title",
      "ar": "عنوان اللوجستيات"
    },
    "canonical_url": "https://globfreight.com/blog/logistics-post"
  }
}
```

### 🔹 Updated Request Payload (Localized Object)
`canonical_url` must now be sent as a multilingual object (or tabbed per language in forms):

```json
{
  "seo": {
    "meta_title": {
      "en": "Logistics Title",
      "ar": "عنوان اللوجستيات"
    },
    "canonical_url": {
      "en": "https://globfreight.com/en/blog/logistics-post",
      "ar": "https://globfreight.com/ar/blog/logistics-post",
      "nl": "https://globfreight.com/nl/blog/logistics-post",
      "fr": "https://globfreight.com/fr/blog/logistics-post",
      "de": "https://globfreight.com/de/blog/logistics-post"
    }
  }
}
```

> **Note:** If sending single string values per locale in separate language forms, it is still supported, but in the Admin panel it should be placed inside each language tab just like `meta_title`.

---

## 2. API Responses

### 🔹 Admin Responses (e.g., `GET /admin/blog-posts/{id}`)
Admin responses return all translations for form prefilling:

```json
{
  "data": {
    "seo": {
      "id": 10,
      "meta_title": {
        "en": "Logistics Title",
        "ar": "عنوان اللوجستيات"
      },
      "canonical_url": {
        "en": "https://globfreight.com/en/blog/logistics-post",
        "ar": "https://globfreight.com/ar/blog/logistics-post"
      }
    }
  }
}
```

### 🔹 Public Website Responses (e.g., `GET /blog-posts/slug/{slug}`)
Public endpoints automatically return the resolved canonical URL as a **string** for the currently requested language (via `Accept-Language` header):

```json
{
  "data": {
    "seo": {
      "id": 10,
      "meta_title": "Logistics Title",
      "canonical_url": "https://globfreight.com/en/blog/logistics-post"
    }
  }
}
```

> **Fallback Behavior:** If the admin leaves `canonical_url` empty for a language, the backend will automatically generate the canonical URL based on the model slug and language (e.g., `https://globfreight.com/{locale}/blog/{slug}`).

---

## 3. Frontend Action Items

1. **Admin Form / SEO Modal:**
   - Move the **Canonical URL** input into the language tabs (Arabic, English, French, Dutch, German) or bind it to `seo.canonical_url[locale]` instead of a single flat string `seo.canonical_url`.
   - Update form state / form schema (e.g., Yup, Zod, React Hook Form) to accept:
     ```ts
     canonical_url?: Record<string, string>;
     ```
2. **Public Website / SSR Head Tags:**
   - No breaking change on the public side: `response.data.seo.canonical_url` still resolves as a single string matching the active language for `<link rel="canonical" href="..." />`.

