import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

export const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token id_token',
  realm: 'Username-Password-Authentication',
  audience: 'https://api.codus.arkis.io/',
  scope: 'openid profile email execute write:solutions read:solutions',
  redirectUri: `${window.location.origin}/app`,
});


export default {
  namespaced: true,

  state: {
    res: null,
    accessToken: localStorage.getItem('access_token'),
    idToken: localStorage.getItem('id_token'),
  },


  mutations: {
    // Update tokens and response after a successful login
    loggedIn(state, payload) {
      console.log(payload);
      const { idToken, accessToken } = payload;
      Object.assign(state, { res: payload, idToken, accessToken });
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
    },

    logout({ commit, dispatch }) {
      // Remove login info
      commit('logout');
      dispatch('toLocalStorage');

      webAuth.logout({
        returnTo: window.location.origin,
        client_id: webAuth.client.baseOptions.clientID,
      });
    },

    signup(_, { username, password, email, fullName }) { // eslint-disable-line object-curly-newline, no-unused-vars, max-len
      return new Promise((resolve, reject) => {
        reject(new Error('NOT DONE YET LOL TODO LATER'));
        // webAuth.signup({
        //   // Parameters required by Auth0
        //   email,
        //   connection: 'Username-Password-Authentication',
        //   password,
        //   // Extra paramters required by Codus
        //   username,
        //   user_metadata: { name: fullName },
        // }, (err) => {
        //   if (err) reject(err);
        //   else resolve();
        // });
      });
    },

    // Copy current state to localStorage for cross-request storage
    // Includes applying a 'logged out' state to localStorage
    toLocalStorage({ state }) {
      // Entire authentication response
      if (state.res === null) localStorage.removeItem('res');
      else localStorage.setItem('res', JSON.stringify(state.res));
      // ID token
      if (state.idToken === null) localStorage.removeItem('id_token');
      else localStorage.setItem('id_token', state.idToken);
      // Access token
      if (state.accessToken === null) localStorage.removeItem('access_token');
      else localStorage.setItem('access_token', state.accessToken);
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
