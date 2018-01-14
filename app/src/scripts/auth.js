import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';


const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token id_token',
  realm: 'Username-Password-Authentication',
  audience: 'https://api.codus.arkis.io/',
  scope: 'openid profile email execute write:solutions read:solutions',
  redirectUri: `${window.location.origin}/login_callback`,
});

export default {
  webAuth,
  jwtDecode,

  // Return an auth0.Management instance
  getManagement() {
    return new auth0.Management({
      domain: 'codus.auth0.com',
      token: localStorage.getItem('id_token'),
    });
  },

  // Log in with a username and password
  login(username, password) {
    webAuth.login({
      connection: 'Username-Password-Authentication',
      username,
      password,
    }, (err) => { console.log(`Error: ${err}`); });
  },

  // Log the logged-in user out and return to home
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    webAuth.logout({
      returnTo: window.location.origin,
      client_id: webAuth.client.baseOptions.clientID,
    });
    window.app.$store.commit('setLoggedOut');
  },

  // See if the user is authenticated
  isAuthenticated() {
    return localStorage.getItem('id_token') !== null &&
           localStorage.getItem('access_token') !== null &&
           localStorage.getItem('user') !== null;
  },

  // Create a new account
  signup(username, password, email, fullName, callback) {
    webAuth.signup({
      // Parameters required by Auth0
      email,
      connection: 'Username-Password-Authentication',
      password,
      // Extra paramters required by Codus
      username,
      user_metadata: { name: fullName },
    }, callback);
  },

  // Check whether our ID token is expired
  loginExpired() {
    return ((Date.now() / 1000) - jwtDecode(localStorage.getItem('id_token')).exp) > 0;
  },

  // Renew the token. Callback is passed a boolean representing whether the token was renewed
  // successfully.
  renew(callback) {
    // TODO
    callback(false);
  },
};
