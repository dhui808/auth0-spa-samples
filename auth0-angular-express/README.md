# Auth0 Angular API sample

This is a sample Node + Express application as the backend of the Auth0 Angular SPA. to call `/api/external` endpoint, the user needs to have the `ping` permission.

## Configuration

The API server needs configuration file `auth_config_api.json`. It should defines the following
items:

```json
{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "audience": "<YOUR AUTH0 API AUDIENCE IDENTIFIER>",
  "appUri": "http://localhost:4200"
}
```

## Run backend

```
npm run dev
```

The application will run on `http://localhost:3001`.

## Run Using Docker

You can build and run the sample in a Docker container by using the provided scripts:

```bash
docker build -t auth0-angular-api .
docker run --init -p 3001:3001 -it auth0-angular-api
```