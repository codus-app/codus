// Mode
import 'codemirror/mode/clike/clike';
// Addons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/addon/search/searchcursor';
// Additional styles
import './codemirror.sass';
// Custom themes
import './themes/nord.sass';

export default {
  tabSize: 2,
  mode: 'text/x-java',
  theme: 'nord',
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  styleActiveLine: true,
  styleSelectedText: true,
  scrollbarStyle: 'null',
  autofocus: true,
};
