# خطوات فهرسة Google Search Console لـ Globfreight

1. **الرابط الرئيسي المجرّد `https://globfreight.com/`**:
   - هذا الرابط طبيعي جداً ألا يُفهرس بذاته وتظهر رسالة "صفحة تتضمن إعادة توجيه (Page with redirect)" لأن الموقع يوجه الزائر تلقائياً إلى `/en`.
   - محرك بحث Google يتبع التحويل ويفهرس الصفحات الفعلية.

2. **إرسال خريطة الموقع (Sitemap)**:
   - افتح Google Search Console → قسم **Sitemaps** (خرائط الموقع).
   - اكتب في الخانة: `sitemap.xml` (الرابط: `https://globfreight.com/sitemap.xml`).
   - اضغط **Submit** (إرسال). تم تحديثها برمجياً لتغطي 40 صفحة تشمل كل اللغات (`en`, `ar`, `nl`, `fr`, `de`) مع المقالات ورابط `x-default`.

3. **طلب الفهرسة اليدوي للصفحات الرئيسية**:
   - اذهب إلى **URL Inspection** (فحص عنوان URL) وافحص:
     - `https://globfreight.com/en`
     - `https://globfreight.com/ar`
     - `https://globfreight.com/en/services`
     - `https://globfreight.com/en/ship-with-us`
   - اضغط **Test Live URL** للتأكد ثم **Request Indexing**.