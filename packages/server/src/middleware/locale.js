import locale from 'locale';

export function setupLocale(supportedLanguages) {
  return server => {
    server.use(locale(supportedLanguages));
    return server;
  };
}
