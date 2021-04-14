# Auth0 Angular SPA sample

This sample demonstrates the following use cases:

- Login
- Log out
- Showing the user profile
- Protecting routes using the authentication guard
- Displaying a link for the authorized users
- Calling APIs for the authorized users

## Configuration

The sample needs to be configured with your Auth0 domain and client ID in order to work.  `auth_config.json` defines the Autho configuration:

```json
{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>",
  "audience": "<YOUR AUTH0 API AUDIENCE IDENTIFIER>",
  "apiUri": "<YOUR API URL>"
}
```

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The backend API is a Node + Express server on port `3001`. The Angular application is configured to proxy through to this on any `/api` route. The API server is started separately from another 
terminal window.

## Build

Install packages
`npm i`

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/auth0-angular` directory.
`npm run build`

## Run Using Docker

You can build and run the sample in a Docker container by using the provided scripts:

```bash
docker build -t auth0-angular-sample .
docker run --init -p 4200:4200 -it auth0-angular-sample
```