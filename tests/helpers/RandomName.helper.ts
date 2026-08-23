// Character sets as constants for better performance
const ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ARABIC_CHARS = "أبتثجحخدذرزسشصضطظعغفقكلمنهوي";
const NUMERIC_CHARS = "0123456789";
const DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"];
const PROTOCOLS = ["http://", "https://"];
const DEMO_DOMAINS = ["example.com", "test.com", "demo.com", "sample.com"];

/**
 * Generates a random string from given character set
 */
function generateRandomString(length: number, characters: string): string {
  if (length <= 0) return "";

  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function generateRandomName(length: number) {
  return generateRandomString(length, ALPHANUMERIC_CHARS);
}

export function generateRandomArabicName(length: number) {
  return generateRandomString(length, ARABIC_CHARS);
}

export function generateRandomLink() {
  const pathLength = Math.floor(Math.random() * 10) + 1;
  const path = generateRandomName(pathLength);
  const protocol = PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)];
  const domain = DEMO_DOMAINS[Math.floor(Math.random() * DEMO_DOMAINS.length)];

  return `${protocol}${domain}/${path}`;
}

export function generateRandomNumber(length: number) {
  return generateRandomString(length, NUMERIC_CHARS);
}

export function generateRandomEmail() {
  const usernameLength = Math.floor(Math.random() * 10) + 5; // 5-14 characters
  const username = generateRandomName(usernameLength).toLowerCase();
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];

  return `${username}@${domain}`;
}
