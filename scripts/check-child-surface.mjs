#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? process.cwd());
const playgroundPath = resolve(root, 'src/pages/PlaygroundsPage.tsx');
const routesPath = resolve(root, 'src/app/routes.tsx');
const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx'];

function readRequired(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    console.error(`child-surface guard failed: required file not found: ${path}`);
    process.exit(1);
  }
}

function stripComments(source) {
  let result = '';
  let state = 'code';

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (state === 'line-comment') {
      if (character === '\n') {
        result += character;
        state = 'code';
      } else {
        result += ' ';
      }
      continue;
    }

    if (state === 'block-comment') {
      if (character === '*' && next === '/') {
        result += '  ';
        index += 1;
        state = 'code';
      } else {
        result += character === '\n' ? '\n' : ' ';
      }
      continue;
    }

    if (state === 'single-quote' || state === 'double-quote' || state === 'template') {
      result += character;
      if (character === '\\' && next !== undefined) {
        result += next;
        index += 1;
        continue;
      }
      if (
        (state === 'single-quote' && character === "'") ||
        (state === 'double-quote' && character === '"') ||
        (state === 'template' && character === '`')
      ) {
        state = 'code';
      }
      continue;
    }

    if (character === '/' && next === '/') {
      result += '  ';
      index += 1;
      state = 'line-comment';
    } else if (character === '/' && next === '*') {
      result += '  ';
      index += 1;
      state = 'block-comment';
    } else {
      result += character;
      if (character === "'") state = 'single-quote';
      if (character === '"') state = 'double-quote';
      if (character === '`') state = 'template';
    }
  }

  return result;
}

function importSpecifiers(source) {
  return [
    ...source.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g),
    ...source.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g),
    ...source.matchAll(/\bimport\s*['"]([^'"]+)['"]/g),
  ].map((match) => match[1]);
}

function resolveLocalImport(parentPath, specifier) {
  if (!specifier.startsWith('.')) return null;

  const candidate = resolve(dirname(parentPath), specifier);
  const possibilities = extname(candidate)
    ? [candidate]
    : [
        ...sourceExtensions.map((extension) => `${candidate}${extension}`),
        ...sourceExtensions.map((extension) => resolve(candidate, `index${extension}`)),
      ];

  return possibilities.find((path) => existsSync(path) && statSync(path).isFile()) ?? null;
}

function collectChildSurfaceFiles(entryPath) {
  const pending = [entryPath];
  const sources = new Map();

  while (pending.length > 0) {
    const path = pending.pop();
    if (sources.has(path)) continue;

    const source = stripComments(readRequired(path));
    sources.set(path, source);

    for (const specifier of importSpecifiers(source)) {
      const localPath = resolveLocalImport(path, specifier);
      if (localPath && !sources.has(localPath)) pending.push(localPath);
    }
  }

  return sources;
}

const childSurfaceFiles = collectChildSurfaceFiles(playgroundPath);
const playground = childSurfaceFiles.get(playgroundPath);
const routes = stripComments(readRequired(routesPath));
const violations = [];

const prohibitedImport = /(?:^|[/._-])(checkout|payments?|stripe|wallets?|commerce|cart)(?:$|[/._-])/i;
const prohibitedAction = /checkout|buy\s*now|add\s*to\s*(?:the\s*)?cart|payments?|wallet|cash\s*out|purchase/i;
const prohibitedComponent = /<(?!\/)[A-Z][\w.]*(?:Checkout|Payment|Wallet|Cart|Purchase|Buy)[\w.]*/i;
const nativeControl = /<(button|form|a|input|select)\b([^>]*)>([\s\S]*?)<\/\1\s*>|<(input|button)\b([^>]*)\/?\s*>/gi;

for (const source of childSurfaceFiles.values()) {
  for (const specifier of importSpecifiers(source)) {
    if (prohibitedImport.test(specifier)) {
      violations.push(`prohibited child-surface import: ${specifier}`);
    }
  }

  if (prohibitedComponent.test(source)) {
    violations.push('prohibited commerce control on child surface');
  }

  for (const match of source.matchAll(nativeControl)) {
    const attributes = match[2] ?? match[5] ?? '';
    const content = match[3] ?? '';
    if (prohibitedAction.test(attributes) || prohibitedAction.test(content)) {
      violations.push('prohibited commerce control on child surface');
      break;
    }
  }

  const inputTags = source.match(/<input\b[^>]*>/gi) ?? [];
  const emailType = /\btype\s*=\s*(?:['"]email['"]|\{\s*(?:['"]email['"]|`email`)\s*\})/i;
  if (inputTags.some((tag) => emailType.test(tag) && /\brequired\b/i.test(tag))) {
    violations.push('prohibited child identity requirement: required email');
  }
}

if (!/<h[1-6]\b[^>]*>[^<]*\bFree\s+Play\b/i.test(playground) && !/data-access\s*=\s*['"]free['"]/i.test(playground)) {
  violations.push('missing free-play path for core play');
}

if (!/path\s*:\s*['"]\/playgrounds['"]/i.test(routes)) {
  violations.push('missing /playgrounds route');
}

if (violations.length > 0) {
  for (const violation of [...new Set(violations)]) {
    console.error(`child-surface guard failed: ${violation}`);
  }
  process.exit(1);
}

console.log(`child-surface guard passed (${childSurfaceFiles.size} child-surface file${childSurfaceFiles.size === 1 ? '' : 's'} scanned)`);
