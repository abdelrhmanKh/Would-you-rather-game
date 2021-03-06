import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import Middleware from './middleware';
import rootReducer from './reducers';

import App from './components/App';
import './index.css';

const store = createStore(rootReducer, Middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);


