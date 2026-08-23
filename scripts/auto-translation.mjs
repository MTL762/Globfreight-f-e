import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import fs from "fs";
import path from "path";

// Configuration
const GEMINI_API_KEY = process.env.GOOGLE_AI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("API key not found. Please set API_GOOGLE_KEY in your .env file");
  process.exit(1);
}

// Languages to translate to/from
const languages = [
  { name: "English", code: "en" },
  { name: "Arabic", code: "ar" }
];

// Paths
const rootDir = process.cwd();
const messagesDir = path.join(rootDir, "messages"); // Next.js i18n messages folder
const appDir = path.join(rootDir, "components"); // Next.js app directory

// Translation settings
const TRANSLATION_SETTINGS = {
  maxRetries: 5,
  baseDelay: 2000,
  batchSize: 150 // Number of keys to translate in each batch
};

// Regular expressions for finding translation keys in different contexts
const regexPatterns = [
  /t\("([^"]+)"\)/g, // t("key")
  /t\('([^']+)'\)/g, // t('key')
  /useTranslations\("([^"]+)"\)/g, // useTranslations("key")
  /useTranslations\('([^']+)'\)/g, // useTranslations('key')
  /page\["([^"]+)"\]/g, // page["key"] in some implementations
  // More specific patterns to avoid capturing import paths:
  /(?<!import\s|from\s|require\()name:\s*"([^"]+)"/g, // name: "key" avoiding import statements
  /(?<!import\s|from\s|require\()title:\s*"([^"]+)"/g, // title: "key" avoiding import statements
  /(?<!import\s|from\s|require\()label:\s*"([^"]+)"/g, // label: "key" avoiding import statements
  /\{\s*t\("([^"]+)"\)\s*\}/g, // JSX: {t("key")}
  /\{\s*t\('([^']+)'\)\s*\}/g // JSX: {t('key')}
];

/**
 * Recursively find all TypeScript/JavaScript/TSX/JSX files
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (/\.(ts|js|tsx|jsx)$/.test(filePath)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

/**
 * Extract all translation keys from files
 */
function extractTranslationKeys(directory) {
  const files = getAllFiles(directory);
  const keys = new Set();

  files.forEach(file => {
    const content = fs.readFileSync(file, "utf8");

    // Apply all regex patterns to find keys
    for (const regex of regexPatterns) {
      let match;
      while ((match = regex.exec(content)) !== null) {
        if (match[1] && match[1].trim()) {
          keys.add(match[1].trim());
        }
      }
    }
  });

  return Array.from(keys);
}

/**
 * Process translation keys with Gemini API in batches
 */
async function translateTextBatch(texts, targetLang, attempt = 0) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Translate the following text keys to ${targetLang}. 
Respond with a valid JSON array containing only the translated strings in the same order. 
Do not include any explanation, only the JSON array. Keys: ${JSON.stringify(texts)}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Try to parse the JSON response
    try {
      // Handle potential surroundings like ```json and ```
      const jsonContent = responseText
        .replace(/^```json\s*/, "")
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
      return JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", responseText);
      console.error("Parse error:", parseError.message);

      if (attempt < TRANSLATION_SETTINGS.maxRetries - 1) {
        const delay = Math.min(TRANSLATION_SETTINGS.baseDelay * 2 ** attempt, 30000);
        console.warn(`JSON parse error. Retrying in ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return translateTextBatch(texts, targetLang, attempt + 1);
      }

      // Fallback to returning the original texts if we can't parse after retries
      return texts;
    }
  } catch (error) {
    if (
      (error.status === 429 || error.message.includes("rate")) &&
      attempt < TRANSLATION_SETTINGS.maxRetries - 1
    ) {
      const delay = Math.min(TRANSLATION_SETTINGS.baseDelay * 2 ** attempt, 30000);
      console.warn(`Rate limited. Retrying in ${delay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return translateTextBatch(texts, targetLang, attempt + 1);
    }
    console.error(`Error translating batch to ${targetLang}:`, error.message);
    return texts; // Return original text if translation fails
  }
}

/**
 * Generate translations for missing keys
 */
async function generateTranslations(keys, targetLang, existingTranslations) {
  const result = { ...existingTranslations };
  const missingKeys = keys.filter(key => !existingTranslations[key]);

  if (missingKeys.length === 0) {
    console.log(`✅ No new keys to translate for ${targetLang}`);
    return result;
  }

  console.log(`🔍 Found ${missingKeys.length} new keys to translate for ${targetLang}`);

  // Process in batches
  for (let i = 0; i < missingKeys.length; i += TRANSLATION_SETTINGS.batchSize) {
    const batch = missingKeys.slice(i, i + TRANSLATION_SETTINGS.batchSize);
    console.log(
      `📦 Processing batch ${Math.floor(i / TRANSLATION_SETTINGS.batchSize) + 1}/${Math.ceil(missingKeys.length / TRANSLATION_SETTINGS.batchSize)} (${batch.length} keys)`
    );

    const translatedTexts = await translateTextBatch(batch, targetLang);

    if (Array.isArray(translatedTexts) && translatedTexts.length === batch.length) {
      batch.forEach((key, index) => {
        result[key] = translatedTexts[index];
        console.log(`✅ ${key} → ${translatedTexts[index]}`);
      });
    } else {
      console.error(
        `❌ Failed to translate batch properly. Expected ${batch.length} translations, got ${translatedTexts?.length || 0}`
      );
      // Add untranslated keys with their original value
      batch.forEach(key => {
        result[key] = key;
      });
    }

    // Delay between batches to avoid rate limits
    if (i + TRANSLATION_SETTINGS.batchSize < missingKeys.length) {
      console.log(`⏳ Waiting before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return result;
}

/**
 * Main function
 */
(async () => {
  try {
    // Create messages directory if it doesn't exist
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    // Extract all keys from the application
    console.log("🔍 Extracting translation keys from codebase...");
    const allKeys = extractTranslationKeys(appDir);
    console.log(`📝 Found ${allKeys.length} unique translation keys`);

    // Create English translations (default language)
    const enFilePath = path.join(messagesDir, "en.json");
    let enTranslations = {};

    if (fs.existsSync(enFilePath)) {
      enTranslations = JSON.parse(fs.readFileSync(enFilePath, "utf8"));
    }

    // Update English with new keys (untranslated, using the key as value)
    allKeys.forEach(key => {
      if (!enTranslations[key]) {
        enTranslations[key] = key;
      }
    });

    // Save updated English translations
    fs.writeFileSync(enFilePath, JSON.stringify(enTranslations, null, 2));
    console.log(`✅ Updated English translations in: ${enFilePath}`);

    // Process other languages
    for (const { code, name } of languages.filter(lang => lang.code !== "en")) {
      const langFilePath = path.join(messagesDir, `${code}.json`);
      let langTranslations = {};

      if (fs.existsSync(langFilePath)) {
        langTranslations = JSON.parse(fs.readFileSync(langFilePath, "utf8"));
      }

      // Translate missing keys
      console.log(`🔄 Processing translations for ${name}...`);
      const updatedTranslations = await generateTranslations(allKeys, name, langTranslations);

      // Save updated translations
      fs.writeFileSync(langFilePath, JSON.stringify(updatedTranslations, null, 2));
      console.log(`✅ Updated ${name} translations in: ${langFilePath}`);
    }

    console.log("✨ Translation process completed successfully!");
  } catch (error) {
    console.error("❌ Translation process failed:", error);
    process.exit(1);
  }
})();
