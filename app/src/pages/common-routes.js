import Vue from 'vue';
import store from '../vuex';

export default [
  // User

  {
    path: '/user/:username',
    name: 'profile',
    component: require('./profile/profile.vue').default,
    meta: {
      title: ({ params }) => new Promise((resolve) => {
        /* eslint-disable no-new */
        // Wait for profile to fetch, then resolve
        new Vue({
          computed: {
            profile() { return store.getters.getUser(params.username); },
            title() { return `${this.profile.name} (@${params.username}) | Codus`; },
          },
          created() { if (this.profile && Object.keys(this.profile).length) resolve(this.title); },
          watch: {
            profile(prof) { if (prof && Object.keys(prof).length) resolve(this.title); },
          },
        });
        /* eslint-enable no-new */
      }),
    },
  },


  // Editor
  // This route won't render in sidebar because it has no category set in meta

  {
    path: '/problem/:category/:name',
    name: 'problem',
    component: require('./editor/editor.vue').default,
    meta: {
      collapseSidebar: true,
      protected: true,
      title: ({ params }) => `${params.name} | Codus`,
    },
  },

  // Settings pages

  {
    path: '/settings/account',
    name: 'profile-settings',
    component: require('./settings/account/account-settings.vue').default,
    meta: { protected: true },
  },
];
