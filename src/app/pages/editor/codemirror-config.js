// Mode
import 'codemirror/mode/clike/clike';
// Theme
import 'codemirror/theme/material.css';
// Addons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
// Additional styles
import './codemirror.sass';

export default {
  tabSize: 2,
  mode: 'text/x-java',
  theme: 'material',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
};
