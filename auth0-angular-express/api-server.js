const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const authConfig = require('./auth_config_api.json');
const jwtAuthz = require("express-jwt-authz");
const app = express();

const checkPermissions = (permissions) => {
  return jwtAuthz([permissions], {
    customScopeKey: "permissions",
    checkAllScopes: true,
    failWithError: true
  });
};

if (!authConfig.domain || !authConfig.audience) {
  throw 'Please make sure that auth_config_api.json is in place and populated';
}

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: authConfig.appUri,
  })
);

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

app.get('/api/external', checkJwt, checkPermissions('ping'), (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!',
  });
});

const port = process.env.API_SERVER_PORT || 3001;

app.listen(port, () => console.log(`Api started on port ${port}`));
