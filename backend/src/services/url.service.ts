import { generateCode } from '../utils/shortner';

type UrlEntry = {
  originalUrl: string;
  createdAt: Date;
  visits: number;
};

const urlDatabase = new Map<string, UrlEntry>();
const domain = 'http://short.est';

export function createShortUrl(originalUrl: string): string {
  let code: string;

  // Prevent duplicates: return existing code if URL is already shortened
  for (const [key, value] of urlDatabase.entries()) {
    if (value.originalUrl === originalUrl) {
      return `${domain}/${key}`;
    }
  }

  // Generate unique code
  do {
    code = generateCode();
  } while (urlDatabase.has(code));

  urlDatabase.set(code, {
    originalUrl,
    createdAt: new Date(),
    visits: 0,
  });

  return `${domain}/${code}`;
}