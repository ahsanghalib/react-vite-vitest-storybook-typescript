const path = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/story/**/*.story.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '..', 'src'),
        },
      },
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
};
