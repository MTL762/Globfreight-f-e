const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error("API key not found. Please set the GOOGLE_AI_API_KEY environment variable.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// ------------------------
// Configuration
// ------------------------
const localesDir = path.join(__dirname, "messages");
const baseLanguage = "en";
const compareLanguage = "ar";
const baseFilePath = path.join(localesDir, `${baseLanguage}.json`);
const compareFilePath = path.join(localesDir, `${compareLanguage}.json`);
const appDir = path.join(__dirname, "app");

const TRANSLATION_SETTINGS = {
  maxRetries: 3,
  baseDelay: 1000,
  requestDelay: 1000
};

// ------------------------
// Utility Functions
// ------------------------

function getAllTranslationKeysFromApp(dir, allKeys = new Set()) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getAllTranslationKeysFromApp(fullPath, allKeys);
    } else if (/\.(tsx|ts)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");

      let namespace = null;
      const nsMatch = content.match(/useTranslations\(["'](.+?)["']\)/);
      if (nsMatch) {
        namespace = nsMatch[1];
      }

      const regex = /(?:useTranslations\(\s*['"]?.*?['"]?\s*\)\.|\bt\s*\()\s*['"]([^"']+)['"]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const rawKey = match[1].trim();
        const finalKey = namespace ? `${namespace}.${rawKey}` : rawKey;
        allKeys.add(finalKey);
      }
    }
  }

  return allKeys;
}

function getKeys(obj, prefix = "") {
  return Object.entries(obj).reduce((keys, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      keys.push(...getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
    return keys;
  }, []);
}

function getNestedValue(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => acc?.[key], obj);
}

function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys.at(-1)] = value;
}

async function translateText(text, sourceLang, targetLang) {
  let attempt = 0;

  while (attempt < TRANSLATION_SETTINGS.maxRetries) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Translate this backend string from ${sourceLang} to ${targetLang}. Just return the translated text:\n"${text}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      if (error.status === 429 && attempt < TRANSLATION_SETTINGS.maxRetries - 1) {
        const delay = Math.min(
          TRANSLATION_SETTINGS.baseDelay * 2 ** attempt + Math.random() * 500,
          10000
        );
        console.log(`Rate limited. Retrying in ${Math.round(delay / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
      } else {
        console.error(`Translation failed after ${attempt + 1} attempts:`, error.message);
        return null;
      }
    }
  }

  return null;
}

// ------------------------
// Main Execution
// ------------------------

(async () => {
  let hasErrors = false;

  try {
    if (!fs.existsSync(baseFilePath) || !fs.existsSync(compareFilePath)) {
      console.error("Language files not found! Make sure en.json & ar.json exist.");
      process.exit(1);
    }

    const enObj = JSON.parse(fs.readFileSync(baseFilePath, "utf-8"));
    const arObj = JSON.parse(fs.readFileSync(compareFilePath, "utf-8"));

    const codeKeysSet = getAllTranslationKeysFromApp(appDir);
    const enKeys = getKeys(enObj);

    // Add missing keys to English
    const missingInEnFromCode = [...codeKeysSet].filter(key => !enKeys.includes(key));
    missingInEnFromCode.forEach(key => {
      const defaultValue = key
        .split(".")
        .map(part => part.replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase()))
        .join(" ");
      setNestedValue(enObj, key, defaultValue);
    });

    const updatedEnKeys = getKeys(enObj);
    const arKeys = getKeys(arObj);

    const missingInAr = updatedEnKeys.filter(key => !arKeys.includes(key));
    const missingInEn = arKeys.filter(key => !updatedEnKeys.includes(key));

    // Translate missing Arabic keys
    if (missingInAr.length > 0) {
      console.log(`\nTranslating ${missingInAr.length} missing keys to ${compareLanguage}:`);
      for (const [index, key] of missingInAr.entries()) {
        if (index > 0) await new Promise(r => setTimeout(r, TRANSLATION_SETTINGS.requestDelay));

        const sourceValue = getNestedValue(enObj, key);
        if (typeof sourceValue !== "string" || !sourceValue.trim()) {
          console.error(`Skipping ${key} — invalid string`);
          continue;
        }

        const translated = await translateText(sourceValue, baseLanguage, compareLanguage);
        if (translated) {
          setNestedValue(arObj, key, translated);
          console.log(`✓ ${key}: ${translated}`);
        } else {
          hasErrors = true;
          setNestedValue(arObj, key, "[translation failed]");
          console.error(`✗ Failed to translate: ${key}`);
        }
      }
    }

    // Translate missing English keys
    if (missingInEn.length > 0) {
      console.log(`\nTranslating ${missingInEn.length} missing keys to ${baseLanguage}:`);
      for (const [index, key] of missingInEn.entries()) {
        if (index > 0) await new Promise(r => setTimeout(r, TRANSLATION_SETTINGS.requestDelay));

        const sourceValue = getNestedValue(arObj, key);
        if (!sourceValue || typeof sourceValue !== "string") {
          console.error(`Skipping ${key} — invalid Arabic string`);
          continue;
        }

        const translated = await translateText(sourceValue, compareLanguage, baseLanguage);
        if (translated) {
          setNestedValue(enObj, key, translated);
          console.log(`✓ ${key}: ${translated}`);
        } else {
          hasErrors = true;
          setNestedValue(enObj, key, "[translation failed]");
          console.error(`✗ Failed to translate: ${key}`);
        }
      }
    }

    fs.writeFileSync(baseFilePath, JSON.stringify(enObj, null, 2));
    fs.writeFileSync(compareFilePath, JSON.stringify(arObj, null, 2));

    const success = !hasErrors && missingInAr.length === 0 && missingInEn.length === 0;

    if (success && missingInEnFromCode.length === 0) {
      console.log("\x1b[32m%s\x1b[0m", "\nAll translation keys are synchronized.");
    } else if (hasErrors) {
      console.log("\x1b[31m%s\x1b[0m", "\nCompleted with some errors.");
      process.exit(1);
    } else {
      console.log("\x1b[33m%s\x1b[0m", "\nCompleted with missing keys handled.");
    }

    process.exit(0);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Fatal Error:", error.message);
    process.exit(1);
  }
})();
