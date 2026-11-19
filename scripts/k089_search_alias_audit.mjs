// Read-only report for search keys shared by different K-089 brands.
// This mirrors the normalization used by public/app.js; a collision is
// informational because two valid brands may intentionally share a name.
import {readFileSync} from 'node:fs';
import {resolve, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

export const normalizeSearchKey = value => String(value ?? '')
  .normalize('NFKC').toLowerCase()
  .replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
  .replace(/[・\s\-_ー]/g, '');

export function findSearchAliasCollisions(db) {
  if (!db || !Array.isArray(db.brands)) throw new TypeError('Expected brands array');
  const keys = new Map();
  db.brands.forEach((brand, index) => {
    const names = [brand.name, ...(Array.isArray(brand.aliases) ? brand.aliases : [])];
    for (const name of names) {
      const key = normalizeSearchKey(name);
      if (!key) continue;
      if (!keys.has(key)) keys.set(key, new Map());
      // Multiple aliases on one brand must not count as a collision.
      keys.get(key).set(index, {name: brand.name, group: brand.group});
    }
  });
  return [...keys.entries()]
    .filter(([, matches]) => matches.size > 1)
    .map(([key, matches]) => ({key, brands: [...matches.values()], crossGroup: new Set([...matches.values()].map(x => x.group)).size > 1}))
    .sort((a, b) => a.key.localeCompare(b.key, 'ja'));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const db = JSON.parse(readFileSync(join(root, 'public', 'data.json'), 'utf8'));
    const collisions = findSearchAliasCollisions(db);
    console.log('K-089 alias collision report:', collisions.length, 'shared search key(s)');
    for (const c of collisions) console.log(JSON.stringify(c));
    console.log('Informational only: check operators and official sources before modifying aliases.');
  } catch (err) {
    console.error('K-089 alias audit failed:', err.message);
    process.exitCode = 1;
  }
}
