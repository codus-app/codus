// Styles
require('./main.sass');

// Libraries
require('../../../node_modules/ionicons/dist/css/ionicons.css'); // Ionicons

// Files to be copied
require('./index.pug');


const Starfield = require('./starfield');

// document.addEventListener('DOMContentLoaded')
window.stars = new Starfield(document.getElementById('stars'));
