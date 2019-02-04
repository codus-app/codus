// Mode
import 'codemirror/mode/clike/clike';
// Preinstalled themes
import 'codemirror/theme/material.css';
// Addons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/search/searchcursor';
// Additional styles
import './codemirror.sass';
// Custom themes
import './themes/jackhammer.sass';
import './themes/chesterish.sass';
import './themes/nord.sass';

export default {
  tabSize: 2,
  mode: 'text/x-java',
  theme: 'nord',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  styleActiveLine: true,
  scrollbarStyle: 'null',
  autofocus: true,
};
