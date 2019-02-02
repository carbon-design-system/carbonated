import { DEPLOY_ENV, NODE_ENV } from 'config';

export function redirectToHTTPS(req, res, next) {
  if (DEPLOY_ENV !== 'local' && NODE_ENV === 'production' && !req.secure) {
    res.redirect(`https://${req.headers.host}${req.url}`);
    return;
  }
  next();
}
