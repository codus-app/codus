// Contains logic for verifying tokens and their permissions

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware to ensure the presence of an access token and verify the token against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://codus.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://api.codus.arkis.io/',
  issuer: 'https://codus.auth0.com/',
  algorithms: ['RS256'],
});

// Returns an array with both the required middlewares for easy use
module.exports = function verify(scopes = []) {
  const checkScopes = jwtAuthz(scopes);
  return [checkJwt, checkScopes];
};
