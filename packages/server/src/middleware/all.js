import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

export function all(server) {
  server.disable('x-powered-by');

  // Logging middleware
  server.use(morgan('tiny'));

  // Enable GZIP by default
  server.use(compression());
  server.use(bodyParser.json({ limit: 2 ** 21 /* 2MB */ }));

  return server;
}
