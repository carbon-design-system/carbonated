import { NODE_ENV } from 'config';
import { redirectToHTTPS } from '../handlers/redirectToHTTPS';

export function https(server) {
  if (NODE_ENV === 'production') {
    server.enable('trust proxy');
    server.use(redirectToHTTPS);
  }

  return server;
}
