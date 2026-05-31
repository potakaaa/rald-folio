import * as Sentry from "@sentry/react"

export function initSentry() {
  Sentry.init({
    dsn: "https://cedcfb65230c2a0395f1387573a480a9@o4511483546042368.ingest.us.sentry.io/4511483548532736",
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.2,
  })
}
