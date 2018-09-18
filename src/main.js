import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './config/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
