// Import CSS
import '../css/index.scss';

// Import React and ReactDOM
import React from 'react'; // Necessary for JSX
import ReactDOM from 'react-dom';

// Import our JS code
import AppView from './app-view';

// Attach React to #app-container inside index.html
ReactDOM.render(
  <AppView />,
  document.getElementById('app-container')
);
