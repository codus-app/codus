import auth0 from 'auth0-js';

const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token',
});

export default {
  webAuth,

  login(username, password) {
    webAuth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password,
      scope: 'openid',
    });
  },

  logout() {
    webAuth.logout({
      returnTo: window.location.origin,
      client_id: webAuth.client.baseOptions.clientID,
    });
  },
};
