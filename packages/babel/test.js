'use strict';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
          node: '10',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
});
