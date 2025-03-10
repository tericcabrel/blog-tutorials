import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: '<SENTRY_DSN_PROJECT>',
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  release: process.env.APP_VERSION,
});

console.log('Sentry initialized', process.env.APP_VERSION);
