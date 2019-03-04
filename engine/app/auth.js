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
  audience: 'https://engine.codus.io/',
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
});
module.exports.management = management;

// Given an Auth0 user id, return full information
module.exports.getUser = {
  byId(id) {
    return management
      .getUser({ id });
  },

  byUsername(username) {
    return management
      .getUser({ q: `username:"${username}"` })
      .then(arr => arr[0]);
  },

  byEmail(email) {
    return management
      .getUsersByEmail(email)
      .then(arr => arr[0]);
  },
};

module.exports.updateUser = async function updateUser(id, { username, email, name, picture }) {
  // eslint-disable-next-line camelcase
  const user_metadata = {
    // Only include keys if they're defined, avoid setting name or picture to undefined
    ...(name ? { name } : {}),
    ...(picture ? { picture } : {}),
  };

  // Can't update email and username in the same request so send SEPARATE requests if those both
  // need to be updated

  // Email doesn't need to be updated, so everything (username and name) can happen in one request
  if (!email) {
    return management.updateUser({ id }, { username, user_metadata });

  // Username doesn't need to be updated, so everything (email and name) can update in one request
  } if (!username) {
    return management.updateUser({ id }, { email, user_metadata });
  }

  // Both email and username need to update; send a request to modify username, another for the rest
  await management.updateUser({ id }, { username });
  return management.updateUser({ id }, { email, user_metadata });
};

module.exports.createUser = async function createUser({ username, email, name, password }) {
  return new Promise((resolve, reject) => management.createUser({
    connection: 'Username-Password-Authentication',
    email,
    username,
    password,
    user_metadata: {
      name,
      picture: 'https://app.codus.io/static/avatar.svg',
    },
  }, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  }));
};
