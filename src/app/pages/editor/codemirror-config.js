// Mode
import 'codemirror/mode/clike/clike';
// Theme
import 'codemirror/theme/base16-dark.css';
// Addons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';

export default {
  tabSize: 2,
  mode: 'text/x-java',
  theme: 'base16-dark',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
};
