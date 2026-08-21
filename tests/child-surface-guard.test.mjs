import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const repoRoot = new URL('..', import.meta.url).pathname;
const guardScript = join(repoRoot, 'scripts', 'check-child-surface.mjs');

function makeFixture({ playground, routes = "{ path: '/playgrounds' }" }) {
  const root = mkdtempSync(join(tmpdir(), 'bdu-child-surface-'));
  mkdirSync(join(root, 'src', 'pages'), { recursive: true });
  mkdirSync(join(root, 'src', 'app'), { recursive: true });
  writeFileSync(join(root, 'src', 'pages', 'PlaygroundsPage.tsx'), playground);
  writeFileSync(join(root, 'src', 'app', 'routes.tsx'), routes);
  return root;
}

function runGuard(root) {
  return spawnSync(process.execPath, [guardScript, root], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
}

test('accepts a child surface with a free path and no commerce controls', (t) => {
  const root = makeFixture({
    playground: `
      export function PlaygroundsPage() {
        return <article><h2>Free Play</h2><p>Core quests are free.</p></article>;
      }
    `,
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const result = runGuard(root);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /child-surface guard passed/i);
});

test('rejects payment or wallet imports from the child surface', (t) => {
  const root = makeFixture({
    playground: `
      import { Checkout } from '../payments/checkout';
      export function PlaygroundsPage() {
        return <article><h2>Free Play</h2><Checkout /></article>;
      }
    `,
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const result = runGuard(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /prohibited child-surface import/i);
});

test('rejects checkout controls rendered on the child surface', (t) => {
  const root = makeFixture({
    playground: `
      export function PlaygroundsPage() {
        return <><h2>Free Play</h2><button data-action="checkout">Buy now</button></>;
      }
    `,
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const result = runGuard(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /prohibited commerce control/i);
});

test('rejects a required child email field on the child surface', (t) => {
  const root = makeFixture({
    playground: `
      export function PlaygroundsPage() {
        return <><h2>Free Play</h2><input type="email" required /></>;
      }
    `,
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const result = runGuard(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /prohibited child identity requirement/i);
});

test('rejects a child surface without a free route to core play', (t) => {
  const root = makeFixture({
    playground: `
      export function PlaygroundsPage() {
        return <article><h2>Patron Extras</h2><p>Members only.</p></article>;
      }
    `,
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const result = runGuard(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing free-play path/i);
});

test('rejects removal of the public playgrounds route', (t) => {
  const root = makeFixture({
    playground: `
      export function PlaygroundsPage() {
        return <article><h2>Free Play</h2></article>;
      }
    `,
    routes: "{ path: '/marketplace' }",
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const result = runGuard(root);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /missing \/playgrounds route/i);
});

test('the current repository child surface satisfies the structural guard', () => {
  const result = runGuard(repoRoot);

  assert.equal(result.status, 0, result.stderr || result.stdout);
});
