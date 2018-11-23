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


// Export an additional auth0.getUser function to query the management API for a given user

const { ManagementClient } = require('auth0');

const management = new ManagementClient({
  domain: 'codus.auth0.com',
  clientId: 'JfqbfePwu53xNJ755rhcDM51G89vnjwr',
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users',
});

// Given an Auth0 user id, return full information
module.exports.getUser = {
  byId(id) {
    return management
      .getUser({ id });
  },
};
