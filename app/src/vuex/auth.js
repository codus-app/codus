/* global CODUS_LANDING_URL */
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

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
    accessToken: localStorage.getItem('access_token'),
    idToken: localStorage.getItem('id_token'),
    profile: localStorage.getItem('id_token')
      ? jwtDecode(localStorage.getItem('id_token'))
      : {},
  },


  mutations: {
    // Update tokens and response after a successful login
    loggedIn(state, payload) {
      const { idToken, accessToken } = payload;
      Object.assign(state, { res: payload, idToken, accessToken, profile: jwtDecode(idToken) }); // eslint-disable-line object-curly-newline, max-len
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
      dispatch('toLocalStorage');
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
            dispatch('toLocalStorage');
            window.location.hash = '';
            resolve();
          }
        });
      });
    },

    logout({ commit, dispatch }) {
      // Remove login info
      commit('logout');
      dispatch('toLocalStorage');

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

    // Copy current state to localStorage for cross-request storage
    // Includes applying a 'logged out' state to localStorage
    toLocalStorage({ state }) {
      const payload = { set: {}, remove: [] };

      function localify(stateKey, destKey = stateKey, json = false) {
        if (state[stateKey] === null) {
          localStorage.removeItem(destKey);
          payload.remove.push(destKey);
        } else {
          localStorage.setItem(destKey, json ? JSON.stringify(state[stateKey]) : state[stateKey]);
          payload.set[destKey] = state[stateKey];
        }
      }

      localify('res', 'res', true); // The entire authentication response
      localify('idToken', 'id_token');
      localify('accessToken', 'access_token');

      const frame = document.querySelector('iframe#localstorage');
      // Already loaded!
      if (frame.hasAttribute('loaded')) frame.contentWindow.postMessage(payload, CODUS_LANDING_URL);
      // If not, wait
      else frame.addEventListener('load', () => frame.contentWindow.postMessage(payload, CODUS_LANDING_URL));
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
