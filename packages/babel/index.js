'use strict';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
        isTSX: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
        },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
});
