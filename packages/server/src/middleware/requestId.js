import uuid from 'uuid/v4';

function requestIdHandler(req, res, next) {
  if (req._id) {
    return next();
  }
  req._id = req.get('x-request-id') || uuid();
  return next();
}

export function requestId(server) {
  server.use(requestIdHandler);
  return server;
}
