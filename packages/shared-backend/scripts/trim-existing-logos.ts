#!/usr/bin/env bun
/**
 * Geriye dönük batch trim script'i.
 *
 * Upload-time otomatik trim (modules/_shared/image-trim.ts) yalnızca
 * YENİ yüklenen dosyaları kırpıyor. Eski yüklenmiş logolar hâlâ
 * padding'li. Bu script bir dizin altındaki logo/favicon/og-image
 * pattern'ine uyan tüm dosyaları yerinde trim eder.
 *
 * Kullanım:
 *   bun run packages/shared-backend/scripts/trim-existing-logos.ts <dir> [--dry-run]
 *
 * Örnekler:
 *   bun run .../scripts/trim-existing-logos.ts /var/www/ensotek/backend/uploads
 *   bun run .../scripts/trim-existing-logos.ts ./backend/uploads --dry-run
 *
 * Güvenlik:
 *   - Default davranış dry-run değil; dosyalar YERİNE yazılır.
 *   - Trim başarısız olursa orijinal dosya korunur.
 *   - Emin değilsen önce --dry-run ile listele.
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { maybeTrimUploadBuffer, shouldAutoTrim } from '../modules/_shared/image-trim';

const MIME_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
};

interface Result {
  path: string;
  before: number;
  after: number;
  trimmed: boolean;
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function mimeFor(path: string): string | undefined {
  const ext = path.toLowerCase().slice(path.lastIndexOf('.'));
  return MIME_BY_EXT[ext];
}

async function processOne(path: string, dryRun: boolean): Promise<Result | null> {
  const filename = path.split('/').pop() ?? path;
  const mime = mimeFor(path);
  if (!mime || !shouldAutoTrim(mime, filename)) return null;

  const original = await readFile(path);
  const trimmed = await maybeTrimUploadBuffer(original, mime, filename);
  const changed = !original.equals(trimmed);

  if (changed && !dryRun) {
    await writeFile(path, trimmed);
  }

  return {
    path,
    before: original.length,
    after: trimmed.length,
    trimmed: changed,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const dir = args.find((a) => !a.startsWith('--'));

  if (!dir) {
    console.error('Usage: bun run trim-existing-logos.ts <dir> [--dry-run]');
    process.exit(1);
  }

  const dirStat = await stat(dir).catch(() => null);
  if (!dirStat?.isDirectory()) {
    console.error(`Not a directory: ${dir}`);
    process.exit(1);
  }

  const results: Result[] = [];
  for await (const file of walk(dir)) {
    const res = await processOne(file, dryRun);
    if (res) results.push(res);
  }

  const changed = results.filter((r) => r.trimmed);
  const bytesBefore = changed.reduce((s, r) => s + r.before, 0);
  const bytesAfter = changed.reduce((s, r) => s + r.after, 0);

  console.log(`\nTarandı: ${results.length}, kırpıldı: ${changed.length}`);
  if (changed.length) {
    const saved = ((bytesBefore - bytesAfter) / 1024).toFixed(1);
    console.log(`Kazanç: ${saved} KB (${bytesBefore} → ${bytesAfter} byte)\n`);
    for (const r of changed) {
      console.log(`${dryRun ? '(dry)' : '✓'} ${r.path}  ${r.before}→${r.after}`);
    }
  }
  if (dryRun) console.log('\n--dry-run: dosyalar değiştirilmedi.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
