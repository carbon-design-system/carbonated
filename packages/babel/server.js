'use strict';

module.exports = () => ({
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: '8.12.0',
        },
      },
    ],
  ],
});
