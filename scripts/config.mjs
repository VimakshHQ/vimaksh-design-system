// One place for paths and public URLs.
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const root = (...p) => join(ROOT, ...p);

// The design system is not hosted. Agents read it from the public GitHub repo; this is the only place the
// address lives. Override with VIMAKSH_DS_BASE (e.g. http://localhost:4321/dist/) for local testing.
export const REPO = 'yakosasam797/vimaksh-design-system';
export const BRANCH = 'main';
export const BASE = (process.env.VIMAKSH_DS_BASE || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/dist/`).replace(/\/?$/, '/');
export const REPO_URL = `https://github.com/${REPO}`;
export const blob = p => `${REPO_URL}/blob/${BRANCH}/${p}`;

// The website the system is extracted from, pinned to the audited commit.
export const SITE_REPO = 'https://github.com/yakosasam797/vimakshwebsite-identity-final';
export const SITE_SHA = readFileSync(root('source/SOURCE_COMMIT'), 'utf8').trim();
export const SITE_LIVE = 'https://work.vimaksh.in';
export const siteLink = (file, a, b) => `${SITE_REPO}/blob/${SITE_SHA}/${file}${a ? `#L${a}${b && b !== a ? `-L${b}` : ''}` : ''}`;

// Snapshot of the website files (copied into source/ so this repo builds on its own).
export const SITE_FILES = {
  'src/v5/v5.css': root('source/site/v5.css'),
  'src/v5/main.js': root('source/site/main.js'),
  'src/v5/pixelart.js': root('source/site/pixelart.js'),
  'src/v5/pixelsaas.js': root('source/site/pixelsaas.js'),
  'src/v5/pixelhero.js': root('source/site/pixelhero.js'),
  'src/v5/validate.js': root('source/site/validate.js'),
  'tools/v5pages.py': root('source/site/v5pages.py'),
  'public/marks/vimaksh-mark.svg': root('source/marks/vimaksh-mark.svg'),
  'public/marks/vimaksh-wordmark.svg': root('source/marks/vimaksh-wordmark.svg'),
};
export const VERSION = JSON.parse(readFileSync(root('package.json'), 'utf8')).version;
