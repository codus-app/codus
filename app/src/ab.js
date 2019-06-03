// Temporary AB testing setup for an AP stats project
/* global CODUS_API_BASE */


if (!localStorage.gamify) localStorage.gamify = !!Math.round(Math.random());

export default {
  get gamify() { return localStorage.gamify === 'true'; },
};
