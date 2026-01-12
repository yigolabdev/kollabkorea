/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './LanguageContext';

// Step 1: Environment Stabilization
// Ensure process.env is accessible even if the bundler doesn't polyfill it,
// preventing the 'Uncaught ReferenceError: process is not defined' that stops JS execution.
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForTypekitStatus(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    const el = document.documentElement;
    const done = () => resolve();

    // Typekit sets one of these classes when done/failed
    if (el.classList.contains('wf-active') || el.classList.contains('wf-inactive')) {
      done();
      return;
    }

    const obs = new MutationObserver(() => {
      if (el.classList.contains('wf-active') || el.classList.contains('wf-inactive')) {
        obs.disconnect();
        done();
      }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });

    window.setTimeout(() => {
      obs.disconnect();
      done();
    }, timeoutMs);
  });
}

async function waitForFontsStabilized(timeoutMs: number): Promise<void> {
  // Rendered text must exist for document.fonts to actually load glyph fonts.
  // So we: render hidden -> wait for fonts -> reveal.
  const fonts = (document as any).fonts as FontFaceSet | undefined;
  const fontsReady = fonts?.ready?.then ? fonts.ready : Promise.resolve();

  await Promise.race([
    Promise.all([waitForTypekitStatus(timeoutMs), fontsReady]).then(() => undefined),
    sleep(timeoutMs),
  ]);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Prevent first-load FOUT/CLS: keep body hidden until fonts are ready (or timeout), then fade in.
document.documentElement.classList.add('app-loading');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

const MAX_FONT_WAIT_MS = 2500;
const MIN_REVEAL_DELAY_MS = 700;
const revealStart = typeof performance !== 'undefined' ? performance.now() : Date.now();

void waitForFontsStabilized(MAX_FONT_WAIT_MS)
  .catch(() => {})
  .finally(async () => {
    const elapsed = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - revealStart;
    const remaining = MIN_REVEAL_DELAY_MS - elapsed;
    if (remaining > 0) {
      await sleep(remaining);
    }
    const el = document.documentElement;
    el.classList.remove('app-loading');
    el.classList.add('app-ready');
  });