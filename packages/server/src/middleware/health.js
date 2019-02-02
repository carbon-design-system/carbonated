import helmet from 'helmet';

function healthCheck(req, res) {
  res.status(200).send('OK');
}

export function health(server) {
  server.use('/health-check', helmet.noCache(), healthCheck);
  return server;
}
