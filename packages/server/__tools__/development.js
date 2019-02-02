'use strict';

const { NODE_ENV } = require('config');

let webpack;
let config;
let paths;
let compiler;

if (NODE_ENV === 'development') {
  webpack = require('webpack');
  config = require('../../../config/webpack/webpack.config.dev');
  paths = require('../../../config/webpack/paths');
  compiler = webpack(config);
}

module.exports = server => {
  if (NODE_ENV !== 'development') {
    return server;
  }

  server.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,

      // Enable gzip compression of generated files.
      compress: true,

      // Silence WebpackDevServer's own logs since they're generally not useful.
      // It will still show compile warnings and errors with this setting.
      clientLogLevel: 'none',

      // By default WebpackDevServer serves physical files from current directory
      // in addition to all the virtual build products that it serves from memory.
      // This is confusing because those files won’t automatically be available in
      // production build folder unless we copy them. However, copying the whole
      // project directory is dangerous because we may expose sensitive files.
      // Instead, we establish a convention that only files in `public` directory
      // get served. Our build script will copy `public` into the `build` folder.
      // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
      // Note that we only recommend to use `public` folder as an escape hatch
      // for files like `favicon.ico`, `manifest.json`, and libraries that are
      // for some reason broken when imported through Webpack. If you just want to
      // use an image, put it in `src` and `import` it from JavaScript instead.
      contentBase: paths.appPublic,

      // By default files from `contentBase` will not trigger a page reload.
      watchContentBase: true,

      // Enable hot reloading server. It will provide /sockjs-node/ endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the Webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,

      // WebpackDevServer is noisy by default so we emit custom message instead
      // by listening to the compiler events with `compiler.plugin` calls above.
      quiet: true,

      // Reportedly, this avoids CPU overload on some systems.
      // https://github.com/facebookincubator/create-react-app/issues/293
      watchOptions: {
        ignored: /node_modules/,
      },

      overlay: false,

      historyApiFallback: {
        // Paths with dots should still use the history fallback.
        // See https://github.com/facebookincubator/create-react-app/issues/387.
        disableDotRule: true,
      },
    })
  );

  server.use(require('webpack-hot-middleware')(compiler));

  return server;
};
