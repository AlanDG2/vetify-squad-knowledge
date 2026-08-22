#!/usr/bin/env node
/**
 * Promociona una sección de conocimiento desde automation (u otro repo hermano) hacia
 * knowledge/system-knowledge.md de este proyecto. No es una copia silenciosa: cada promoción
 * queda con cabecera de procedencia + una línea en knowledge/promotion-log.ndjson.
 *
 * Uso:
 *   node scripts/promote-knowledge.mjs \
 *     --source ../vetify-automation/automation/docs/conocimiento-sistema.md \
 *     --section "Módulo: Reintegros" \
 *     --hu IMAS-4101
 *
 * Busca en --source la sección que empieza en una línea "## <section>" (permite sufijo, ej.
 * "## Módulo: X — nota") y termina en la próxima línea "## " o fin de archivo. Si esa misma
 * sección ya existe en el target (por su heading exacto capturado), la REEMPLAZA; si no,
 * la agrega al final. Nunca borra otras secciones del target.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      out[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return out;
}

function extractSection(sourceText, sectionTitle) {
  const lines = sourceText.split('\n');
  const startIdx = lines.findIndex((l) => l.startsWith(`## ${sectionTitle}`));
  if (startIdx === -1) {
    throw new Error(`No se encontró una sección que empiece con "## ${sectionTitle}" en el origen.`);
  }
  const headingLine = lines[startIdx];
  let endIdx = lines.findIndex((l, i) => i > startIdx && /^## /.test(l));
  if (endIdx === -1) endIdx = lines.length;
  const body = lines.slice(startIdx + 1, endIdx).join('\n').trim();
  return { headingLine, body };
}

function upsertIntoTarget(targetText, headingLine, provenanceComment, body) {
  const lines = targetText.split('\n');
  const startIdx = lines.findIndex((l) => l.trim() === headingLine.trim());
  const newBlock = `${headingLine}\n${provenanceComment}\n\n${body}\n`;

  if (startIdx === -1) {
    const sep = targetText.trim().length ? '\n\n---\n\n' : '';
    return `${targetText.trimEnd()}${sep}${newBlock}`;
  }

  let endIdx = lines.findIndex((l, i) => i > startIdx && /^## /.test(l));
  if (endIdx === -1) endIdx = lines.length;
  const before = lines.slice(0, startIdx).join('\n');
  const after = lines.slice(endIdx).join('\n');
  return `${before.trimEnd()}\n\n${newBlock}\n${after.trimStart()}`.trimEnd() + '\n';
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.source || !args.section || !args.hu) {
    console.error('Uso: node scripts/promote-knowledge.mjs --source <ruta> --section "<título>" --hu <ID>');
    process.exit(1);
  }

  const target = args.target
    ? path.resolve(REPO_ROOT, args.target)
    : path.resolve(REPO_ROOT, 'knowledge/system-knowledge.md');
  const sourcePath = path.resolve(process.cwd(), args.source);

  const sourceText = fs.readFileSync(sourcePath, 'utf8');
  const { headingLine, body } = extractSection(sourceText, args.section);

  const timestamp = new Date().toISOString();
  const provenanceComment = `<!-- promovido desde ${path.relative(REPO_ROOT, sourcePath).replace(/\\/g, '/')}, HU ${args.hu}, ${timestamp.slice(0, 10)} -->`;

  const targetText = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  const merged = upsertIntoTarget(targetText, headingLine, provenanceComment, body);
  fs.writeFileSync(target, merged, 'utf8');

  const logPath = path.resolve(REPO_ROOT, 'knowledge/promotion-log.ndjson');
  const logLine = JSON.stringify({
    timestamp,
    source: path.relative(REPO_ROOT, sourcePath).replace(/\\/g, '/'),
    section: args.section,
    hu: args.hu,
    target: path.relative(REPO_ROOT, target).replace(/\\/g, '/'),
  });
  fs.appendFileSync(logPath, logLine + '\n', 'utf8');

  console.log(`Promovido "${args.section}" (HU ${args.hu}) → ${path.relative(REPO_ROOT, target)}`);
  console.log(`Log: ${path.relative(REPO_ROOT, logPath)}`);
}

main();
