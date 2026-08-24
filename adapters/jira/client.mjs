#!/usr/bin/env node
/**
 * Adaptador jira de vetify-squad-knowledge — implementación completa (Fase 5).
 * Basado en el cliente REST v3 de vetify-automation/automation/scripts/jira/jira-client.mjs
 * (duplicación chica y consciente, ver adapters/jira/README.md — no un require cross-repo).
 *
 * Toda operación que ESCRIBE en Jira (createStoryDraft, createDefect) exige que quien la invoque
 * ya haya mostrado un preview y obtenido OK explícito de una persona ANTES de correr el comando —
 * ver adapters/jira/update-rules.md. El propio hecho de invocar el comando CLI con argumentos
 * reales es esa aprobación explícita (mismo principio que automation/scripts/jira/jira-client.mjs).
 *
 * Uso CLI:
 *   node adapters/jira/client.mjs check-readiness <KEY>
 *   node adapters/jira/client.mjs fetch-story <KEY>
 *   node adapters/jira/client.mjs list-epic-children <EPIC-KEY>
 *   node adapters/jira/client.mjs create-story-draft <PROJECT-KEY> <PARENT-KEY|-> <ISSUE-TYPE|-> <título>
 *     (PARENT-KEY: épica si es una HU/Tarea de primer nivel, o una Tarea/HU si esto es una
 *     Subtarea. ISSUE-TYPE: "-" usa el default "Historia de usuario"; pasar "Tarea" o "Subtarea"
 *     para una actividad relacionada.)
 *   node adapters/jira/client.mjs create-defect <PARENT-KEY|-> <resumen>
 *
 * Requiere un .env propio de este repo (ver .env.example).
 */
import { readFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function loadEnv() {
  try {
    for (const line of readFileSync(resolve(process.cwd(), '.env'), 'utf8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const idx = t.indexOf('=');
      if (idx < 0) continue;
      const key = t.slice(0, idx).trim();
      const val = t.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* sin .env todavía */ }
}

loadEnv();

const BASE  = (process.env.JIRA_BASE_URL ?? '').replace(/\/$/, '');
const EMAIL = process.env.JIRA_EMAIL ?? '';
const TOKEN = process.env.JIRA_API_TOKEN ?? '';
const SYNC_LOG_PATH = resolve(process.cwd(), 'adapters/jira/sync-log.ndjson');

async function jira(method, path, body) {
  if (!BASE || !EMAIL || !TOKEN) {
    throw new Error('Missing JIRA_BASE_URL, JIRA_EMAIL, or JIRA_API_TOKEN in .env');
  }
  const auth = Buffer.from(`${EMAIL}:${TOKEN}`).toString('base64');
  const res = await fetch(`${BASE}/rest/api/3${path}`, {
    method,
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`[${res.status}] ${method} ${path}\n${text}`);
  return text ? JSON.parse(text) : null;
}

function toDoc(text) {
  const blocks = String(text ?? '').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return {
    type: 'doc', version: 1,
    content: blocks.length ? blocks.map((block) => ({
      type: 'paragraph',
      content: block.split('\n').flatMap((line, i, lines) =>
        i < lines.length - 1 ? [{ type: 'text', text: line }, { type: 'hardBreak' }] : [{ type: 'text', text: line }],
      ),
    })) : [{ type: 'paragraph', content: [] }],
  };
}

function extractText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.text) return node.text;
  if (node.content) return node.content.map(extractText).join(' ');
  return '';
}

function appendSyncLog(entry) {
  try {
    appendFileSync(SYNC_LOG_PATH, JSON.stringify({ timestamp: new Date().toISOString(), ...entry }) + '\n');
  } catch { /* no bloquear la escritura real por un fallo de logging */ }
}

export async function getIssue(key) {
  return jira('GET', `/issue/${key}`);
}

export async function searchIssues(jql, maxResults = 100) {
  return jira('POST', '/search/jql', {
    jql, maxResults,
    fields: ['summary', 'status', 'issuetype', 'parent', 'assignee'],
  });
}

/**
 * Criterio 7 de adapters/jira/dor-ticket.md: la HU debe estar linkeada a una épica real.
 * Si Jira no es consultable en vivo, NUNCA asumir que está lista.
 */
export async function checkReadiness(id) {
  let issue;
  try {
    issue = await getIssue(id);
  } catch (e) {
    return { ready: false, missing: [`NO_VERIFICADO_EN_VIVO: ${e.message}`] };
  }
  const missing = [];
  const parent = issue.fields?.parent;
  const parentIsEpic = parent && (parent.fields?.issuetype?.name ?? '').toLowerCase() === 'epic';
  if (!parentIsEpic) missing.push('Sin épica vinculada (fields.parent ausente o no es de tipo Epic).');
  return { ready: missing.length === 0, missing };
}

/** fetchStory(id) → texto de la HU (para la skill hu-epic-feature-authoring, sección "traer HU existente"). */
export async function fetchStory(id) {
  const issue = await getIssue(id);
  const f = issue.fields;
  const lines = [
    `# ${issue.key}: ${f.summary}`,
    '',
    `**Estado**: ${f.status?.name ?? '-'}  ·  **Tipo**: ${f.issuetype?.name ?? '-'}  ·  **Épica**: ${f.parent?.key ?? 'SIN VINCULAR'}`,
    `**URL**: ${BASE}/browse/${issue.key}`,
    '',
    '## Descripción',
    '',
    extractText(f.description) || '(sin descripción)',
  ];
  return lines.join('\n');
}

/** listEpicChildren(epicId) → [{key, summary, status, issuetype}] — para la skill knowledge-lookup. */
export async function listEpicChildren(epicId) {
  const res = await searchIssues(`parent = ${epicId} ORDER BY key ASC`, 100);
  return (res.issues ?? []).map((i) => ({
    key: i.key,
    summary: i.fields.summary,
    status: i.fields.status?.name ?? '?',
    issuetype: i.fields.issuetype?.name ?? '?',
  }));
}

/**
 * createStoryDraft(payload) → crea un issue real en Jira (HU o una actividad relacionada colgando
 * de ella). `payload`: { projectKey, summary, description, parentKey?, issueType? }.
 * - `parentKey`: el padre real en Jira (`fields.parent`) — una épica si esto es una HU/Tarea de
 *   primer nivel, o una Tarea/HU si esto es una Subtarea. Jira no distingue el mecanismo entre
 *   "hija de épica" e "hija de tarea" — es el mismo campo, por eso `checkReadiness` ya lo trata
 *   igual (`fields.parent`, sin importar el tipo del padre).
 * - `issueType`: default `'Historia de usuario'`. Pasar `'Tarea'` o `'Subtarea'` (u otro issuetype
 *   real del proyecto Jira) para crear una actividad relacionada con el tipo correcto — antes de
 *   este cambio quedaba siempre hardcodeado a "Historia de usuario", lo cual mal-tipaba cualquier
 *   Tarea/Subtarea creada con esta misma función.
 * SOLO invocar tras preview + OK explícito de una persona — ver adapters/jira/update-rules.md.
 * Loguea en sync-log.ndjson (éxito o error).
 */
export async function createStoryDraft({ projectKey, summary, description, parentKey, issueType = 'Historia de usuario' }) {
  if (!projectKey || !summary) throw new Error('createStoryDraft requiere { projectKey, summary }');
  try {
    const fields = {
      project: { key: projectKey },
      summary,
      issuetype: { name: issueType },
    };
    if (description) fields.description = toDoc(description);
    if (parentKey) fields.parent = { key: parentKey };
    const created = await jira('POST', '/issue', { fields });
    appendSyncLog({ action: 'createStoryDraft', projectKey, parentKey: parentKey ?? null, issueType, summary, key: created.key, result: 'ok' });
    return created.key;
  } catch (e) {
    appendSyncLog({ action: 'createStoryDraft', projectKey, parentKey: parentKey ?? null, issueType, summary, result: 'error', error: e.message });
    throw e;
  }
}

/**
 * createDefect(bug) → crea un issue tipo "Error" (bug real del proyecto, sin Xray — mismo nombre
 * de issuetype que usa automation). `bug`: { projectKey, summary, description, parentKey? }.
 * SOLO invocar tras preview + OK explícito — ver adapters/jira/update-rules.md.
 */
export async function createDefect({ projectKey, summary, description, parentKey }) {
  if (!projectKey || !summary) throw new Error('createDefect requiere { projectKey, summary }');
  try {
    const fields = {
      project: { key: projectKey },
      summary: `Bug: ${summary}`,
      issuetype: { name: 'Error' },
    };
    if (description) fields.description = toDoc(description);
    const created = await jira('POST', '/issue', { fields });
    if (parentKey) {
      await jira('POST', '/issueLink', {
        type: { name: 'Blocks' },
        inwardIssue: { key: parentKey },
        outwardIssue: { key: created.key },
      });
    }
    appendSyncLog({ action: 'createDefect', projectKey, parentKey: parentKey ?? null, summary, key: created.key, result: 'ok' });
    return created.key;
  } catch (e) {
    appendSyncLog({ action: 'createDefect', projectKey, parentKey: parentKey ?? null, summary, result: 'error', error: e.message });
    throw e;
  }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const IS_CLI = process.argv[1] && fileURLToPath(import.meta.url).endsWith(
  process.argv[1].replace(/\\/g, '/').split('/').pop(),
);

if (IS_CLI) {
  const [, , cmd, ...rest] = process.argv;
  const commands = {
    async 'check-readiness'([key]) {
      const r = await checkReadiness(key);
      console.log(`\n${key} → ready: ${r.ready}`);
      if (r.missing.length) console.log('Missing:\n  - ' + r.missing.join('\n  - '));
    },
    async 'fetch-story'([key]) {
      console.log('\n' + await fetchStory(key));
    },
    async 'list-epic-children'([epicKey]) {
      const children = await listEpicChildren(epicKey);
      console.log(`\n${epicKey} — ${children.length} hijas:`);
      for (const c of children) console.log(`  ${c.key} [${c.status}] (${c.issuetype}) ${c.summary}`);
    },
    async 'create-story-draft'([projectKey, parentKey, issueType, ...titleParts]) {
      const key = await createStoryDraft({
        projectKey, summary: titleParts.join(' '),
        parentKey: parentKey === '-' ? undefined : parentKey,
        issueType: issueType && issueType !== '-' ? issueType : undefined,
      });
      console.log(`\nCreada: ${key} — ${BASE}/browse/${key}`);
    },
    async 'create-defect'([parentKey, ...summaryParts]) {
      const key = await createDefect({
        projectKey: process.env.JIRA_PROJECT_KEY,
        summary: summaryParts.join(' '),
        parentKey: parentKey === '-' ? undefined : parentKey,
      });
      console.log(`\nCreado: ${key} — ${BASE}/browse/${key}`);
    },
  };
  const fn = commands[cmd];
  if (!fn) {
    console.log('Uso: node adapters/jira/client.mjs <check-readiness|fetch-story|list-epic-children|create-story-draft|create-defect> ...');
    process.exit(fn ? 0 : 1);
  } else {
    fn(rest).catch((e) => { console.error('Error:', e.message); process.exit(1); });
  }
}
