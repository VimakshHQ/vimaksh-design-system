// Assemble the deployable site: _site (docs + examples + storybook) with dist/ copied in at /dist/.
import { cpSync, rmSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { root } from './config.mjs';
rmSync(root('_deploy'), { recursive: true, force: true });
mkdirSync(root('_deploy'), { recursive: true });
cpSync(root('_site'), root('_deploy'), { recursive: true });
cpSync(root('dist'), root('_deploy/dist'), { recursive: true });
if (!existsSync(root('_deploy/404.html'))) writeFileSync(root('_deploy/404.html'), '<!DOCTYPE html><meta charset="utf-8"><title>Not found — Vimaksh design system</title><link rel="stylesheet" href="/dist/vimaksh.css"><body style="padding:80px var(--pad)"><p class="t-mono label"><span class="chev">&gt;</span> 404</p><h1 class="t-section">This page does not exist.</h1><p><a class="btn" href="/"><span>Back to the overview</span><span class="chev" aria-hidden="true">&gt;</span></a></p></body>');
console.log('bundle: _deploy ready');
