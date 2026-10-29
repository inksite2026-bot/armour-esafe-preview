import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GitHub Pages serves the site from /armour-esafe-preview/; local dev stays at the root.
export default defineConfig(({ command, isPreview }) => ({ base: command === 'build' || isPreview ? '/armour-esafe-preview/' : '/', plugins: [react()] }));
