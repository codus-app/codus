import auth0 from 'auth0-js';
import Vue from 'vue';

const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token',
});

const bus = new Vue();

export default {
  webAuth,
  bus,

  login(username, password) {
    webAuth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password,
      scope: 'openid',
      redirectUri: `${window.location.origin}/login`,
    });
    bus.$emit('login');
  },

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');

    webAuth.logout({
      returnTo: window.location.origin,
      client_id: webAuth.client.baseOptions.clientID,
    });
    bus.$emit('logout');
  },

  // See if the user is authenticated
  isAuthenticated() {
    return localStorage.getItem('id_token') !== null &&
           localStorage.getItem('access_token') !== null &&
           localStorage.getItem('profile') !== null;
  },
};
