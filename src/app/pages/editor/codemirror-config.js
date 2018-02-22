// Mode
import 'codemirror/mode/clike/clike';
// Preinstalled themes
import 'codemirror/theme/material.css';
// Addons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
// Additional styles
import './codemirror.sass';
// Custom themes
import './themes/jackhammer.sass';

export default {
  tabSize: 2,
  mode: 'text/x-java',
  theme: 'jackhammer',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
};
