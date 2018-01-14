// This page is accessed as a callback from auth0. It reads the id_token passed and fetches profile
// information, then it returns to the homepage

import auth from '../../scripts/auth';

export default {
  name: 'login',

  beforeCreate() {
    // Parse hash passed to callback URL
    auth.webAuth.parseHash(window.location.hash, (err, res) => {
      if (window !== window.top) parent.postMessage(err || res, '*');
      else if (err) console.log(err);
      else {
        // Store ID token in localStorage
        localStorage.setItem('res', JSON.stringify(res));
        localStorage.setItem('id_token', res.idToken);
        localStorage.setItem('access_token', res.accessToken);
        this.$store.commit('setLoggedIn');
        // Fetch more user information
        const userId = auth.jwtDecode(res.idToken).sub;
        auth.getManagement().getUser(userId, (e, rsp) => {
          if (e) console.log(e);
          else localStorage.setItem('user', JSON.stringify(rsp));
          this.$router.push('/');
        });
      }
    });
  },
};
