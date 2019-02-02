import { HOST, PROTOCOL, PORT } from 'config';
import { logger } from './logger';
import { setupHTTPSServer } from './setupHTTPSServer';

export function listen(server) {
  const service =
    PROTOCOL === 'https' && HOST === 'localhost'
      ? setupHTTPSServer(server)
      : server;

  return new Promise((resolve, reject) => {
    const handler = service.listen(PORT, HOST, error => {
      if (error) {
        return reject(error);
      }
      process.on('SIGINT', () => {
        handler.close();
      });
      resolve(handler);
      logger.info(`Server listening at ${PROTOCOL}://${HOST}:${PORT}`);
    });
  });
}
