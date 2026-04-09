import * as Sentry from '@sentry/nextjs';

const isLocalEnv = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === undefined;

if (!isLocalEnv) {
  Sentry.init({
    dsn: 'https://c7766d75b478fbe1a4e90930c059bd3a@o4509243644903424.ingest.us.sentry.io/4511055265398784',
    tracesSampleRate: 1,
    enableLogs: true,
    sendDefaultPii: true,
  });
}
