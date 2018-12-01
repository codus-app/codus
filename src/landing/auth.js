import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';


const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token id_token',
  realm: 'Username-Password-Authentication',
  audience: 'https://api.codus.arkis.io/',
  scope: 'openid profile email execute write:solutions read:solutions',
  redirectUri: `${window.location.origin}/app`,
});

export default {
  webAuth,
  jwtDecode,

  // Log in with a username and password
  login(username, password) {
    return new Promise((resolve, reject) => {
      webAuth.login({
        username,
        password,
      }, (err) => {
        reject(err);
      });
    });
  },

  // See if the user is authenticated
  isAuthenticated() {
    return localStorage.getItem('id_token') !== null &&
           localStorage.getItem('access_token') !== null;
  },

  // Check whether our access token is expired
  // Returns true if the token is expired
  loginExpired() {
    return Date.now() / 1000 > jwtDecode(localStorage.getItem('access_token')).exp;
  },
};
