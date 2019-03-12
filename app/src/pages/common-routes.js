export default [
  // User

  {
    path: '/user/:username',
    name: 'profile',
    component: require('./profile/profile.vue').default,
    meta: {},
  },


  // Editor
  // This route won't render in sidebar because it has no category set in meta

  {
    path: '/problem/:category/:name',
    name: 'problem',
    component: require('./editor/editor.vue').default,
    meta: { collapseSidebar: true, protected: true },
  },

  // Settings pages

  {
    path: '/settings/account',
    name: 'profile-settings',
    component: require('./settings/account/account-settings.vue').default,
    meta: { protected: true },
  },
];
