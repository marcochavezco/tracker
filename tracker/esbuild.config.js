const esbuild = require('esbuild');

// Build the vanilla script (IIFE)
esbuild
  .build({
    entryPoints: ['./src/vanilla/init-tracker.ts'],
    outfile: './dist/signal.js',
    bundle: true,
    format: 'iife',
    target: ['es2017'],
    minify: true,
    globalName: 'dcSignal',
  })
  .catch(() => process.exit(1));
