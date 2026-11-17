// Storybook (local only, not published). Stories are generated from the same examples as the docs site:
// npm run docs && npm run storybook
export default {
  framework: { name: '@storybook/html-vite', options: {} },
  stories: ['./stories/*.stories.js'],
  staticDirs: [{ from: '../dist', to: '/dist' }, { from: '../_site/examples', to: '/examples' }],
  core: { disableTelemetry: true },
};
