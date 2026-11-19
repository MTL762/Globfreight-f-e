import fs from "fs";
import path from "path";

const locales = ["ar", "en", "es", "de", "tr", "nl", "fr"];
const messages = {};
for (const loc of locales) {
  messages[loc] = JSON.parse(fs.readFileSync(`messages/${loc}.json`, "utf-8"));
}

function resolveKey(obj, pathStr) {
  if (!pathStr) return undefined;
  if (obj[pathStr] !== undefined && typeof obj[pathStr] !== "object") return obj[pathStr];
  const parts = pathStr.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur === undefined || cur === null || typeof cur !== "object") return undefined;
    cur = cur[p];
  }
  if (typeof cur === "string" || typeof cur === "number") return cur;
  return undefined;
}

const files = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", ".jira-tasks", "dist", "build", "public"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx|ts|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
}

["app", "components", "validations", "utils", "hooks"].forEach(walk);

// We want to detect missing keys.
// A missing key report: { key: string, files: string[], missingInLocales: string[] }
const missingMap = new Map();

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");

  // Determine namespaces used in this file
  // e.g. const t = useTranslations("tickets"); or const t = await getTranslations();
  // There can be:
  // 1) const t = useTranslations("namespace")
  // 2) const t = useTranslations()
  // 3) const tTickets = useTranslations("tickets")
  // 4) const t = await getTranslations("namespace")
  // 5) const t = await getTranslations()

  const varToNamespace = new Map();
  // default t -> ""
  varToNamespace.set("t", "");

  const transDeclRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:["'`]([^"'`]+)["'`])?\s*\)/g;
  let mDecl;
  while ((mDecl = transDeclRegex.exec(content)) !== null) {
    const varName = mDecl[1];
    const ns = mDecl[2] || "";
    varToNamespace.set(varName, ns);
  }

  // Also check inline: (await getTranslations())("key") or (useTranslations())("key")
  // Check calls: varName("literalKey")
  for (const [varName, ns] of varToNamespace.entries()) {
    const callRegex = new RegExp(`\\b${varName}\\(\\s*["'\`]([^"'\`\\$\\r\\n]+)["'\`]\\s*[\\),]|\\b${varName}\\(\\s*["'\`]([^"'\`\\$\\r\\n]+)["'\`]\\s*\\)`, "g");
    let mCall;
    while ((mCall = callRegex.exec(content)) !== null) {
      const rawKey = mCall[1].trim();
      if (!rawKey) continue;
      // Skip if rawKey contains template interpolation or weird tokens
      if (rawKey.includes("${") || rawKey.includes("}")) continue;

      // The key could be:
      // If ns is present, try `${ns}.${rawKey}`, else try rawKey
      let candidates = [];
      if (ns) {
        candidates.push(`${ns}.${rawKey}`);
        candidates.push(rawKey);
      } else {
        candidates.push(rawKey);
      }

      // Check which candidate resolves in en
      let resolvedInEn = false;
      let matchedKey = candidates[0];

      for (const cand of candidates) {
        if (resolveKey(messages.en, cand) !== undefined) {
          resolvedInEn = true;
          matchedKey = cand;
          break;
        }
      }

      // Now check all locales for matchedKey
      const missingIn = [];
      for (const loc of locales) {
        if (resolveKey(messages[loc], matchedKey) === undefined) {
          // If ns was used, maybe it resolves in rawKey?
          let foundInAnyCandidate = false;
          for (const cand of candidates) {
            if (resolveKey(messages[loc], cand) !== undefined) {
              foundInAnyCandidate = true;
              break;
            }
          }
          if (!foundInAnyCandidate) {
            missingIn.push(loc);
          }
        }
      }

      if (missingIn.length > 0) {
        const fullKey = ns ? `${ns}.${rawKey}` : rawKey;
        if (!missingMap.has(fullKey)) {
          missingMap.set(fullKey, { key: fullKey, rawKey, ns, files: new Set(), missingIn });
        }
        missingMap.get(fullKey).files.add(file);
      }
    }
  }
}

console.log("Total unique missing keys:", missingMap.size);

const sorted = Array.from(missingMap.values()).sort((a, b) => a.key.localeCompare(b.key));
for (const item of sorted) {
  console.log(`Key: "${item.key}" (missing in: ${item.missingIn.join(",")}) used in: ${Array.from(item.files).join(", ")}`);
}

