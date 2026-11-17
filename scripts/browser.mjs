// Chromium for exports and screenshots (playwright-core with an installed Playwright Chromium).
import { chromium } from 'playwright-core';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export function chromePath() {
  if (process.env.CHROME) return process.env.CHROME;
  const base = join(process.env.LOCALAPPDATA || join(process.env.HOME || '', '.cache'), 'ms-playwright');
  const dirs = existsSync(base) ? readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort((a, b) => b.split('-')[1] - a.split('-')[1]) : [];
  for (const d of dirs) for (const exe of ['chrome-win64/chrome.exe', 'chrome-win/chrome.exe', 'chrome-linux/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
    const p = join(base, d, exe); if (existsSync(p)) return p;
  }
  throw new Error('No Chromium found: set CHROME=/path/to/chrome');
}
export const launch = () => chromium.launch({ executablePath: chromePath(), args: ['--ignore-gpu-blocklist', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
