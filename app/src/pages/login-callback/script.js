// This page is accessed as a callback from auth0. It reads the id_token passed and fetches profile
// information, then it returns to the homepage

import auth from '../../scripts/auth';

export default {
  name: 'login',

  beforeCreate() {
    // Parse hash passed to callback URL
    auth.webAuth.parseHash(window.location.hash, (err, res) => {
      if (err) console.log(err);
      else {
        // Store ID token in localStorage
        localStorage.setItem('id_token', res.idToken);
        localStorage.setItem('access_token', res.accessToken);
        this.$store.commit('setLoggedIn');
        // Fetch more user information
        auth.webAuth.client.userInfo(res.accessToken, (profileErr, profile) => {
          if (profileErr) console.log(profileErr);
          else localStorage.setItem('profile', JSON.stringify(profile));
          this.$router.push('/');
        });
      }
    });
  },
};
