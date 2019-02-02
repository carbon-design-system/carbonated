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
});
