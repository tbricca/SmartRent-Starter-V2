import * as Sentry from "@sentry/react";

if (process.env.REACT_APP_SENTRY_DSN && process.env.SENTRY_ENABLED) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_RUNTIME_ENV,
  });
}
