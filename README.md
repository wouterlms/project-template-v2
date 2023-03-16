# Vue 3 Project Template

## Environment Variables

In order for the project to work correctly, you need to set the following environment variables in a `.env` file:

- `VITE_API_BASE_URL`: the base URL of your API.
- `VITE_CLIENT_ID` and `VITE_CLIENT_SECRET`: the client ID and secret of your OAuth2 application.

The following environment variables are optional, but recommended if you're using Sentry for error tracking:

- `VITE_SENTRY_DSN`: the DSN for your Sentry project.
- `VITE_SENTRY_TRACING_ORIGIN`: the origin to use for Sentry tracing.

## Project Setup

To set up the project, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Copy the `.env.example` file to a new file called `.env`.
3. Open the `.env` file and fill in the required environment variables with the appropriate values.
4. Change the project title in `public/index.html` and `src/App.vue` to the desired name.
5. Change the theme by editing the `colors` object in `src/theme/colors.ts`.
6. Replace the favicon package in `public/` with your own.

Run `pnpm i` and `pnpm dev`
