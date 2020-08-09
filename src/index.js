import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/Slider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Slider />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
