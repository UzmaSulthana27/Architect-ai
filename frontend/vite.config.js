import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Merge process.env with env from loadEnv to ensure Secrets are included
  const mergedEnv = { ...process.env, ...env };
  
  const define = {
    'process.env.NODE_ENV': JSON.stringify(mode),
  };
  
  // Explicitly map keys that we need from system environment
  const keysToMap = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ];

  // Log all keys to help find the correct ones
  console.log(`[Vite Config] Available env keys: ${Object.keys(mergedEnv).filter(k => k.includes('SUPABASE') || k.startsWith('VITE_')).join(', ')}`);

  keysToMap.forEach(key => {
    const value = mergedEnv[key];
    if (value) {
      console.log(`[Vite Config] Mapping environment variable: ${key} (length: ${value.length})`);
      define[`process.env.${key}`] = JSON.stringify(value);
      define[`import.meta.env.${key}`] = JSON.stringify(value);
    } else {
      console.log(`[Vite Config] Environment variable MISSING: ${key}`);
    }
  });

  return {
    root: process.cwd(),
    plugins: [react(), tailwindcss()],
    define,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
