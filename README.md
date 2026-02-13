# SmartRent Starter V2

This is a starter template to get you up and running with a React web app using SmartKit.

## Setup

- Lookup `.yarnrc.yml` in 1Password and create that file in your home directory with the contents shown in 1Password. This `~/.yarnrc.yml` file is used across projects to authenticate requests for private packages.
- `yarn`
- `cp dev.env .env`
- `yarn dev`

### Env's

- `SENTRY_ENABLED=<true|false>` - If enabled, sentry will be turned on and you will also need to define:
  - `REACT_APP_SENTRY_DSN`
  - `SENTRY_AUTH_TOKEN`
  - `SENTRY_LOG_LEVEL`
  - `SENTRY_ORG`
  - `SENTRY_PROJECT`

## Contributing/Bugs

If you find anything that needs to be updated in this starter please open an issue:

[https://github.com/tbricca/SmartRent-Starter-V2/issues/new](https://github.com/tbricca/SmartRent-Starter-V2/issues/new)
