/* global CODUS_LANDING_URL, BASE_DOMAIN */
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
window.Cookies = Cookies;

export const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token id_token',
  realm: 'Username-Password-Authentication',
  audience: 'https://engine.codus.io/',
  scope: 'openid profile email',
  redirectUri: window.location.origin,
});


export default {
  namespaced: true,

  state: {
    res: null,
    accessToken: Cookies.get('access_token'),
    idToken: Cookies.get('id_token'),
    profile: Cookies.get('id_token')
      ? jwtDecode(Cookies.get('id_token'))
      : {},
  },


  mutations: {
    // Update tokens and response after a successful login
    loggedIn(state, payload) {
      const { idToken, accessToken } = payload;
      Object.assign(state, { res: payload, idToken, accessToken, profile: jwtDecode(idToken) });
    },

    // Log out by deleting tokens
    logout(state) {
      state.res = null;
      state.idToken = null;
      state.accessToken = null;
    },
  },


  actions: {
    // Log in with a username and password
    login(_, { username, password }) {
      webAuth.login({
        username,
        password,
      });
    },

    loginCallback({ commit, dispatch }, res) {
      // Store basic login info
      commit('loggedIn', res);
      dispatch('toCookies');
      setTimeout(() => { window.location.hash = ''; }, 250);
    },

    renew({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        webAuth.checkSession({}, (err, authResult) => {
          if (err) {
            reject(err);
            dispatch('logout');
          } else {
            commit('loggedIn', authResult);
            dispatch('toCookies');
            window.location.hash = '';
            resolve();
          }
        });
      });
    },

    logout({ commit, dispatch }) {
      // Remove login info
      commit('logout');
      dispatch('toCookies');

      webAuth.logout({
        returnTo: CODUS_LANDING_URL,
        client_id: webAuth.client.baseOptions.clientID,
      });
    },

    requestPasswordReset(_, { email }) {
      return new Promise((resolve, reject) => {
        webAuth.changePassword({
          connection: 'Username-Password-Authentication',
          email,
        }, (err, resp) => {
          if (err) reject(err);
          else resolve(resp);
        });
      });
    },

    // Store current state as cookies shared across all subdomains
    // Copy current state to cookies for cross-request storage
    // Includes applying a 'logged out' state
    toCookies({ state }) {
      const options = { domain: BASE_DOMAIN };

      // Response
      if (state.res === null) Cookies.remove('res', options);
      else Cookies.set('res', state.res, options);
      // ID token
      if (state.idToken === null) Cookies.remove('id_token', options);
      else Cookies.set('id_token', state.idToken, options);
      // Access token
      if (state.accessToken === null) Cookies.remove('access_token', options);
      else Cookies.set('access_token', state.accessToken, options);
    },
  },


  getters: {
    isAuthenticated(state) {
      return state.idToken !== null && state.accessToken !== null;
    },
    loginExpired: state => () => (Date.now() / 1000) > jwtDecode(state.accessToken).exp,
    loginValid: (state, getters) => () => getters.isAuthenticated && !getters.loginExpired(),
  },
};
