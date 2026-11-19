const fs = require("fs");
const path = require("path");

const dictionary = {
  save_all_changes: {
    ar: "حفظ جميع التغييرات",
    en: "Save All Changes",
    es: "Guardar todos los cambios",
    de: "Alle Änderungen speichern",
    tr: "Tüm Değişiklikleri Kaydet",
    nl: "Alle wijzigingen opslaan",
    fr: "Enregistrer toutes les modifications"
  },
  localized_meta_tags: {
    ar: "وسوم الميتا متعددة اللغات",
    en: "Localized Meta Tags",
    es: "Etiquetas meta localizadas",
    de: "Lokalisierte Meta-Tags",
    tr: "Yerelleştirilmiş Meta Etiketleri",
    nl: "Gelokaliseerde metatags",
    fr: "Balises méta localisées"
  },
  configure_meta_titles_descriptions_in_both_languages: {
    ar: "تهيئة عناوين وأوصاف الميتا باللغتين العربية والإنجليزية",
    en: "Configure meta titles and descriptions in both Arabic and English",
    es: "Configure títulos y descripciones meta en ambos idiomas",
    de: "Konfigurieren Sie Meta-Titel und -Beschreibungen in beiden Sprachen",
    tr: "Her iki dilde meta başlıklarını ve açıklamalarını yapılandırın",
    nl: "Configureer metatitels en -beschrijvingen in beide talen",
    fr: "Configurer les méta-titres et descriptions dans les deux langues"
  },
  focus_keyphrase: {
    ar: "الكلمة المفتاحية المستهدفة",
    en: "Focus Keyphrase",
    es: "Frase clave objetivo",
    de: "Fokus-Schlüsselwort",
    tr: "Odak Anahtar Kelime",
    nl: "Focus trefwoord",
    fr: "Requête cible"
  },
  primary_target_search_term: {
    ar: "الكلمة المفتاحية المستهدفة لمحركات البحث",
    en: "Primary target search term",
    es: "Término de búsqueda objetivo principal",
    de: "Primärer Zielsuchbegriff",
    tr: "Birincil hedef arama terimi",
    nl: "Primair doelzoekterm",
    fr: "Terme de recherche cible principal"
  },
  meta_title: {
    ar: "عنوان الميتا (Meta Title)",
    en: "Meta Title",
    es: "Meta título",
    de: "Meta-Titel",
    tr: "Meta Başlığı",
    nl: "Metatitel",
    fr: "Méta-titre"
  },
  chars: {
    ar: "حرف",
    en: "chars",
    es: "caracteres",
    de: "Zeichen",
    tr: "karakter",
    nl: "tekens",
    fr: "caractères"
  },
  recommended_title_length_info: {
    ar: "الطول الموصى به: 50-60 حرفاً لأفضل ظهور في محركات البحث",
    en: "Recommended: 50-60 chars for best display on search engines",
    es: "Recomendado: 50-60 caracteres para mejor visualización",
    de: "Empfohlen: 50-60 Zeichen für beste Darstellung",
    tr: "Önerilen: En iyi görünüm için 50-60 karakter",
    nl: "Aanbevolen: 50-60 tekens voor de beste weergave",
    fr: "Recommandé: 50-60 caractères pour un affichage optimal"
  },
  meta_description: {
    ar: "وصف الميتا (Meta Description)",
    en: "Meta Description",
    es: "Meta descripción",
    de: "Meta-Beschreibung",
    tr: "Meta Açıklaması",
    nl: "Metabeschrijving",
    fr: "Méta-description"
  },
  recommended_desc_length_info: {
    ar: "الطول الموصى به: 150-160 حرفاً للظهور الكامل في مقتطف البحث",
    en: "Recommended: 150-160 chars for full search snippet visibility",
    es: "Recomendado: 150-160 caracteres para fragmentos de búsqueda",
    de: "Empfohlen: 150-160 Zeichen für Such-Snippets",
    tr: "Önerilen: Arama sonuçlarında görünüm için 150-160 karakter",
    nl: "Aanbevolen: 150-160 tekens voor volledige zoekfragmenten",
    fr: "Recommandé: 150-160 caractères pour les snippets de recherche"
  },
  google_serp_preview: {
    ar: "معاينة نتائج بحث جوجل",
    en: "Google SERP Preview",
    es: "Vista previa de Google SERP",
    de: "Google SERP-Vorschau",
    tr: "Google SERP Önizlemesi",
    nl: "Google SERP-voorbeeld",
    fr: "Aperçu Google SERP"
  },
  keywords_tag_input_description: {
    ar: "الكلمات المفتاحية لمساعدة محركات البحث",
    en: "Keywords tag input description",
    es: "Palabras clave para ayudar a los motores de búsqueda",
    de: "Schlüsselwörter zur Unterstützung von Suchmaschinen",
    tr: "Arama motorlarına yardımcı olacak anahtar kelimeler",
    nl: "Trefwoorden om zoekmachines te helpen",
    fr: "Mots-clés pour aider les moteurs de recherche"
  },
  type_keyword_and_press_enter: {
    ar: "اكتب الكلمة المفتاحية ثم اضغط Enter",
    en: "Type keyword and press Enter",
    es: "Escriba la palabra clave y presione Enter",
    de: "Schlüsselwort eingeben und Enter drücken",
    tr: "Anahtar kelimeyi yazın ve Enter tuşuna basın",
    nl: "Typ trefwoord en druk op Enter",
    fr: "Tapez le mot-clé et appuyez sur Entrée"
  },
  add_keyword: {
    ar: "إضافة كلمة مفتاحية",
    en: "Add Keyword",
    es: "Añadir palabra clave",
    de: "Schlüsselwort hinzufügen",
    tr: "Anahtar Kelime Ekle",
    nl: "Trefwoord toevoegen",
    fr: "Ajouter un mot-clé"
  },
  no_keywords_added_yet: {
    ar: "لم يتم إضافة كلمات مفتاحية بعد",
    en: "No keywords added yet",
    es: "Aún no se han añadido palabras clave",
    de: "Noch keine Schlüsselwörter hinzugefügt",
    tr: "Henüz anahtar kelime eklenmedi",
    nl: "Nog geen trefwoorden toegevoegd",
    fr: "Aucun mot-clé ajouté pour le moment"
  },
  open_graph_social_sharing: {
    ar: "مشاركة Open Graph ومواقع التواصل",
    en: "Open Graph & Social Sharing",
    es: "Open Graph y compartir en redes sociales",
    de: "Open Graph & Social Sharing",
    tr: "Open Graph ve Sosyal Paylaşım",
    nl: "Open Graph & Sociaal delen",
    fr: "Open Graph et partage social"
  },
  customize_how_links_appear_on_facebook_twitter_linkedin: {
    ar: "تخصيص مظهر الروابط عند مشاركتها على فيسبوك وتويتر ولينكد إن",
    en: "Customize how links appear on Facebook, Twitter, and LinkedIn",
    es: "Personalice cómo aparecen los enlaces en Facebook, Twitter y LinkedIn",
    de: "Passen Sie an, wie Links auf Facebook, Twitter und LinkedIn erscheinen",
    tr: "Bağlantıların Facebook, Twitter ve LinkedIn'de nasıl görüneceğini özelleştirin",
    nl: "Pas aan hoe links verschijnen op Facebook, Twitter en LinkedIn",
    fr: "Personnalisez l'apparence des liens sur Facebook, Twitter et LinkedIn"
  },
  og_title: {
    ar: "عنوان المشاركة (OG Title)",
    en: "Social Card Title (og:title)",
    es: "Título de la tarjeta social (og:title)",
    de: "Social-Card-Titel (og:title)",
    tr: "Sosyal Kart Başlığı (og:title)",
    nl: "Sociaal kaarttitel (og:title)",
    fr: "Titre de carte sociale (og:title)"
  },
  social_card_title: {
    ar: "عنوان بطاقة المشاركة",
    en: "Social Card Title",
    es: "Título de la tarjeta social",
    de: "Social-Card-Titel",
    tr: "Sosyal Kart Başlığı",
    nl: "Sociaal kaarttitel",
    fr: "Titre de carte sociale"
  },
  og_description: {
    ar: "وصف المشاركة (OG Description)",
    en: "Social Card Snippet (og:description)",
    es: "Descripción de la tarjeta social (og:description)",
    de: "Social-Card-Beschreibung (og:description)",
    tr: "Sosyal Kart Açıklaması (og:description)",
    nl: "Sociaal kaartbeschrijving (og:description)",
    fr: "Description de la carte sociale (og:description)"
  },
  social_card_snippet: {
    ar: "مقتطف بطاقة المشاركة",
    en: "Social Card Snippet",
    es: "Fragmento de la tarjeta social",
    de: "Social-Card-Ausschnitt",
    tr: "Sosyal Kart Özeti",
    nl: "Sociaal kaartfragment",
    fr: "Extrait de carte sociale"
  },
  og_image_url: {
    ar: "رابط صورة المشاركة (OG Image)",
    en: "Social Image URL (og:image)",
    es: "URL de imagen social (og:image)",
    de: "Social-Image-URL (og:image)",
    tr: "Sosyal Görsel URL (og:image)",
    nl: "Sociaal afbeeldings-URL (og:image)",
    fr: "URL d'image sociale (og:image)"
  },
  recommended_og_image_specs: {
    ar: "المقاس الموصى به: 1200×630 بكسل بنسبة 1.91:1",
    en: "Recommended: 1200x630 pixels at 1.91:1 aspect ratio",
    es: "Recomendado: 1200x630 píxeles con relación 1.91:1",
    de: "Empfohlen: 1200x630 Pixel bei 1,91:1 Seitenverhältnis",
    tr: "Önerilen: 1,91:1 oranında 1200x630 piksel",
    nl: "Aanbevolen: 1200x630 pixels met 1,91:1 beeldverhouding",
    fr: "Recommandé: 1200x630 pixels au ratio 1,91:1"
  },
  social_card_preview: {
    ar: "معاينة بطاقة المشاركة الاجتماعية",
    en: "Social Card Preview",
    es: "Vista previa de la tarjeta social",
    de: "Social-Card-Vorschau",
    tr: "Sosyal Kart Önizlemesi",
    nl: "Sociaal kaartvoorbeeld",
    fr: "Aperçu de la carte sociale"
  },
  unable_to_load_preview_image: {
    ar: "تعذر تحميل صورة المعاينة",
    en: "Unable to load preview image",
    es: "No se puede cargar la imagen de vista previa",
    de: "Vorschaubild konnte nicht geladen werden",
    tr: "Önizleme resmi yüklenemiyor",
    nl: "Kan voorbeeldafbeelding niet laden",
    fr: "Impossible de charger l'image d'aperçu"
  },
  no_og_image_provided: {
    ar: "لم يتم توفير صورة مشاركة",
    en: "No social image provided",
    es: "No se proporcionó imagen social",
    de: "Kein Social-Bild angegeben",
    tr: "Sosyal görsel sağlanmadı",
    nl: "Geen sociale afbeelding opgegeven",
    fr: "Aucune image sociale fournie"
  },
  general_meta_tags: {
    ar: "وسوم الميتا العامة",
    en: "General Meta Tags",
    es: "Etiquetas meta generales",
    de: "Allgemeine Meta-Tags",
    tr: "Genel Meta Etiketleri",
    nl: "Algemene metatags",
    fr: "Balises méta générales"
  },
  open_graph_social: {
    ar: "وسوم التواصل الاجتماعي (Open Graph)",
    en: "Open Graph & Social",
    es: "Open Graph y social",
    de: "Open Graph & Social",
    tr: "Open Graph ve Sosyal",
    nl: "Open Graph & Sociaal",
    fr: "Open Graph et social"
  },
  technical_and_schema: {
    ar: "البيانات الفنية والمنظمة (Schema)",
    en: "Technical & Schema",
    es: "Técnico y Schema",
    de: "Technisch & Schema",
    tr: "Teknik ve Şema",
    nl: "Technisch & Schema",
    fr: "Technique et Schema"
  },
  crawler_and_indexing_controls: {
    ar: "إرشادات الفهرسة وعناكب البحث",
    en: "Crawler & Indexing Controls",
    es: "Controles de indexación y rastreo",
    de: "Crawler- & Indexierungssteuerung",
    tr: "Tarayıcı ve İndeksleme Kontrolleri",
    nl: "Crawler- & indexeringsbediening",
    fr: "Contrôles d'indexation et d'exploration"
  },
  manage_canonical_links_and_crawler_indexing_directives: {
    ar: "إدارة الروابط الأساسية وإرشادات فهرسة محركات البحث",
    en: "Manage canonical links and crawler indexing directives",
    es: "Gestione enlaces canónicos y directivas de rastreo",
    de: "Kanonische Links und Indexierungsanweisungen verwalten",
    tr: "Kanonik bağlantıları ve indeksleme yönergelerini yönetin",
    nl: "Beheer canonieke links en indexeringsrichtlijnen",
    fr: "Gérer les liens canoniques et directives d'indexation"
  },
  canonical_url: {
    ar: "الرابط الأساسي (Canonical URL)",
    en: "Canonical URL",
    es: "URL canónica",
    de: "Kanonische URL",
    tr: "Kanonik URL",
    nl: "Canonieke URL",
    fr: "URL canonique"
  },
  canonical_url_hint: {
    ar: "حدد الرابط الأصلي لتجنب مشاكل المحتوى المكرر",
    en: "Specify the preferred version of this page to avoid duplicate content",
    es: "Especifique la versión preferida para evitar contenido duplicado",
    de: "Geben Sie die bevorzugte Version an, um Duplicate Content zu vermeiden",
    tr: "Yinelenen içeriği önlemek için tercih edilen sürümü belirtin",
    nl: "Geef de voorkeursversie op om dubbele inhoud te voorkomen",
    fr: "Spécifiez la version préférée pour éviter le contenu dupliqué"
  },
  meta_robots_directive: {
    ar: "توجيهات روبوتات الفهرسة (Meta Robots)",
    en: "Meta Robots Directive",
    es: "Directiva de Meta Robots",
    de: "Meta-Robots-Direktive",
    tr: "Meta Robots Yönergesi",
    nl: "Meta Robots-richtlijn",
    fr: "Directive Meta Robots"
  },
  select_meta_robots: {
    ar: "اختر توجيه روبوتات الفهرسة",
    en: "Select Meta Robots",
    es: "Seleccionar Meta Robots",
    de: "Meta-Robots auswählen",
    tr: "Meta Robots Seçin",
    nl: "Selecteer Meta Robots",
    fr: "Sélectionner Meta Robots"
  },
  meta_robots_hint: {
    ar: "تحديد ما إذا كان يجب لمحركات البحث فهرسة الصفحة وتتبع روابطها",
    en: "Instruct search engines whether to index this page and follow its links",
    es: "Instruya a los motores si deben indexar esta página y seguir enlaces",
    de: "Weisen Sie Suchmaschinen an, ob diese Seite indexiert werden soll",
    tr: "Arama motorlarına bu sayfayı indeksleyip bağlantıları takip etmelerini söyleyin",
    nl: "Geef aan of zoekmachines deze pagina moeten indexeren en links moeten volgen",
    fr: "Indiquez aux moteurs s'ils doivent indexer cette page et suivre les liens"
  },
  schema_structured_data: {
    ar: "البيانات المنظمة (Schema Markup)",
    en: "Schema Structured Data",
    es: "Datos estructurados Schema",
    de: "Strukturierte Schema-Daten",
    tr: "Şema Yapılandırılmış Verileri",
    nl: "Schema gestructureerde gegevens",
    fr: "Données structurées Schema"
  },
  rich_snippets_and_knowledge_graph_json_ld_markup: {
    ar: "ترميز JSON-LD للمقتطفات المميزة والرسوم البيانية المعرفية",
    en: "Rich snippets & Knowledge Graph JSON-LD markup",
    es: "Marcado JSON-LD para fragmentos enriquecidos y Knowledge Graph",
    de: "Rich Snippets & Knowledge Graph JSON-LD-Markup",
    tr: "Zengin snippet'lar ve Knowledge Graph için JSON-LD biçimlendirmesi",
    nl: "Rich snippets & Knowledge Graph JSON-LD-opmaak",
    fr: "Balisage JSON-LD pour les résultats enrichis et Knowledge Graph"
  },
  format_json: {
    ar: "تنسيق JSON",
    en: "Format JSON",
    es: "Formatear JSON",
    de: "JSON formatieren",
    tr: "JSON'u Biçimlendir",
    nl: "JSON opmaken",
    fr: "Formater JSON"
  },
  reset_template: {
    ar: "استعادة القالب الافتراضي",
    en: "Reset Template",
    es: "Restablecer plantilla",
    de: "Vorlage zurücksetzen",
    tr: "Şablonu Sıfırla",
    nl: "Sjabloon resetten",
    fr: "Réinitialiser le modèle"
  },
  schema_markup_type: {
    ar: "نوع الـ Schema",
    en: "Schema Markup Type",
    es: "Tipo de Schema",
    de: "Schema-Typ",
    tr: "Şema Türü",
    nl: "Schema-type",
    fr: "Type de Schema"
  },
  select_schema_type: {
    ar: "اختر نوع الـ Schema",
    en: "Select Schema Type",
    es: "Seleccionar tipo de Schema",
    de: "Schema-Typ auswählen",
    tr: "Şema Türünü Seçin",
    nl: "Selecteer schema-type",
    fr: "Sélectionner le type de Schema"
  },
  json_ld_schema_editor: {
    ar: "محرر JSON-LD Schema",
    en: "JSON-LD Schema Editor",
    es: "Editor de Schema JSON-LD",
    de: "JSON-LD Schema-Editor",
    tr: "JSON-LD Şema Düzenleyici",
    nl: "JSON-LD Schema-editor",
    fr: "Éditeur de schéma JSON-LD"
  },
  invalid_json_syntax: {
    ar: "خطأ في بنية JSON",
    en: "Invalid JSON syntax",
    es: "Sintaxis JSON no válida",
    de: "Ungültige JSON-Syntax",
    tr: "Geçersiz JSON sözdizimi",
    nl: "Ongeldige JSON-syntaxis",
    fr: "Syntaxe JSON non valide"
  },
  valid_json_ld: {
    ar: "صيغة JSON-LD صحيحة",
    en: "Valid JSON-LD",
    es: "JSON-LD válido",
    de: "Gültiges JSON-LD",
    tr: "Geçerli JSON-LD",
    nl: "Geldige JSON-LD",
    fr: "JSON-LD valide"
  },
  json_formatted_successfully: {
    ar: "تم تنسيق JSON بنجاح",
    en: "JSON formatted successfully",
    es: "JSON formateado con éxito",
    de: "JSON erfolgreich formatiert",
    tr: "JSON başarıyla biçimlendirildi",
    nl: "JSON succesvol opgemaakt",
    fr: "JSON formaté avec succès"
  },
  invalid_json_format: {
    ar: "صيغة JSON غير صحيحة",
    en: "Invalid JSON format",
    es: "Formato JSON no válido",
    de: "Ungültiges JSON-Format",
    tr: "Geçersiz JSON biçimi",
    nl: "Ongeldige JSON-indeling",
    fr: "Format JSON non valide"
  },
  json_reset_to_default: {
    ar: "تمت استعادة قالب JSON الافتراضي",
    en: "JSON reset to default",
    es: "JSON restablecido al valor predeterminado",
    de: "JSON auf Standard zurückgesetzt",
    tr: "JSON varsayılana sıfırlandı",
    nl: "JSON hersteld naar standaard",
    fr: "JSON réinitialisé par défaut"
  },
  fix_schema_json_errors_before_saving: {
    ar: "يرجى تصحيح أخطاء الـ JSON قبل الحفظ",
    en: "Please fix schema JSON errors before saving",
    es: "Por favor corrija los errores de JSON antes de guardar",
    de: "Bitte beheben Sie die JSON-Fehler vor dem Speichern",
    tr: "Lütfen kaydetmeden önce şema JSON hatalarını düzeltin",
    nl: "Corrigeer schema JSON-fouten voor het opslaan",
    fr: "Veuillez corriger les erreurs JSON avant d'enregistrer"
  },
  please_check_required_fields: {
    ar: "يرجى التحقق من الحقول المطلوبة",
    en: "Please check required fields",
    es: "Por favor verifique los campos requeridos",
    de: "Bitte überprüfen Sie die erforderlichen Felder",
    tr: "Lütfen gerekli alanları kontrol edin",
    nl: "Controleer de vereiste velden",
    fr: "Veuillez vérifier les champs obligatoires"
  },
  settings_updated_successfully: {
    ar: "تم تحديث الإعدادات بنجاح",
    en: "Settings updated successfully",
    es: "Configuración actualizada con éxito",
    de: "Einstellungen erfolgreich aktualisiert",
    tr: "Ayarlar başarıyla güncellendi",
    nl: "Instellingen succesvol bijgewerkt",
    fr: "Paramètres mis à jour avec succès"
  },
  login_hero_description: {
    ar: "منصة الخدمات اللوجستية المتكاملة لإدارة الشحنات والتخليص الجمركي",
    en: "Integrated logistics platform for cargo management & customs clearance",
    es: "Plataforma logística integrada para gestión de carga y despacho",
    de: "Integrierte Logistikplattform für Frachtmanagement & Zollabfertigung",
    tr: "Kargo yönetimi ve gümrükleme için entegre lojistik platformu",
    nl: "Geïntegreerd logistiek platform voor vrachtbeheer en douaneafhandeling",
    fr: "Plateforme logistique intégrée pour la gestion de fret et dédouanement"
  },
  failed_to_update_settings: {
    ar: "فشل تحديث الإعدادات",
    en: "Failed to update settings",
    es: "Error al actualizar la configuración",
    de: "Fehler beim Aktualisieren der Einstellungen",
    tr: "Ayarlar güncellenemedi",
    nl: "Instellingen bijwerken mislukt",
    fr: "Échec de la mise à jour des paramètres"
  },
  "Service.Name": {
    ar: "اسم الخدمة",
    en: "Service Name",
    es: "Nombre del servicio",
    de: "Servicename",
    tr: "Hizmet Adı",
    nl: "Servicenaam",
    fr: "Nom du service"
  },
  "Receiver sharing is available, but sender information is restricted.": {
    ar: "مشاركة المستلم متاحة، لكن معلومات المرسل مقيدة.",
    en: "Receiver sharing is available, but sender information is restricted.",
    es: "El intercambio del destinatario está disponible, pero la información del remitente está restringida.",
    de: "Empfängerfreigabe ist verfügbar, aber Absenderinformationen sind eingeschränkt.",
    tr: "Alıcı paylaşımı mevcut, ancak gönderici bilgileri kısıtlıdır.",
    nl: "Ontvanger delen is beschikbaar, maar afzenderinformatie is beperkt.",
    fr: "Le partage avec le destinataire est disponible, mais les informations de l'expéditeur sont restreintes."
  },
  "Sender sharing is available, but receiver information is restricted.": {
    ar: "مشاركة المرسل متاحة، لكن معلومات المستلم مقيدة.",
    en: "Sender sharing is available, but receiver information is restricted.",
    es: "El intercambio del remitente está disponible, pero la información del destinatario está restringida.",
    de: "Absenderfreigabe ist verfügbar, aber Empfängerinformationen sind eingeschränkt.",
    tr: "Gönderici paylaşımı mevcut, ancak alıcı bilgileri kısıtlıdır.",
    nl: "Afzender delen is beschikbaar, maar ontvangerinformatie is beperkt.",
    fr: "Le partage avec l'expéditeur est disponible, mais les informations du destinataire sont restreintes."
  },
  "Select which party you want to share the tracking QR code with.": {
    ar: "حدد الطرف الذي تريد مشاركة رمز الاستجابة السريعة للتتبع معه.",
    en: "Select which party you want to share the tracking QR code with.",
    es: "Seleccione con qué parte desea compartir el código QR de seguimiento.",
    de: "Wählen Sie aus, mit welcher Partei Sie den Tracking-QR-Code teilen möchten.",
    tr: "Takip QR kodunu hangi tarafla paylaşmak istediğinizi seçin.",
    nl: "Selecteer met welke partij u de tracking QR-code wilt delen.",
    fr: "Sélectionnez avec quelle partie vous souhaitez partager le code QR de suivi."
  },
  taskUsers_status: {
    ar: "حالة المهمة",
    en: "Task Status",
    es: "Estado de la tarea",
    de: "Aufgabenstatus",
    tr: "Görev Durumu",
    nl: "Taakstatus",
    fr: "Statut de la tâche"
  },
  users_user_id: {
    ar: "المستخدم",
    en: "User",
    es: "Usuario",
    de: "Benutzer",
    tr: "Kullanıcı",
    nl: "Gebruiker",
    fr: "Utilisateur"
  },
  users_assigned_by: {
    ar: "المسؤول",
    en: "Assigned By",
    es: "Asignado por",
    de: "Zugewiesen von",
    tr: "Atayan",
    nl: "Toegewezen door",
    fr: "Attribué par"
  },
  "search with title": {
    ar: "ابحث بالعنوان",
    en: "Search with title",
    es: "Buscar por título",
    de: "Nach Titel suchen",
    tr: "Başlığa göre ara",
    nl: "Zoeken op titel",
    fr: "Rechercher par titre"
  },
  "Validations.fileTooLarge": {
    ar: "حجم الملف كبير جداً",
    en: "File is too large",
    es: "El archivo es demasiado grande",
    de: "Datei ist zu groß",
    tr: "Dosya çok büyük",
    nl: "Bestand is te groot",
    fr: "Le fichier est trop volumineux"
  },
  "Validations.invalidFileType": {
    ar: "نوع الملف غير صالح",
    en: "Invalid file type",
    es: "Tipo de archivo no válido",
    de: "Ungültiger Dateityp",
    tr: "Geçersiz dosya türü",
    nl: "Ongeldig bestandstype",
    fr: "Type de fichier non valide"
  },
  Auth: {
    ar: {},
    en: {},
    es: {},
    de: {},
    tr: {},
    nl: {},
    fr: {}
  },
  "/text-editor": {
    ar: {},
    en: {},
    es: {},
    de: {},
    tr: {},
    nl: {},
    fr: {}
  },
  "/tableActions/TableActions": {
    ar: "غير محدد",
    en: "undefined",
    es: "indefinido",
    de: "undefiniert",
    tr: "tanımlanmamış",
    nl: "ongedefinieerd",
    fr: "indéfini"
  },
  "/tableHelperComponents/ExpandableRow": {
    ar: "غير محدد",
    en: "undefined",
    es: "indefinido",
    de: "undefiniert",
    tr: "tanımlanmamış",
    nl: "ongedefinieerd",
    fr: "indéfini"
  },
  "/tableHelperComponents/TablePagination": {
    ar: "غير محدد",
    en: "undefined",
    es: "indefinido",
    de: "undefiniert",
    tr: "tanımlanmamış",
    nl: "ongedefinieerd",
    fr: "indéfini"
  },
  "/notification/Notifications": {
    ar: "غير محدد",
    en: "undefined",
    es: "indefinido",
    de: "undefiniert",
    tr: "tanımlanmamış",
    nl: "ongedefinieerd",
    fr: "indéfini"
  },
  name_ar: {
    ar: "الاسم (عربي)",
    en: "Name (Arabic)",
    es: "Nombre (árabe)",
    de: "Name (Arabisch)",
    tr: "Ad (Arapça)",
    nl: "Naam (Arabisch)",
    fr: "Nom (Arabe)"
  },
  name_en: {
    ar: "الاسم (إنجليزي)",
    en: "Name (English)",
    es: "Nombre (inglés)",
    de: "Name (Englisch)",
    tr: "Ad (İngilizce)",
    nl: "Naam (Engels)",
    fr: "Nom (Anglais)"
  },
  slug_ar: {
    ar: "المعرف / الرابط (عربي)",
    en: "Slug (Arabic)",
    es: "Slug (árabe)",
    de: "Slug (Arabisch)",
    tr: "Slug (Arapça)",
    nl: "Slug (Arabisch)",
    fr: "Slug (Arabe)"
  },
  slug_en: {
    ar: "المعرف / الرابط (إنجليزي)",
    en: "Slug (English)",
    es: "Slug (inglés)",
    de: "Slug (Englisch)",
    tr: "Slug (İngilizce)",
    nl: "Slug (Engels)",
    fr: "Slug (Anglais)"
  },
  title_ar: {
    ar: "العنوان (عربي)",
    en: "Title (Arabic)",
    es: "Título (árabe)",
    de: "Titel (Arabisch)",
    tr: "Başlık (Arapça)",
    nl: "Titel (Arabisch)",
    fr: "Titre (Arabe)"
  },
  title_en: {
    ar: "العنوان (إنجليزي)",
    en: "Title (English)",
    es: "Título (inglés)",
    de: "Titel (Englisch)",
    tr: "Başlık (İngilizce)",
    nl: "Titel (Engels)",
    fr: "Titre (Anglais)"
  },
  excerpt_ar: {
    ar: "المقتطف (عربي)",
    en: "Excerpt (Arabic)",
    es: "Extracto (árabe)",
    de: "Auszug (Arabisch)",
    tr: "Özet (Arapça)",
    nl: "Uittreksel (Arabisch)",
    fr: "Extrait (Arabe)"
  },
  excerpt_en: {
    ar: "المقتطف (إنجليزي)",
    en: "Excerpt (English)",
    es: "Extracto (inglés)",
    de: "Auszug (Englisch)",
    tr: "Özet (İngilizce)",
    nl: "Uittreksel (Engels)",
    fr: "Extrait (Anglais)"
  },
  content_ar: {
    ar: "المحتوى (عربي)",
    en: "Content (Arabic)",
    es: "Contenido (árabe)",
    de: "Inhalt (Arabisch)",
    tr: "İçerik (Arapça)",
    nl: "Inhoud (Arabisch)",
    fr: "Contenu (Arabe)"
  },
  content_en: {
    ar: "المحتوى (إنجليزي)",
    en: "Content (English)",
    es: "Contenido (inglés)",
    de: "Inhalt (Englisch)",
    tr: "İçerik (İngilizce)",
    nl: "Inhoud (Engels)",
    fr: "Contenu (Anglais)"
  },
  question_ar: {
    ar: "السؤال (عربي)",
    en: "Question (Arabic)",
    es: "Pregunta (árabe)",
    de: "Frage (Arabisch)",
    tr: "Soru (Arapça)",
    nl: "Vraag (Arabisch)",
    fr: "Question (Arabe)"
  },
  question_en: {
    ar: "السؤال (إنجليزي)",
    en: "Question (English)",
    es: "Pregunta (inglés)",
    de: "Frage (Englisch)",
    tr: "Soru (İngilizce)",
    nl: "Vraag (Engels)",
    fr: "Question (Anglais)"
  },
  answer_ar: {
    ar: "الجواب (عربي)",
    en: "Answer (Arabic)",
    es: "Respuesta (árabe)",
    de: "Antwort (Arabisch)",
    tr: "Cevap (Arapça)",
    nl: "Antwoord (Arabisch)",
    fr: "Réponse (Arabe)"
  },
  answer_en: {
    ar: "الجواب (إنجليزي)",
    en: "Answer (English)",
    es: "Respuesta (inglés)",
    de: "Antwort (Englisch)",
    tr: "Cevap (İngilizce)",
    nl: "Antwoord (Engels)",
    fr: "Réponse (Anglais)"
  },
  arabic_content: {
    ar: "المحتوى بالعربية",
    en: "Arabic Content",
    es: "Contenido en árabe",
    de: "Arabischer Inhalt",
    tr: "Arapça İçerik",
    nl: "Arabische inhoud",
    fr: "Contenu en arabe"
  },
  english_content: {
    ar: "المحتوى بالإنجليزية",
    en: "English Content",
    es: "Contenido en inglés",
    de: "Englischer Inhalt",
    tr: "İngilizce İçerik",
    nl: "Engelse inhoud",
    fr: "Contenu en anglais"
  },
  Category: {
    ar: "التصنيف الرئيسي",
    en: "Category",
    es: "Categoría",
    de: "Kategorie",
    tr: "Kategori",
    nl: "Categorie",
    fr: "Catégorie"
  },
  "Sub Category": {
    ar: "التصنيف الفرعي",
    en: "Sub Category",
    es: "Subcategoría",
    de: "Unterkategorie",
    tr: "Alt Kategori",
    nl: "Subcategorie",
    fr: "Sous-catégorie"
  },
  Featured: {
    ar: "مميز",
    en: "Featured",
    es: "Destacado",
    de: "Hervorgehoben",
    tr: "Öne Çıkan",
    nl: "Uitgelicht",
    fr: "Mis en avant"
  },
  Order: {
    ar: "الترتيب",
    en: "Order",
    es: "Orden",
    de: "Reihenfolge",
    tr: "Sıra",
    nl: "Volgorde",
    fr: "Ordre"
  },
  "Previous Contract": {
    ar: "عقد سابق",
    en: "Previous Contract",
    es: "Contrato anterior",
    de: "Vorheriger Vertrag",
    tr: "Önceki Sözleşme",
    nl: "Vorig contract",
    fr: "Contrat précédent"
  },
  "Not Editable": {
    ar: "غير قابل للتعديل",
    en: "Not Editable",
    es: "No editable",
    de: "Nicht bearbeitbar",
    tr: "Düzenlenemez",
    nl: "Niet bewerkbaar",
    fr: "Non modifiable"
  },
  "Leave Request Cannot Be Modified": {
    ar: "لا يمكن تعديل طلب الإجازة",
    en: "Leave Request Cannot Be Modified",
    es: "La solicitud de permiso no se puede modificar",
    de: "Urlaubsantrag kann nicht geändert werden",
    tr: "İzin Talebi Değiştirilemez",
    nl: "Verlofaanvraag kan niet worden gewijzigd",
    fr: "La demande de congé ne peut pas être modifiée"
  },
  "This request was submitted on an expired contract and cannot be edited": {
    ar: "تم تقديم هذا الطلب على عقد سابق منتهي ولا يمكن تعديله",
    en: "This request was submitted on an expired contract and cannot be edited",
    es: "Esta solicitud se envió sobre un contrato vencido y no se puede editar",
    de: "Dieser Antrag wurde für einen abgelaufenen Vertrag gestellt und kann nicht bearbeitet werden",
    tr: "Bu talep süresi dolmuş bir sözleşme üzerinden gönderildi ve düzenlenemez",
    nl: "Deze aanvraag is ingediend op een verlopen contract en kan niet worden bewerkt",
    fr: "Cette demande a été soumise sur un contrat expiré et ne peut pas être modifiée"
  },
  "This request has already been processed and cannot be edited": {
    ar: "تمت معالجة هذا الطلب بالفعل ولا يمكن تعديله",
    en: "This request has already been processed and cannot be edited",
    es: "Esta solicitud ya ha sido procesada y no se puede editar",
    de: "Dieser Antrag wurde bereits bearbeitet und kann nicht mehr geändert werden",
    tr: "Bu talep zaten işleme alındı ve düzenlenemez",
    nl: "Deze aanvraag is al verwerkt en kan niet meer worden bewerkt",
    fr: "Cette demande a déjà été traitée et ne peut pas être modifiée"
  },
  "Back to Leave Requests": {
    ar: "العودة إلى طلبات الإجازات",
    en: "Back to Leave Requests",
    es: "Volver a solicitudes de permiso",
    de: "Zurück zu Urlaubsanträgen",
    tr: "İzin Taleplerine Geri Dön",
    nl: "Terug naar verlofaanvragen",
    fr: "Retour aux demandes de congé"
  },
  "Payslip Period Filter": {
    ar: "تصفية فترة مفردات المرتب",
    en: "Payslip Period Filter",
    es: "Filtro de período de nómina",
    de: "Filter für Gehaltsabrechnungszeitraum",
    tr: "Maaş Bordrosu Dönem Filtresi",
    nl: "Filter voor loonstrookperiode",
    fr: "Filtre de période de fiche de paie"
  },
  "Filter payslip data by specific date range or view the current month": {
    ar: "تصفية بيانات مفردات المرتب بنطاق تاريخ محدد أو عرض الشهر الحالي",
    en: "Filter payslip data by specific date range or view the current month",
    es: "Filtre los datos de nómina por rango de fechas o vea el mes actual",
    de: "Gehaltsabrechnungsdaten nach Zeitraum filtern oder aktuellen Monat anzeigen",
    tr: "Maaş bordrosu verilerini belirli bir tarih aralığına göre filtreleyin veya geçerli ayı görüntüleyin",
    nl: "Filter loonstrookgegevens op datumbereik of bekijk de huidige maand",
    fr: "Filtrer les données de fiche de paie par plage de dates ou afficher le mois en cours"
  },
  "Current Month": {
    ar: "الشهر الحالي",
    en: "Current Month",
    es: "Mes actual",
    de: "Aktueller Monat",
    tr: "Bu Ay",
    nl: "Huidige maand",
    fr: "Mois en cours"
  },
  "Previous Month": {
    ar: "الشهر السابق",
    en: "Previous Month",
    es: "Mes anterior",
    de: "Vorheriger Monat",
    tr: "Önceki Ay",
    nl: "Vorige maand",
    fr: "Mois précédent"
  },
  "Reset Filter": {
    ar: "إعادة ضبط الفلتر",
    en: "Reset Filter",
    es: "Restablecer filtro",
    de: "Filter zurücksetzen",
    tr: "Filtreyi Sıfırla",
    nl: "Filter resetten",
    fr: "Réinitialiser le filtre"
  },
  "Total payout calculated after all deductions": {
    ar: "إجمالي الراتب الصافي بعد تطبيق جميع الاستقطاعات",
    en: "Total payout calculated after all deductions",
    es: "Pago total calculado después de todas las deducciones",
    de: "Gesamtauszahlung berechnet nach allen Abzügen",
    tr: "Tüm kesintilerden sonra hesaplanan toplam net ödeme",
    nl: "Totale uitbetaling berekend na alle inhoudingen",
    fr: "Paiement total calculé après toutes les déductions"
  },
  "Gross earnings": {
    ar: "الراتب الأساسي الإجمالي",
    en: "Gross earnings",
    es: "Ingresos brutos",
    de: "Bruttoverdienst",
    tr: "Brüt kazanç",
    nl: "Bruto inkomsten",
    fr: "Gains bruts"
  },
  "Insurance & contract terms": {
    ar: "استقطاعات التأمينات والبنود الثابتة",
    en: "Insurance & contract terms",
    es: "Seguros y términos del contrato",
    de: "Versicherung & Vertragsbedingungen",
    tr: "Sigorta ve sözleşme şartları",
    nl: "Verzekeringen & contractvoorwaarden",
    fr: "Assurance et conditions contractuelles"
  },
  "Late or early departures": {
    ar: "خصومات التأخير والمغادرة المبكرة",
    en: "Late or early departures",
    es: "Salidas tempranas o retrasos",
    de: "Verspätungen oder frühes Verlassen",
    tr: "Geç kalma veya erken çıkışlar",
    nl: "Te laat of vroeg vertrek",
    fr: "Retards ou départs anticipés"
  },
  "Days of unpaid absence": {
    ar: "أيام الإجازات والغياب غير المدفوع",
    en: "Days of unpaid absence",
    es: "Días de ausencia no remunerada",
    de: "Tage unbezahlter Abwesenheit",
    tr: "Ücretsiz izin ve devamsızlık günleri",
    nl: "Dagen onbetaald verlof",
    fr: "Jours d'absence non rémunérée"
  },
  "Salary Items": {
    ar: "بنود الراتب",
    en: "Salary Items",
    es: "Conceptos salariales",
    de: "Gehaltsbestandteile",
    tr: "Maaş Kalemleri",
    nl: "Salarisposten",
    fr: "Éléments de salaire"
  },
  "Fixed Deduction Items": {
    ar: "بنود الاستقطاعات الثابتة",
    en: "Fixed Deduction Items",
    es: "Conceptos de deducción fija",
    de: "Feste Abzugsposten",
    tr: "Sabit Kesinti Kalemleri",
    nl: "Vaste inhoudingsposten",
    fr: "Éléments de déduction fixe"
  },
  "Contract Validity": {
    ar: "سريان العقد",
    en: "Contract Validity",
    es: "Validez del contrato",
    de: "Vertragsgültigkeit",
    tr: "Sözleşme Geçerliliği",
    nl: "Geldigheid contract",
    fr: "Validité du contrat"
  },
  "View Current Month": {
    ar: "عرض الشهر الحالي",
    en: "View Current Month",
    es: "Ver mes actual",
    de: "Aktuellen Monat anzeigen",
    tr: "Geçerli Ayı Görüntüle",
    nl: "Bekijk huidige maand",
    fr: "Afficher le mois en cours"
  },
  "There is no payslip issued for the selected dates. Try selecting another month or contact HR.": {
    ar: "لم يتم إصدار مفردات مرتب للفترة المحددة. يرجى اختيار شهر آخر أو التواصل مع الموارد البشرية.",
    en: "There is no payslip issued for the selected dates. Try selecting another month or contact HR.",
    es: "No se ha emitido nómina para las fechas seleccionadas. Intente seleccionar otro mes o contacte a RR. HH.",
    de: "Für die ausgewählten Daten wurde keine Gehaltsabrechnung ausgestellt. Bitte wählen Sie einen anderen Monat oder kontaktieren Sie die Personalabteilung.",
    tr: "Seçilen tarihler için maaş bordrosu düzenlenmemiştir. Lütfen başka bir ay seçmeyi deneyin veya İK ile iletişime geçin.",
    nl: "Er is geen loonstrook uitgegeven voor de geselecteerde data. Probeer een andere maand te selecteren of neem contact op met HR.",
    fr: "Aucune fiche de paie n'a été émise pour les dates sélectionnées. Essayez de sélectionner un autre mois ou contactez les RH."
  },
  "Contract ID": {
    ar: "رقم العقد",
    en: "Contract ID",
    es: "ID del contrato",
    de: "Vertrags-ID",
    tr: "Sözleşme No",
    nl: "Contract-ID",
    fr: "ID du contrat"
  },
  Basic: {
    ar: "أساسي",
    en: "Basic",
    es: "Básico",
    de: "Basis",
    tr: "Temel",
    nl: "Basis",
    fr: "De base"
  },
  Payslip: {
    ar: "مفردات المرتب",
    en: "Payslip",
    es: "Nómina",
    de: "Gehaltsabrechnung",
    tr: "Maaş Bordrosu",
    nl: "Loonstrook",
    fr: "Fiche de paie"
  }
};

const locales = ["ar", "en", "es", "de", "tr", "nl", "fr"];

locales.forEach((loc) => {
  const filePath = path.join(__dirname, "..", "messages", `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  delete data[""];

  Object.keys(dictionary).forEach((key) => {
    if (dictionary[key][loc] !== undefined) {
      if (!(key in data)) {
        data[key] = dictionary[key][loc];
      }
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, "\t") + "\n", "utf-8");
});

console.log("Translation files updated successfully.");
