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
