// Import CSS
import '../css/index.scss';

// Import React and ReactDOM
import React from 'react'; // Necessary for JSX
import ReactDOM from 'react-dom';

// Import our JS code
import InputView from './input-view';

// Attach React to #app-container inside index.html
ReactDOM.render(
  <InputView />,
  document.getElementById('app-container')
);
