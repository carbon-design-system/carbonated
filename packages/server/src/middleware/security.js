import hpp from 'hpp';
import helmet from 'helmet';
import sts from 'strict-transport-security';

export function security(server) {
  // Protect against HTTP Parameter Pollution attacks
  server.use(hpp());

  // Secure server by setting various HTTP headers
  server.use(helmet.xssFilter());
  server.use(helmet.frameguard('deny'));
  server.use(helmet.ieNoOpen());
  server.use(helmet.noSniff());

  // TODO
  // server.use(helmet.contentSecurityPolicy(contentSecurityPolicy));

  // Add Strict-Transport-Security header
  server.use(sts.getSTS({ 'max-age': { days: 365 } }));

  return server;
}
