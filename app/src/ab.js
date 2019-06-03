// Temporary AB testing setup for an AP stats project
/* global CODUS_API_BASE */


import store from './vuex';

if (!localStorage.gamify) localStorage.gamify = !!Math.round(Math.random());

let problemsSolved = 0;
const problemTimes = [];

export default {
  get gamify() { return localStorage.gamify === 'true'; },
  problemSolved(timeElapsed) {
    problemsSolved += 1;
    problemTimes.push(timeElapsed);
    console.log(`Problem solved in ${timeElapsed}s. (total: ${problemsSolved})`);
  },
};

window.addEventListener('unload', () => {
  const data = JSON.stringify({
    problemsSolved,
    problemTimes,
    userId: store.state.auth.profile.sub,
    gamification: localStorage.gamify === 'true',
  });
  //             Strip trailing slash
  const url = `${CODUS_API_BASE.replace(/\/$/g, '')}/stats-log`;
  navigator.sendBeacon(url, data);
}, false);
