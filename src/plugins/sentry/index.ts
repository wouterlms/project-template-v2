import type { App } from 'vue'
import type { Router } from 'vue-router'

import { init, vueRouterInstrumentation } from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { z } from 'zod'

export default (app: App<Element>, router: Router): void => {
  const { VITE_SENTRY_DSN, VITE_SENTRY_TRACING_ORIGIN } = import.meta.env

  const envSchema = z.object({
    VITE_SENTRY_DSN: z.string().url(),
    VITE_SENTRY_TRACING_ORIGIN: z.string(),
  })

  try {
    envSchema.parse({
      VITE_SENTRY_DSN,
      VITE_SENTRY_TRACING_ORIGIN,
    })
  }
  catch {
    throw new Error('Sentry DSN or Tracing Origin is not defined. Make sure to define `VITE_SENTRY_DSN` and `VITE_SENTRY_TRACING_ORIGIN` in your .env file.')
  }

  init({
    app,
    dsn: VITE_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: vueRouterInstrumentation(router),
        tracingOrigins: [VITE_SENTRY_TRACING_ORIGIN, /^\//],
      }),
    ],
    tracesSampleRate: 1.0,
  })
}
