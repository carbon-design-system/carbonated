import { NODE_ENV } from 'config';
import path from 'path';
import express from 'express';

export function assets(server, context) {
  if (NODE_ENV === 'development') {
    return server;
  }

  const { build } = context;
  const staticPath = path.join(build.assetPath, 'static');

  // Serve our build assets with an aggressive cache policy duration
  server.use('/static', express.static(staticPath, { maxAge: 31536000000 }));

  // Serve assets that don't need an aggressive cache policy
  server.use(express.static(build.assetPath));

  return server;
}
