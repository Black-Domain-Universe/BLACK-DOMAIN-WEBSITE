#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] ?? process.cwd());
const playgroundPath = resolve(root, 'src/pages/PlaygroundsPage.tsx');
const routesPath = resolve(root, 'src/app/routes.tsx');

function readRequired(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    console.error(`child-surface guard failed: required file not found: ${path}`);
    process.exit(1);
  }
}

const playground = readRequired(playgroundPath);
const routes = readRequired(routesPath);
const violations = [];

const importSpecifiers = [
  ...playground.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g),
  ...playground.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g),
  ...playground.matchAll(/\bimport\s*['"]([^'"]+)['"]/g),
].map((match) => match[1]);

const prohibitedImport = /(?:^|[/._-])(checkout|payments?|stripe|wallets?|commerce|cart)(?:$|[/._-])/i;
for (const specifier of importSpecifiers) {
  if (prohibitedImport.test(specifier)) {
    violations.push(`prohibited child-surface import: ${specifier}`);
  }
}

const prohibitedControl = /<(?:button|form|input|select|a|[A-Z][\w.]*)\b[^>]*(?:checkout|buy\s*now|add\s*to\s*cart|payment|wallet|cash\s*out|data-action\s*=\s*['"](?:checkout|payment|purchase|buy|cart))/i;
if (prohibitedControl.test(playground)) {
  violations.push('prohibited commerce control on child surface');
}

const inputTags = playground.match(/<input\b[^>]*>/gi) ?? [];
if (inputTags.some((tag) => /\btype\s*=\s*['"]email['"]/i.test(tag) && /\brequired\b/i.test(tag))) {
  violations.push('prohibited child identity requirement: required email');
}

if (!/\bFree\s+Play\b/i.test(playground) && !/data-access\s*=\s*['"]free['"]/i.test(playground)) {
  violations.push('missing free-play path for core play');
}

if (!/path\s*:\s*['"]\/playgrounds['"]/i.test(routes)) {
  violations.push('missing /playgrounds route');
}

if (violations.length > 0) {
  for (const violation of violations) {
    console.error(`child-surface guard failed: ${violation}`);
  }
  process.exit(1);
}

console.log('child-surface guard passed');
