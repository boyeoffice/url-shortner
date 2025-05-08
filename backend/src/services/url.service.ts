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

export function getOriginalUrl(code: string): string | null {
  const entry = urlDatabase.get(code);
  return entry ? entry.originalUrl : null;
}

export function incrementVisitCount(code: string): void {
  const entry = urlDatabase.get(code);
  if (entry) {
    entry.visits += 1;
  }
}

export function getAllUrls(): {
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
  visits: number;
}[] {
  return Array.from(urlDatabase.entries()).map(([code, data]) => ({
    shortUrl: `${domain}/${code}`,
    ...data,
  }));
}

export function getUrlStats(code: string): Record<string, unknown> | null {
  const entry = urlDatabase.get(code);
  if (!entry) return null;

  return {
    shortUrl: `${domain}/${code}`,
    originalUrl: entry.originalUrl,
    visits: entry.visits,
    createdAt: entry.createdAt,
  };
}
