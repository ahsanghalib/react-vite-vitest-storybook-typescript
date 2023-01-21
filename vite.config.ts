import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { indexOf, pipe, slice, split, join } from 'ramda';

export default defineConfig((_config) => {
  return {
    define: {
      'import.meta.vitest': 'undefined',
    },
    plugins: [
      VitePluginFonts({
        google: {
          preconnect: true,
          families: [
            {
              name: 'Loto',
              styles: 'ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900',
            },
            {
              name: 'Poppins',
              styles:
                'ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900',
            },
            {
              name: 'Roboto',
              styles:
                'ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900',
            },
          ],
        },
        custom: {
          preload: true,
          families: [{ name: 'Material Icons Round', src: '/fonts/material-icon-rounded.otf' }],
        },
      }),
      react(),
      tsconfigPaths(),
      splitVendorChunkPlugin(),
    ],
    envPrefix: 'REACT_APP_',
    build: {
      outDir: 'build',
      assetsDir: 'react/static',
      manifest: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/tests/setup.ts',
      includeSource: ['src/**/*.{ts,tsx,js,jsx}'],
      // exclude: ['src/stories/**/*.story.{ts|tsx|js|jsx}'],
      resolveSnapshotPath: (path, ext) =>
        './src/tests/__snaps__/' +
        pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          split('/'),
          slice(pipe(split('/'), indexOf('src'))(path) + 1, path.length - 1),
          join('/'),
        )(path) +
        ext,
      coverage: {
        reporter: ['text', 'lcov'],
      },
      mockReset: true,
      restoreMocks: true,
    },
  };
});
