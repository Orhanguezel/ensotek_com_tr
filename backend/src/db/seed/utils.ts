// src/db/seed/utils.ts

export function cleanSql(input: string): string {
  let inString = false;
  let quote = '';
  let result = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    const nextChar = input[i + 1] || '';

    if (!inString && (char === "'" || char === '"')) {
      inString = true;
      quote = char;
      result += char;
      i++;
      continue;
    }

    if (inString && char === quote) {
      if (nextChar === quote) {
        result += char + nextChar;
        i += 2;
        continue;
      }
      inString = false;
      result += char;
      i++;
      continue;
    }

    if (inString) {
      result += char;
      i++;
      continue;
    }

    if (char === '-' && nextChar === '-') {
      while (i < input.length && input[i] !== '\n' && input[i] !== '\r') i++;
      if (i < input.length) { result += input[i]; i++; }
      continue;
    }

    if (char === '/' && nextChar === '*') {
      i += 2;
      while (i < input.length - 1) {
        if (input[i] === '*' && input[i + 1] === '/') { i += 2; break; }
        i++;
      }
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

export function splitStatements(sql: string): string[] {
  return sql
    .split(/;\s*(?:\r?\n|$)/g)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.endsWith(';') ? s : s + ';');
}

export function logStep(msg: string) {
  const ts = new Date().toISOString().replace('T', ' ').replace('Z', '');
  console.log(`[${ts}] ${msg}`);
}

export function projectColumns(selectParam: unknown, allowed: string[]): string {
  const allow = new Set(allowed);
  if (typeof selectParam !== 'string' || !selectParam.trim() || selectParam === '*') {
    return allowed.join(', ');
  }
  const cols = selectParam
    .split(',')
    .map(s => s.trim())
    .filter(c => allow.has(c));
  return (cols.length ? cols : allowed).join(', ');
}

export function parseOrder(
  orderParam: unknown,
  allowedCols: string[],
  defaultCol = 'created_at',
  defaultDir: 'desc' | 'asc' = 'desc',
) {
  const s = typeof orderParam === 'string' ? orderParam : '';
  const [c, d] = s.split('.');
  const col = allowedCols.includes(c || '') ? c! : defaultCol;
  const dir = d?.toLowerCase() === 'asc' ? 'ASC' : defaultDir.toUpperCase();
  return { col, dir };
}

export function toNumber(v: unknown): number | null {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v);
  return null;
}
