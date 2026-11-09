# Services Module API Integration Guide

> **Target Audience:** Frontend Developer / AI Assistant  
> **Topic:** Integration documentation for the new **Services Module** (Public Website & Admin Dashboard) with multilingual support, images, and polymorphic SEO integration.

---

## 📌 Overview

The **Services Module** provides full management for company services with:
- Multilingual content (`name`, `slug`, `short_description`, `description`, `features`) via Spatie.
- Language-specific images & ALT texts.
- Polymorphic SEO metadata (with localized `canonical_url`, OpenGraph, Twitter cards, schema markup).
- Hierarchy support (parent/child sub-services).
- Auto 301 redirection on slug changes.

---

## 🌐 Public Website Endpoints

### 1. List Public Services
- **Endpoint:** `GET /api/services`
- **Headers:** `Accept: application/json`, `Accept-Language: en` (or `ar`, `nl`, `fr`, `de`)
- **Query Params:**
  - `page` (integer, optional)
  - `search` (string, optional) - searches name & slug in current language
  - `is_featured` (boolean `1` or `0`, optional) - filter featured services for home page
  - `parent_id` (integer, optional) - filter by parent service

#### Sample Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Ocean Freight Forwarding",
      "slug": "ocean-freight-forwarding",
      "short_description": "Reliable global sea freight solutions.",
      "description": "<p>Full container load (FCL) and less than container load (LCL)...</p>",
      "icon": "lucide-ship",
      "features": [
        "FCL & LCL shipping",
        "Port-to-port and door-to-door delivery",
        "Customs clearance support"
      ],
      "is_active": true,
      "is_featured": true,
      "order": 1,
      "published_locales": ["en", "ar"],
      "parent_id": null,
      "image": "https://api.globfreight.com/storage/1/ocean-freight.jpg",
      "image_alt": "Ocean freight container vessel",
      "parent": null,
      "children": [],
      "seo": {
        "id": 15,
        "meta_title": "Ocean Freight Services | GlobFreight",
        "meta_description": "Global sea freight services with real-time tracking.",
        "focus_keyphrase": "ocean freight shipping",
        "canonical_url": "https://globfreight.com/en/services/ocean-freight-forwarding",
        "schema_markup_type": "Service",
        "schema_markup": null,
        "og_title": "Ocean Freight Services",
        "og_description": "Global sea freight services.",
        "og_image": null,
        "og_image_alt": null,
        "twitter_title": null,
        "twitter_description": null,
        "twitter_image": null,
        "twitter_card": "summary_large_image",
        "meta_robots": "index, follow",
        "keywords": ["ocean freight", "sea cargo"],
        "faq_ids": [],
        "faqs": []
      },
      "created_at": "2026-11-08T18:30:00.000000Z",
      "updated_at": "2026-11-08T18:30:00.000000Z"
    }
  ],
  "links": {},
  "meta": {}
}
```

---

### 2. Get Service by Slug
- **Endpoint:** `GET /api/services/slug/{slug}`
- **Headers:** `Accept: application/json`, `Accept-Language: en` (or `ar`, etc.)

> **Note on 301 Redirects:** If the slug was changed by the admin, the API returns a redirect object:
> ```json
> {
>   "is_redirect": true,
>   "new_slug": "new-ocean-freight-slug",
>   "redirect_url": "https://api.globfreight.com/services/slug/new-ocean-freight-slug",
>   "data": { ... }
> }
> ```
> In SSR (Next.js/Nuxt), handle this by performing a permanent redirect to `/services/{new_slug}`.

---

## 🛠️ Admin Dashboard Endpoints (Protected)

**Base URL Prefix:** `/api/admin/services`  
**Required Headers:**
- `Accept: application/json`
- `Authorization: Bearer {token}`

---

### 1. List All Services (Admin)
- **Endpoint:** `GET /api/admin/services`
- Returns all services (active and inactive) with all translations preloaded.

---

### 2. Get Single Service (Admin)
- **Endpoint:** `GET /api/admin/services/{id}`
- Returns full multilingual object (e.g. `name: { en: "...", ar: "..." }`) ready for form binding.

---

### 3. Create Service
- **Endpoint:** `POST /api/admin/services`
- **Content-Type:** `multipart/form-data` or `application/json`

#### Payload Example:
```json
{
  "name": {
    "en": "Air Freight Services",
    "ar": "خدمات الشحن الجوي"
  },
  "slug": {
    "en": "air-freight-services",
    "ar": "khadamat-alshahn-aljawiy"
  },
  "short_description": {
    "en": "Fast and secure air freight worldwide.",
    "ar": "شحن جوي سريع وآمن لجميع أنحاء العالم."
  },
  "description": {
    "en": "<p>Full details about air freight options...</p>",
    "ar": "<p>تفاصيل كاملة عن خيارات الشحن الجوي...</p>"
  },
  "icon": "lucide-plane",
  "features": {
    "en": ["Next-flight-out", "Temperature-controlled cargo", "Global door-to-door"],
    "ar": ["أول رحلة متاحة", "شحن مبرد وتحكم بدرجات الحرارة", "توصيل من الباب للباب"]
  },
  "is_active": true,
  "is_featured": true,
  "order": 1,
  "parent_id": null,
  "published_locales": ["en", "ar"],
  "image_alt": {
    "en": "Air cargo airplane loading",
    "ar": "طائرة شحن جوي أثناء التحميل"
  },
  "seo": {
    "meta_title": {
      "en": "Air Freight Services | GlobFreight",
      "ar": "خدمات الشحن الجوي | جلوب فريت"
    },
    "meta_description": {
      "en": "Fast global air freight cargo services.",
      "ar": "خدمات شحن جوي سريعة وموثوقة."
    },
    "focus_keyphrase": {
      "en": "air cargo",
      "ar": "شحن جوي"
    },
    "canonical_url": {
      "en": "https://globfreight.com/en/services/air-freight-services",
      "ar": "https://globfreight.com/ar/services/air-freight-services"
    },
    "schema_markup_type": "Service",
    "meta_robots": "index, follow"
  }
}
```

> **For File Uploads (`image`):** Send as `multipart/form-data`:
> - `image[en]`: File
> - `image[ar]`: File
> - (Or single `image`: File if same image is used for all languages)

---

### 4. Update Service
- **Endpoint:** `POST /api/admin/services/{id}`
- Same payload structure as Create.

---

### 5. Quick Status Toggle
- **Endpoint:** `PATCH /api/admin/services/{id}/status`
- **Body:**
  ```json
  {
    "is_active": false
  }
  ```

---

### 6. Delete Service
- **Endpoint:** `DELETE /api/admin/services/{id}`

