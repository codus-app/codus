const lock = new window.Auth0Lock('y4m8JcL7boD2FKwH3fwTS9GusF07z4IT', 'codus.auth0.com');

// Callback on login
lock.on('authenticated', (authResult) => {
  console.log('authenticated');
  // Store ID token in localStorage
  localStorage.setItem('id_token', authResult.idToken);
  // Get profile object from ID token
  lock.getProfile(authResult.idToken, (error, profile) => {
    if (error) return;
    // Store profile in localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
  });

  window.app.authenticated = true;
});

export default {
  lock,
  checkAuth: () => localStorage.getItem('id_token') !== null,

  login() {
    lock.show();
  },

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.app.authenticated = false;
  },
};
