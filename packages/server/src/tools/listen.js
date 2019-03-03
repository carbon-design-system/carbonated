import { logger } from './logger';
import { setupHTTPSServer } from './setupHTTPSServer';

export function listen(server, { host, port, protocol }) {
  const service =
    protocol === 'https' && host === 'localhost'
      ? setupHTTPSServer(server)
      : server;

  return new Promise((resolve, reject) => {
    const handler = service.listen(port, host, error => {
      if (error) {
        return reject(error);
      }
      resolve(handler);
      logger.info(`Server listening at ${protocol}://${host}:${port}`);
    });
  });
}
