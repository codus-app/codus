import auth0 from 'auth0-js';

const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token',
});

export default {
  webAuth,

  // Log in with a username and password
  login(username, password) {
    webAuth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password,
      scope: 'openid',
      redirectUri: `${window.location.origin}/login_callback`,
    });
  },

  // Log the logged-in user out and return to home
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');

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
           localStorage.getItem('profile') !== null;
  },

  // Create a new account
  signUp(username, password, email, fullName, callback) {
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
};
